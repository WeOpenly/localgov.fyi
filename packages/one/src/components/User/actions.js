import { navigate } from "@reach/router";
import { log } from "util";

import * as types from "./ActionTypes";

import getFirebase from "../../common/firebase/firebase";
import { trackQPevent } from "../../common/tracking";
import {
  fetchOrSetUserServiceDetails,
  fetchOrSetUserSerTxneDetails
} from "../Services/actions";


const windowGlobal = typeof window !== "undefined" && window;


let authRef;
const firebase = getFirebase();
if (firebase) {
  authRef = firebase.auth();
}
const dateNow = Date.now();


function loadingOnboardingDetails() {
  return { type: types.USER_DETAILS_LOADING };
}

function failedLoadingOnboardingDetails() {
  return { type: types.USER_DETAILS_FAILED };
}

function recvOnboardingDetails(details) {
  return { type: types.USER_DETAILS_SUCCESS, details };
}

export function updateServerOnboardingStep(uid, step) {
  return async (dispatch, getState) => {
    const userRef = firebase
      .firestore()
      .collection("one_user")
      .doc(uid)
      .update({ currentOnboardingStep: step })
      .then();
  };
}

export function loginGoog(enteredEmail) {
  return async (dispatch, getState) => {
    dispatch(loadingOnboardingDetails());

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    if (enteredEmail) {
      provider.setCustomParameters({
        login_hint: enteredEmail
      });
    }
    authRef.signInWithRedirect(provider);
  };
}


let userWatch = null;

function watchUserForChanges(uid){
  return async (dispatch, getState) => {
      userWatch = firebase
        .firestore()
        .collection("one_user")
        .doc(uid)
        .onSnapshot(function(doc) {
          const details = doc.data();
          const { currentOnboardingStep, onboardingDone } = details;
    
          if (!onboardingDone) {
            navigate(`/dashboard/onboard/${currentOnboardingStep}`);
          } else {
            navigate(`/dashboard/services`);
          }

          dispatch(recvOnboardingDetails(details));
        });
  }
}

function setAuthenticated(toggle){
  return {
    type: types.USER_SET_AUTHENTICATED,
    toggle
  }
}

export function logout() {
  return async (dispatch, getState) => {
    if (windowGlobal) {
      windowGlobal.localStorage.clear();
    }

    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
        console.log(error);
      });
  };
}

function fetchOrSetUserDetails(user) {
  return async (dispatch, getState) => {
    const { providerData, uid } = user;
    // dispatch(loadingOnboardingDetails());
  
    let details = {}
    let packType = null;
    let plan = null;
    let planDuration = null;

    if (windowGlobal) {
      packType = windowGlobal.localStorage.getItem("package");
      plan = windowGlobal.localStorage.getItem("plan");
      planDuration = windowGlobal.localStorage.getItem("planDuration");
    }


    const userRef = firebase
      .firestore()
      .collection("one_user")
      .doc(uid);


    userRef
      .get()
      .then(docData => {
        if (!docData.exists) {
          // no user - create user, create dummy sers
          const createdAt = dateNow.toString();

          details = {
            ...providerData[0],
            uid: uid,
            onboardingDone: false,
            currentOnboardingStep: "user_type",
            createdAt
          };

          if (packType){
            details["packType"] = packType;
            details["currentOnboardingStep"] = 'add_services';
          }

          if (plan){
            details["selected_plan_id"] = plan;
          }
          if (planDuration){
            details["planDuration"] = planDuration;
          } 

          userRef.set({ ...details });
        } 
        dispatch(watchUserForChanges(uid));
        dispatch(fetchOrSetUserServiceDetails(uid));
        dispatch(fetchOrSetUserSerTxneDetails(uid));
      })
      .catch(fail => {
        dispatch(failedLoadingOnboardingDetails());
      });
  };
}


export function checkLogin(enteredEmail) {
  return async (dispatch, getState) => {
    dispatch(loadingOnboardingDetails());

    let pathname = "/";
    if (windowGlobal) {
      pathname = windowGlobal.location.pathname;
    }

    authRef.onAuthStateChanged(user => {
      if (user) {
        dispatch(fetchOrSetUserDetails(user));
        dispatch(setAuthenticated(true));
      } else {
        dispatch(setAuthenticated(false));
        if(userWatch){
          userWatch();
        }
        navigate(pathname);
      }
    });
  };
}

export function finishOnboarding(uid){
   return async (dispatch, getState) => {
     const userRef = firebase
       .firestore()
       .collection("one_user")
       .doc(uid)
       .update({ onboardingDone: true})
       .then(() => {
         navigate('/dashboard/services')
       });
   };
}

export function updateUserPackage(uid, pack) {
  return async (dispatch, getState) => {
    const userRef = firebase
      .firestore()
      .collection("one_user")
      .doc(uid)
      .update({ ...pack })
      .then();
  };
}


