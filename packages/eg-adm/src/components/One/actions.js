import { navigate } from "@reach/router";

import { log } from "util";

// import 'regenerator-runtime/runtime';
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

let unsub = null;

function fetchItems() {
  return { type: types.FETCH_USER_ITEMS_START };
}

export function recvItems(items) {
  return { type: types.FETCH_USER_ITEMS_SUCCESS, items };
}

export function recvItemsFailure() {
  return { type: types.FETCH_USER_ITEMS_FAILURE };
}

export function subscribeForUsers() {
    return async (dispatch, getState) => {
    unsub = firebase
        .firestore()
        .collection("one_user")
        .onSnapshot((docData, err) => {
            const items = []
            dispatch(fetchItems())

            docData.forEach(doc => {
                const data = doc.data();
                if (
                  data.uid &&
                  data.email &&
                  ('paymentSetupDone' in data) &&
                  data.selected_plan_id
                ){
                    items.push([
                    data.uid,
                    data.email,
                     data.paymentSetupDone,
                  data.selected_plan_id
                    ]);
                }
            });

            if (items) {
              dispatch(recvItems(items));
            }
            if (err){
                dispatch(recvItemsFailure());
            }
        })
    };
}

export function unsubscribeForUsers(){
    return async (dispatch, getState) => {
        if (unsub){
            unsub()
        }
    }
}


function fetchUserSer() {
  return { type: types.FETCH_USER_SER };
}

export function recvUserSer(sers) {
  return { type: types.FETCH_USER_SER_SUCCESS, sers };
}

export function recvUserSerFailure() {
  return { type: types.FETCH_USER_SER_FAILURE };
}


export function setUserDetail(userData) {
         return {
           type: types.SET_USER_DETAIL,
           userData
         };
       }

export function getUserServiceDetails(uid){
    return async (dispatch, getState) => {
      let serRef = firebase
        .firestore()
        .collection("one_user_services")
        .doc(uid);
      dispatch(fetchUserSer());

      let getDoc = serRef
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            const docData = doc.data();
            dispatch(recvUserSer(docData));
          }
        })
        .catch(err => {
          dispatch(recvUserSerFailure());
        });
    }
}
