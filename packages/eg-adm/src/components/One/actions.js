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
