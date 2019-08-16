// import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
const windowGlobal = typeof window !== 'undefined' && window

import getFirebase from '../common/firebase/firebase';
import { trackQPevent } from '../common/tracking';
const firebase = getFirebase();
const storageRef = firebase.storage().ref();


const dateNow = Date.now();

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
        // provider.setCustomParameters({
        //     'login_hint': 'user@example.com'
        // });
       

        // create user profile
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function () {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
        

            return firebase.auth().signInWithRedirect(provider);
        
        })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });
        // firebase.auth().getRedirectResult().then(function (result) {
        //     if (result.credential) {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         var token = result.credential.accessToken;
        //         // ...
        //     }
        //     // The signed-in user info.
        //     var user = result.user;
        //     console.log(user, 'userlogin');

        //     if (user) {
        //         dispatch(loginSuccess(user))
        //     }

        // }).catch(function (error) {
        //     console.log(error)
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // The email of the user's account used.
        //     var email = error.email;
        //     // The firebase.auth.AuthCredential type that was used.
        //     var credential = error.credential;
        //     // ...
        // });

            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    console.log('statechanged', user)
                    dispatch(loginSuccess(user))
                } else {
                    console.log('no user state changed')
                    // User is signed out.
                    // ...
                }
            })
    
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
    return { type: types.ONE_USER_LOGIN_CHECK_LOGGED_IN, user }
}

function isNotLoggedIn() {
    return { type: types.ONE_USER_LOGIN_CHECK_NOT_LOGGED_IN }
}


export function checkLogin(enteredEmail) {
    return async (dispatch, getState) => {
        dispatch(checkLoggedIn())
        const fireUser = firebase.auth().currentUser;
        console.log(fireUser, 'currentUser');

        if(!fireUser){
            dispatch(isNotLoggedIn())
        }else{
            dispatch(isLoggedIn(fireUser))
        }

    }
}
