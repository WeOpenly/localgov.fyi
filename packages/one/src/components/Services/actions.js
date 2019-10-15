import { navigate } from "@reach/router";

import { log } from "util";

// import 'regenerator-runtime/runtime';
import * as types from "./ActionTypes";
import getFirebase from "../../common/firebase/firebase";
import { trackQPevent } from "../../common/tracking";


const windowGlobal = typeof window !== "undefined" && window;

const firebase = getFirebase();

const dateNow = Date.now();



export function uploadFile(uid, file, cb){
  firebase.storage().ref().child(`one_user_service_attachments/${uid}/${file.name}`)
    .put(file)
    .then(function (snapshot) {

      snapshot.ref.getDownloadURL().then(function (downloadUrl) {

        cb(downloadUrl)
      }
      );
    });  
}


function selectServiceLoading(){
  return {
    type: types.UPDATE_SELECTED_SERVICES_START
  };
}

function selectServiceSuccess(sers){
  return {
    type: types.UPDATE_SELECTED_SERVICES_SUCCESS, sers
  };
}

function selectServiceFailed(){
return {
  type: types.UPDATE_SELECTED_SERVICES_SUCCESS
};
}

export function unSelectService(uid, service){
return async (dispatch, getState) => {
  dispatch(selectServiceLoading());

  const existingSelected = getState().oneUserServices.selectedServices;

  if ((service.sid in existingSelected)) {
    const servicesRef = firebase
      .firestore()
      .collection("one_user_services")
      .doc(uid);

    const newSelectedServices = existingSelected;
    delete newSelectedServices[service.sid]

    servicesRef
      .update({
        selectedServices: newSelectedServices
      })
      .then(function(err) {
        dispatch(selectServiceSuccess(newSelectedServices));
      })
      .catch(function(error) {
        dispatch(selectServiceFailed(error));
      });
  }
};
}

export function selectService(uid, service) {
  return async (dispatch, getState) => {
      dispatch(selectServiceLoading());

    const existingSelected = getState().oneUserServices.selectedServices;

    console.log(existingSelected, 'existing selected');

    if(!(service.sid in existingSelected)){
        const servicesRef = firebase
              .firestore()
              .collection("one_user_services")
              .doc(uid);

        const newSelectedServices = existingSelected;
        newSelectedServices[service.sid] = service;

        servicesRef
          .update({
            selectedServices: newSelectedServices
          })
          .then(function(err) {
            dispatch(selectServiceSuccess(newSelectedServices));
          })
          .catch(function(error) {
            dispatch(selectServiceFailed(error));
          });
    }
  };
}


export function finalizeServiceLoading() {
  return { type: types.UPDATE_FINALIZED_SERVICES_START };
}

export function finalizeServiceSuccess(result) {
  return { type: types.UPDATE_FINALIZED_SERVICES_SUCCESS, result };
}

export function finalizeServiceFailed() {
  return {
    type: types.UPDATE_FINALIZED_SERVICES_FAILED
  };
}

export function finalizeService(uid, formData, service) {
  return async (dispatch, getState) => {
   dispatch(finalizeServiceLoading());
    const existingSelected = getState().oneUserServices
      .selectedServices;

    if (service.sid in existingSelected) {
      console.log("here")
      const servicesRef = firebase
        .firestore()
        .collection("one_user_services")
        .doc(uid);

    const currentSer = existingSelected[service.sid];
    currentSer["formData"] = formData;
    const newSerSelected = existingSelected;
    newSerSelected[service.sid] = currentSer;

      servicesRef
        .update({
          selectedServices: newSerSelected
        })
        .then(function(err) {
          dispatch(finalizeServiceSuccess(existingSelected));
        })
        .catch(function(error) {
          dispatch(finalizeServiceFailed(error));
        });
    }
  };
}


function loadingUserServices() {
  return { type: types.USER_SERVICES_FETCH_LOADING };
}

function recvUserServices(sers) {
  return { type: types.USER_SERVICES_FETCH_SUCCESS, sers };
}

function failedLoadingUserServices() {
  return { type: types.USER_SERVICES_FETCH_FAILED };
}


function watchServicesForChanges(uid) {
  return async (dispatch, getState) => {
    const userWatch = firebase
      .firestore()
      .collection("one_user_services")
      .doc(uid)
      .onSnapshot(function(doc) {
        const details = doc.data();
        const { selectedServices } = details;
        dispatch(recvUserServices(selectedServices));
      });
  };
}


// export function fetchOrSetUserServiceDetails(uid, step){
//    return async (dispatch, getState) => {
//      dispatch(loadingUserServices());

//      const servicesRef = firebase
//        .firestore()
//        .collection("one_user_services")
//        .doc(uid);

//      servicesRef
//        .get()
//        .then(docData => {
//          if (!docData.exists) {
//            // no services -create dummy sers
//            let sers = {
//              selectedServices: {}
//            };

//            servicesRef.set({ ...sers });
//            dispatch(recvUserServices({}));
//          } else {
//            const sers = docData.data().selectedServices;
//            const noSerLen = Object.keys(sers).length === 0;
//            if (noSerLen) {
//              navigate(`/dashboard/onboard/${step}`);
//            } else {
//              navigate(`/dashboard/services`);
//            }
//            dispatch(watchServicesForChanges(uid));
//          }
//        })
//        .catch(fail => {
//          dispatch(failedLoadingUserServices());
//        });
//    };
// }

export function fetchOrSetUserServiceDetails(uid) {
  return async (dispatch, getState) => {
    dispatch(loadingUserServices());

      const servicesRef = firebase
        .firestore()
        .collection("one_user_services")
        .doc(uid);

      servicesRef
        .get()
        .then(docData => {
          if (!docData.exists) {
            // no services -create dummy sers
            let sers = {
              selectedServices: {}
            };
            servicesRef.set({ ...sers });
            dispatch(recvUserServices({}));     
          } else {
            dispatch(watchServicesForChanges(uid));
          }
        })
        .catch(fail => {
          dispatch(failedLoadingUserServices());
        });
  };
}


function loadingSerTxns(){
  return {
    type: types.LOADING_SERVICE_TXNS
  };
}

function recvSerTxns(txnData){
  return {
    type: types.RECV_SERVICE_TXNS,
    txnData
  };
}

function failedRecvSerTxns(){
  return {
    type: types.FAILED_RECV_SERVICE_TXNS
  }
}

// all service txns
function watchServiceTxnsForChanges(uid){
    return async (dispatch, getState) => {
      const userTxnWatch = firebase
        .firestore()
        .collection("one_user_services_txns")
        .doc(uid)
        .onSnapshot(function(doc) {
          const details = doc.data();
          dispatch(recvSerTxns(details));
        });
    };
}


export function fetchOrSetUserSerTxneDetails(uid){
   return async (dispatch, getState) => {
     dispatch(loadingSerTxns());

     const servicesTxnRef = firebase
       .firestore()
       .collection("one_user_services_txns")
       .doc(uid);

     servicesTxnRef
       .get()
       .then(docData => {
         if (!docData.exists) {
           // no services -create dummy sers
           let txnData = {};
           servicesTxnRef.set({ ...txnData });
           dispatch(recvSerTxns({}));
         } else {
           dispatch(watchServiceTxnsForChanges(uid));
         }
       })
       .catch(fail => {
         dispatch(failedRecvSerTxns());
       });
   };
}