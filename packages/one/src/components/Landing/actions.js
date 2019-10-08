import { log } from "util";

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

export function startFetchAllAvailbleServices() {
  return { type: types.ONE_SERVICES_LOADING };
}

export function recvAllAvailbleServices(sers) {
  return { type: types.ONE_SERVICES_LOADING_SUCCESS, sers };
}

export function faileRecvAllAvailbleServices() {
  return {
    type: types.ONE_SERVICES_LOADING_FAILED
  };
}
 


export function fetchPackageDetails() {
    return async (dispatch, getState) => {
        dispatch(startFetchAllAvailbleServices());


        const servicesRef = firebase.firestore().collection("one_service");

        let query = servicesRef
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              console.log("No matching documents.");
              return;
            }

            let sers = [];
            snapshot.forEach(doc => {
              sers.push(doc.data());
            });

    

            const businessRef = firebase
              .firestore()
              .collection("one_package")
              .doc("business");

            let busSerIds = [];
            businessRef.get().then(docData => {
              if (docData.exists) {
                
                const packDetails = docData.data();
         
                const { services } = packDetails;
                busSerIds = busSerIds.concat(services);
        
                 const indivRef = firebase
                   .firestore()
                   .collection("one_package")
                   .doc("individual");

                 let indSerIds = [];
                 indivRef.get().then(docData => {
                   if (docData.exists) {

                     const packDetails = docData.data();
                     const { services } = packDetails;
                     indSerIds = indSerIds.concat(services);
        
                     indSerIds.concat(services);

                      let busSers = sers.filter((ser, idx) => {
                        return busSerIds.includes(ser.sid);
                      });
                      let indivSers = sers.filter((ser, idx) => {
                        return indSerIds.includes(ser.sid);
                      });
                  
                      const allSers = {};
                      allSers["business"] = busSers;
                      allSers["individual"] = indivSers;

                      dispatch(recvAllAvailbleServices(allSers));
                   } else {
                     console.log("indiv package doesn't exist");
                   }
                 });
                  
              } else {
                console.log("business package doesn't exist");
              }
            });

           
            
          
          })
          .catch(err => {
            dispatch(faileRecvAllAvailbleServices());
            console.log("Error getting documents", err);
          });
    };
}
