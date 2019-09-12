import { navigate } from "@reach/router";

import { log } from "util";

// import 'regenerator-runtime/runtime';
import * as types from "../ActionTypes";
import getFirebase from "../../common/firebase/firebase";
import { trackQPevent } from "../../common/tracking";


const windowGlobal = typeof window !== "undefined" && window;

const firebase = getFirebase();

const dateNow = Date.now();

export function toggleStripeModal(toggle){
  return {type: types.TOGGLE_STRIPE_MODAL, toggle}
}

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

export function selectServiceLoading() {
  return { type: types.ONE_USER_SERVICES_SAVING, toggle:true };
}

export function selectServiceSuccess(selectedServices) {
  return { type: types.ONE_USER_ADD_SELECTED_SERVICE, selectedServices };
}

export function selectServiceFailed() {
  return { type: types.ONE_USER_ADD_SELECTED_SERVICE_LOADING_FAILED };
}


export function unSelectService(uid, service){
return async (dispatch, getState) => {
  // dispatch(selectServiceLoading());

  const existingSelected = getState().oneServices.selectedServices;
  console.log(existingSelected, "es");

  if ((service.id in existingSelected)) {
    const servicesRef = firebase
      .firestore()
      .collection("one_user_services")
      .doc(uid);

    const newSelectedServices = existingSelected;
    delete newSelectedServices[service.id]

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
    // dispatch(selectServiceLoading());

    const existingSelected = getState().oneServices.selectedServices;
    console.log(existingSelected, uid, service)

    if(!(service.id in existingSelected)){
        const servicesRef = firebase
              .firestore()
              .collection("one_user_services")
              .doc(uid);
        

        delete service.icon
        const newSelectedServices = existingSelected;
        newSelectedServices[service.id] = service;
        
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


export function updateSelectServiceLoading() {
  return { type: types.ONE_USER_SERVICES_SAVING, toggle:true };
}

export function updateSelectServiceSuccess(result) {
  return { type: types.ONE_USER_UPDATE_SELECTED_SERVICE_DETAILS, result };
}

export function UpdateSelectServiceFailed() {
  return {
    type: types.ONE_USER_UPDATE_SELECTED_SERVICE_DETAILS_LOADING_FAILED
  };
}

export function finalizeService(uid, formData, service) {
         return async (dispatch, getState) => {
           dispatch(updateSelectServiceLoading());


           const existingSelected = getState().oneServices
             .selectedServices;

           if (service.id in existingSelected) {
             const servicesRef = firebase
               .firestore()
               .collection("one_user_services")
               .doc(uid);

            const currentSer = existingSelected[service.id];
            currentSer["formData"] = formData;
            const newSerSelected = existingSelected;
            newSerSelected[service.id] = currentSer;

             servicesRef
               .update({
                 selectedServices: newSerSelected
               })
               .then(function(err) {
                 dispatch(updateSelectServiceSuccess(existingSelected));
               })
               .catch(function(error) {
                 dispatch(UpdateSelectServiceFailed(error));
               });
           }
         };
       }

