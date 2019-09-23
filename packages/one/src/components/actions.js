import { navigate } from "@reach/router";

import { log } from "util";

// import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';


import getFirebase from '../common/firebase/firebase';
import { trackQPevent } from '../common/tracking';

const windowGlobal = typeof window !== "undefined" && window;

let authRef;
const firebase = getFirebase();
if (firebase){
    authRef = firebase.auth();
}
const dateNow = Date.now();


export function toggleSidebar(toggle){
    return {
        type: types.TOGGLE_SIDEBAR, 
        toggle
    }
}

export function updateStep(step){
    navigate(`/dashboard/onboard/${step}`)
    return { type: types.ONE_USER_SERVICES_UPDATE_STEP,  step};
}

export function loginBegin() {
    return { type: types.ONE_GOOG_USER_LOGIN_START }
}

export function loginSuccess(userId) {
    return { type: types.ONE_GOOG_USER_LOGIN_SUCCESS, userId }
}

export function loginFailed() {
    return { type: types.ONE_GOOG_USER_LOGIN_FAILURE }
}


export function loginGoog(enteredEmail) {
    return async (dispatch, getState) => {
        dispatch(loginBegin())

        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        if (enteredEmail){
            provider.setCustomParameters({
                'login_hint': enteredEmail
            });
        }
        authRef.signInWithRedirect(provider);
    }
}

export function setLoggedOut(){
    return {
        type: types.ONE_GOOG_LOG_OUT
    }
}


export function logout(enteredEmail) {
    return async (dispatch, getState) => {
          if (windowGlobal) {
            windowGlobal.localStorage.clear();
          }
        
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log('LOGOUT');
            dispatch(setLoggedOut())
            // navigate('/one')
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }
}

export function checkLoggedIn() {
    return { type: types.ONE_USER_LOGIN_CHECK_START }
}

function isLoggedIn(user) {
    const { providerData, uid } = user;
    let prefs = {
      ...providerData[0],
      uid: uid
    };
    return { type: types.ONE_USER_LOGIN_CHECK_LOGGED_IN, prefs };
}

function isNotLoggedIn() {
    return { type: types.ONE_USER_LOGIN_CHECK_NOT_LOGGED_IN }
}

function loadingUserPrefs(){
    return { type: types.ONE_USER_LOGIN_USER_DETAILS_LOADING }
}

function failedLoadingUserPrefs(){
    return { type: types.ONE_USER_LOGIN_USER_DETAILS_LOADING_FAILED}
}

function addUserPrefs(prefs){
    return { type: types.ONE_USER_LOGIN_ADD_USER_DETAILS, ...prefs }
}

function checkAndAddUser(user){
    return async (dispatch, getState) => {
        const { providerData, metadata, uid } = user;
        const { creationTime, lastSignInTime } = user;
        const userRef = firebase.firestore()
            .collection('one_user')
            .doc(uid)
        const isFirstTime = creationTime === lastSignInTime;
        dispatch(loadingUserPrefs())

        userRef.get().then((docData) => {
            if (docData.exists){
                let prefs = { isFirstTime, isBusiness: docData.data().isBusiness, isIndividual: docData.data().isIndividual, createdAt: dateNow.toString(), paymentSetupDone: docData.data().paymentSetupDone}
                dispatch(addUserPrefs(prefs))
             
            }
            else{
                userRef.set({ ...providerData[0], uid: uid, isBusiness: false, isIndividual: false, createdAt: dateNow.toString(), paymentSetupDone: false})
                let prefs = {
                  isFirstTime,
                  isBusiness: false,
                  isIndividual: false,
                  paymentSetupDone: false,
                };
                dispatch(addUserPrefs(prefs))
            }
        }).catch((fail) => {
            console.log(fail, "console")
        });
    }
}


function addUserServiceDetails(prefs) {
    return { type: types.ONE_USER_LOGIN_ADD_SERVICE_DETAILS, ...prefs }
}

function loadingUserServices(){
    return { type: types.ONE_USER_LOGIN_SERVICE_DETAILS_LOADING}
}

function failedLoadingUserServices(){
    return { type: types.ONE_USER_LOGIN_SERVICE_DETAILS_LOADING_FAILED}
}

