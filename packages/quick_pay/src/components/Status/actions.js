// import 'regenerator-runtime/runtime';
import * as types from "./ActionTypes";

import getFirebase from "../../common/firebase/firebase";
import { trackQPevent } from "../../common/tracking";

let firebase = null;
let storageRef = null;

const windowGlobal = typeof window !== "undefined" && window;

if (windowGlobal) {
  firebase = getFirebase();
  storageRef = firebase.storage().ref();
}

const dateNow = Date.now();


export function fetchStatusBegin() {
  return { type: types.QP_STATUS_LOAD_BEGIN };
}

export function fetchStatusSuccess(details) {
  return { type: types.QP_STATUS_LOAD_SUCCESS, details };
}

export function fetchStatusFailed() {
  return { type: types.QP_STATUS_LOAD_FAILED };
}


let userWatch = null;

export function watchUserSubForChanges(subId) {
  return async (dispatch, getState) => {
    let doc = firebase
          .firestore()
          .collection("user_submission")
          .doc(subId);

    userWatch = doc.onSnapshot(docSnapshot => {
                dispatch(fetchStatusBegin());
                const details = docSnapshot.data();
            
                if (details) {
                    dispatch(fetchStatusSuccess(details));
                }
            }, 
            err => {
            dispatch(fetchStatusFailed());
        });
  };
}


export function unsubscribeForStatus(){
    return async (dispatch, getState) => {
    if (userWatch) {
        userWatch();
    }
    };
}
