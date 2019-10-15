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

let packSub = null;

function fetchTxnItems() {
  return { type: types.FETCH_USER_SER_TXN };
}

export function recvTxnItems(items) {
  return { type: types.FETCH_USER_SER_TXN_SUCCESS, items };
}

export function recvTxnItemsFailed() {
  return { type: types.FETCH_USER_SER_TXN_FAILURE };
}



export function subscribeTxnItems(uid) {
  return async (dispatch, getState) => {
    packSub = firebase
      .firestore()
      .collection("one_user_services_txns")
       .doc(uid)
      .onSnapshot((docData, err) => {
        const serItems = docData.data();
        dispatch(fetchTxnItems());

        if (serItems) {
          dispatch(recvTxnItems(serItems));
        }
        if (err) {
          dispatch(recvTxnItemsFailed());
        }
      });
  };
}

export function unsubscribeTxneItems() {
  return async (dispatch, getState) => {
    if (packSub) {
      packSub();
    }
  };
}


export function createTxn(uid, serId, txnData) {
  return async (dispatch, getState) => {
    let serTxnRef = firebase
      .firestore()
      .collection("one_user_services_txns")
      .doc(uid);
    const txnDataWdate = txnData;
    const d = new Date()
    txnData['addedAt'] = d.valueOf()

    let getDoc = serTxnRef
      .get()
      .then(doc => {
        if (!doc.exists) {
            console.log("doc doesn't exist");
        } else {
          let olddocData = doc.data();

          let oldSerDetails = olddocData[serId];
          let newTxns = oldSerDetails["txns"] || [];
          newTxns.push(txnData);
          oldSerDetails["txns"] = newTxns;
          olddocData[serId] = oldSerDetails;

          firebase
            .firestore()
            .collection("one_user_services_txns")
            .doc(uid)
            .update({
              ...olddocData
            })
            .then(() => {
                console.log('update done')
            });
        }
      })
      .catch(err => {
        console.log(err);

      });
  };
}
