import { navigate } from "@reach/router";

import { log } from "util";

// import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
const windowGlobal = typeof window !== 'undefined' && window

import getFirebase from '../common/firebase/firebase';
import { trackQPevent } from '../common/tracking';

if (windowGlobal){
    const firebase = getFirebase();
    const storageRef = firebase.storage().ref();
    const authRef = firebase.auth();

}

const dateNow = Date.now();

export function updateStep(step){
    navigate(`/one/dashboard/services/${step}`)
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
                let prefs = { isFirstTime, isBusiness: docData.data().isBusiness, isIndividual: docData.data().isIndividual, createdAt: dateNow.toString(), paymentSetupDone: docData.data().stripe_resp}
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
            navigate("/one/dashboard/services");
        }else{
             navigate("/one/dashboard");
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
                navigate('/one')
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

export function setupPayment(uid, plaid_token, plaid_account_id, plan_id) {
  return async (dispatch, getState) => {
    dispatch(setupBegin());


     const userRef = firebase
       .firestore()
       .collection("one_user")
       .doc(uid)
       .update({
         plaid_token: plaid_token,
         plaid_account_id: plaid_account_id,
           selected_plan_id: "plan_id"
       }).then(function(){
           dispatch(watchForStripeResp(uid));
       })
       .catch(function(error) {
           
         dispatch(setupPaymentFailed(error));
       });
  };
}
