import * as types from "./ActionTypes";
import getFirebase from "../../common/firebase/firebase";
import { trackQPevent } from "../../common/tracking";
import { async } from "q";

const windowGlobal = typeof window !== "undefined" && window;

let authRef;
const firebase = getFirebase();
if (firebase) {
  authRef = firebase.auth();
}
const dateNow = Date.now();


let serSub = null;

function fetchSerItems() {
  return { type: types.FETCH_SER_ITEMS_START };
}

export function recvSerItems(items) {
  return { type: types.FETCH_SER_ITEMS_SUCCESS, items };
}

export function recvSerItemsFailure() {
  return { type: types.FETCH_SER_ITEMS_FAILURE };
}

function cleanedSerRow(row) {
  let data = {
    sid: row.sid,
    name: row.name
  };
  return data;
}

export function subscribeForSers() {
  return async (dispatch, getState) => {
    serSub = firebase
      .firestore()
      .collection("one_service")
      .onSnapshot((docData, err) => {
        const items = [];
        dispatch(fetchSerItems());

        docData.forEach(doc => {
          const data = doc.data();
          items.push(cleanedSerRow(data));
        });

        if (items) {
          dispatch(recvSerItems(items));
        }
        if (err) {
          dispatch(recvSerItemsFailure());
        }
      });
  };
}

export function unsubscribeForSers() {
  return async (dispatch, getState) => {
    if (serSub) {
      serSub();
    }
  };
}

function fetchSer() {
  return { type: types.FETCH_SER_DETAIL };
}

export function recvSerSuccess(serData) {
         return { type: types.FETCH_SER_DETAIL_SUCCESS, serData };
       }

export function recvSerFailure() {
  return { type: types.FETCH_SER_DETAIL_FAILURE };
}

export function setSerDetail(serData) {
  return {
    type: types.SET_SER_DETAIL,
    serData
  };
}

export function fetchSerDetail(sid) {
  return async (dispatch, getState) => {
    let serRef = firebase
      .firestore()
      .collection("one_service")
      .doc(sid);
    dispatch(fetchSer());

    let getDoc = serRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          const docData = doc.data();
          dispatch(recvSerSuccess(docData));
        }
      })
      .catch(err => {
        console.log(err);

        dispatch(recvSerFailure());
      });
  };
}

export function updateSerDetail(sid, data) {
  return async (dispatch, getState) => {
      console.log(sid, data)
    let serRef = firebase
      .firestore()
      .collection("one_service")
      .doc(sid);
    dispatch(fetchSer());
    serRef
      .update({...data})
      .then(function(err) {
        dispatch(fetchSerDetail(sid));
      })
      .catch(function(error) {
        dispatch(recvSerFailure(error));
      });
  };
}

export function createSerDetail(sid, name, formSchema, faq) {
  return async (dispatch, getState) => {
    let serRef = firebase
      .firestore()
      .collection("one_service")
      .doc(sid);

    serRef.set({
      formSchema: formSchema,
      faq: faq,
      name: name,
      sid: sid
    });
  };
}
