import * as types from "./ActionTypes";
import getFirebase from "../../common/firebase/firebase";
import { trackQPevent } from "../../common/tracking";
import { async } from "q";
import { RRule, RRuleSet, rrulestr } from "rrule";

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

          let oldMeta = oldSerDetails['metadata'];
          const rule = new RRule({
            freq: RRule[oldMeta["freq"]],
            interval: parseInt(oldMeta["every"]),
            dtstart: new Date(oldMeta["start"]),
            until: new Date(oldMeta["until"])
          });


          var date = new Date(txnData["txn_for_date"]);
          var nowUtc = Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds()
          );

          console.log("createTxn", nowUtc);

          const nextDue = rule.after(new Date(nowUtc));

          console.log('createTxn', nextDue, "dddddRRRRULE");

          let newMeta = oldMeta;
          newMeta["nextDue"] = nextDue.valueOf();
          oldSerDetails['metadata'] = newMeta;

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
