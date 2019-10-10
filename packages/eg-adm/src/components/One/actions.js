import { navigate } from "@reach/router";

import { log } from "util";

// import 'regenerator-runtime/runtime';
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

let unsub = null;



export function uploadFile(uid, file, cb) {
  firebase
    .storage()
    .ref()
    .child(`one_user_service_txns/${uid}/${file.name}`)
    .put(file)
    .then(function(snapshot) {
      snapshot.ref.getDownloadURL().then(function(downloadUrl) {
        console.log(downloadUrl);
        cb(downloadUrl);
      });
    }).catch((err) => {
      console.log(err)
    });
}

function fetchItems() {
  return { type: types.FETCH_USER_ITEMS_START };
}

export function recvItems(items) {
  return { type: types.FETCH_USER_ITEMS_SUCCESS, items };
}

export function recvItemsFailure() {
  return { type: types.FETCH_USER_ITEMS_FAILURE };
}


function cleanedRow(row){
    let data = {
        uid: row.uid,
        name: row.displayName || '',
        email: row.email || '',
        paymentSetupDone: row.paymentSetupDone,
        type: row.isBusiness ? 'Business': 'Individual',
        selectedPlan: row.selected_plan_id,
        welcome_email_sent: row.welcome_email_sent
    }

    if('stripe_resp' in row){
        data.stripe_cus_link = `http://stripe.com/customers/${row.stripe_resp.customer}`;
    }

    if('createdAt' in row){
        data.createdAt = row.createdAt;
    }

    return data
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
                items.push(cleanedRow(data));
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
            console.log(docData, "getUserServiceDetails");
            dispatch(recvUserSer(docData));
          }
        })
        .catch(err => {
          console.log(err);
          dispatch(recvUserSerFailure());
        });
    }
}




export function submitTxnMeta(uid, sid, metadata){
  return async (dispatch, getState) => {
    let serTxnRef = firebase
      .firestore()
      .collection("one_user_services_txns")
      .doc(uid);

    dispatch(fetchUserSer());

    let getDoc = serTxnRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          let newMeta = metadata;
          newMeta["start"] = metadata["start"].valueOf();
          newMeta["until"] = metadata["until"].valueOf();
          const txnForSet = {          }
          txnForSet[sid] = {
            metadata: newMeta,
            txns: []
          };
          serTxnRef.set(txnForSet);
        } else {
          let olddocData = doc.data();
          let oldSerDetails = olddocData[sid]
          let newMeta = metadata;
          newMeta['start'] = metadata['start'].valueOf();
          newMeta['until'] = metadata['until'].valueOf();
          oldSerDetails["metadata"] = newMeta;
          
          olddocData[sid] = oldSerDetails;

          console.log(olddocData)
          firebase
            .firestore()
            .collection("one_user_services_txns")
            .doc(uid)
            .update({
              ...olddocData
            })
            .then(() => {
              dispatch(getUserServiceDetails(uid));
            }).catch((err) =>{
              console.log(err)
            });
        }
      })
      .catch(err => {

        dispatch(recvUserSerFailure());
      });
  };
}