function checkAndAddUserService(user) {
    return async (dispatch, getState) => {
        dispatch(loadingUserServices())
        const { providerData, metadata, uid } = user;
        const { creationTime, lastSignInTime } = metadata;
        const servicesRef = firebase.firestore()
            .collection('one_user_services')
            .doc(uid)

        if(creationTime === lastSignInTime){
            navigate("/dashboard/onboard/add_services");
        }else{
             navigate("/dashboard");
        }

        servicesRef.get().then((docData) => {
            if (docData.exists) {
                let prefs = { selectedServices: docData.data().selectedServices || {} }
                dispatch(addUserServiceDetails(prefs))
            }
            else {
                servicesRef.set({ selectedServices: {} });
                let prefs = { selectedServices: {} };
                dispatch(addUserServiceDetails(prefs))
            }
        }).catch((fail) => {
            console.log(fail, "servicesreffail")
        });

    }
}




export function checkLogin(enteredEmail) {
    return async (dispatch, getState) => {
        dispatch(checkLoggedIn())
        authRef.onAuthStateChanged(user => {
            if (user) {
                dispatch(isLoggedIn(user))
                dispatch(checkAndAddUser(user))
                dispatch(checkAndAddUserService(user))
            } else {
                dispatch(isNotLoggedIn())
                navigate('/')
            }
        })
    }
}

function updateUserPrefs(prefs) {
  return {
    type: types.ONE_USER_LOGIN_UPDATE_PREFS,
    prefs
  };
}

export function updateUserType(uid, type){
  return async (dispatch, getState) => {
    dispatch(loadingUserPrefs());
    const userRef = firebase
      .firestore()
      .collection("one_user")
      .doc(uid)
      .update({ ...type });
    dispatch(updateUserPrefs(type));
  };
}



function setupBegin() {
    return { type: types.ONE_USER_SETUP_PAYMENT_LOADING };
}

export function setupPaymentSuccess() {
  return { type: types.ONE_USER_SETUP_PAYMENT_SUCCESS };
}

export function setupPaymentFailed() {
  return { type: types.ONE_USER_SETUP_PAYMENT_FAILURE };
}

export function watchForStripeResp(uid) {
         return async (dispatch, getState) => {
           firebase
             .firestore()
             .collection("one_user")
             .doc(uid)
             .onSnapshot(function(doc) {
               const stripe_resp = doc.data().stripe_resp;
               if (stripe_resp) {
                 dispatch(setupPaymentSuccess());
               }
             });
         };
       }



function receiptsBegin() {
    return { type: types.ONE_USER_RECEIPTS_LOADING };
}

export function receiptsSuccess(receipts) {
    return { type: types.ONE_USER_RECEIPTS_SUCCESS, receipts };
}

export function receiptsFailure() {
    return { type: types.ONE_USER_RECEIPTS_LOADING_FAILED };
}

export function watchForReceipts(uid) {
    return async (dispatch, getState) => {
        console.log(uid, 'watchForReceipts');

        const oneUserReceipt = firebase.firestore()
            .collection('one_user_receipts')
            .doc(uid)
 
        console.log(oneUserReceipt);

        dispatch(receiptsBegin())

        oneUserReceipt.get().then((docData, err) => {
           console.log(docData.data());
           const data = docData.data()
           if (data){
               const {receipts} = data
               if (receipts){
                   dispatch(receiptsSuccess(receipts))
               }
           }
        }).catch((fail) => {
            console.log(fail, "servicesreffail")
        });

    
    };
}

export function setupCardPayment(uid, stripe_token, plan_id) {
  return async (dispatch, getState) => {
    dispatch(setupBegin());


     const userRef = firebase
       .firestore()
       .collection("one_user")
       .doc(uid)
       .update({
         payment_method: "card",
         stripe_token: stripe_token,
         selected_plan_id: plan_id
       })
       .then(function() {
         dispatch(watchForStripeResp(uid));
       })
       .catch(function(error) {
         dispatch(setupPaymentFailed(error));
       });
  };
}



export function setupBankPayment(uid, plaid_token, plaid_account_id, plan_id) {
         return async (dispatch, getState) => {
           dispatch(setupBegin());

           const userRef = firebase
             .firestore()
             .collection("one_user")
             .doc(uid)
             .update({
               payment_method: "bank_account",
               plaid_token: plaid_token,
               plaid_account_id: plaid_account_id,
               selected_plan_id: plan_id
             })
             .then(function() {
               dispatch(watchForStripeResp(uid));
             })
             .catch(function(error) {
               dispatch(setupPaymentFailed(error));
             });
         };
       }

export function setLandingUserType(userType){
    return {
        type: types.SET_LANDING_USER_TYPE,
        userType
    };
}

export function setLandingPlan(plan){
    return {type: types.SET_LANDING_SELECTED_PLAN, plan}
}
