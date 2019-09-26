import { navigate } from "@reach/router";
import { log } from "util";

import * as types from "./ActionTypes";

import getFirebase from "../../common/firebase/firebase";
import { trackQPevent } from "../../common/tracking";

const windowGlobal = typeof window !== "undefined" && window;

let authRef;
const firebase = getFirebase();
if (firebase) {
  authRef = firebase.auth();
}
const dateNow = Date.now();


export function loginBegin() {
  return { type: types.ADM_GOOG_USER_LOGIN_START };
}

export function loginSuccess(userId) {
  return { type: types.ADM_GOOG_USER_LOGIN_SUCCESS, userId };
}

export function loginFailed() {
  return { type: types.ADM_GOOG_USER_LOGIN_FAILURE };
}

export function loginGoog(enteredEmail) {
  return async (dispatch, getState) => {
    dispatch(loginBegin());

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

export function setLoggedOut() {
  return {
    type: types.ADM_GOOG_LOG_OUT
  };
}

export function logout(enteredEmail) {
  return async (dispatch, getState) => {
    if (windowGlobal) {
      windowGlobal.localStorage.clear();
    }

    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        console.log("LOGOUT");
        dispatch(setLoggedOut());
        // navigate('/one')
      })
      .catch(function(error) {
        // An error happened.
        console.log(error);
      });
  };
}

export function checkLoggedIn() {
  return { type: types.ADM_USER_LOGIN_CHECK_START };
}

function isLoggedIn(user) {
  const { providerData, uid } = user;
  let prefs = {
    ...providerData[0],
    uid: uid
  };
  return { type: types.ADM_USER_LOGIN_CHECK_LOGGED_IN, prefs };
}

function isNotLoggedIn() {
  return { type: types.ADM_USER_LOGIN_CHECK_NOT_LOGGED_IN };
}



export function checkLogin(enteredEmail) {
  return async (dispatch, getState) => {
    dispatch(checkLoggedIn());

    let pathname = "/";
    if (windowGlobal) {
      pathname = windowGlobal.location.pathname;
    }

    authRef.onAuthStateChanged(user => {
      if (user) {
        dispatch(isLoggedIn(user));

        const { providerData, metadata, uid } = user;
        const { creationTime, lastSignInTime } = metadata;

        if (creationTime === lastSignInTime) {
          navigate("/dashboard/onboard/add_services");
        } else {
          if (pathname === "/") {
            navigate(`/dashboard`);
          }
        }
      } else {
        dispatch(isNotLoggedIn());
        navigate("/");
      }
    });
  };
}
