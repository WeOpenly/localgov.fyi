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

function fetchPackageItems() {
  return { type: types.FETCH_PACK_ITEMS_START };
}

export function recvPackageItems(items) {
  return { type: types.FETCH_PACK_ITEMS_SUCCESS, items };
}

export function recvPackageItemsFailure() {
  return { type: types.FETCH_PACK_ITEMS_FAILURE };
}

function cleanedPackRow(row) {
  let data = {
    pid: row.pid,
    name: row.name
  };
  return data;
}

export function subscribePackageItems() {
  return async (dispatch, getState) => {
    packSub = firebase
      .firestore()
      .collection("one_package")
      .onSnapshot((docData, err) => {
        const items = [];
        dispatch(fetchPackageItems());

        docData.forEach(doc => {
          const data = doc.data();
          items.push(cleanedPackRow(data));
        });

        if (items) {
          dispatch(recvPackageItems(items));
        }
        if (err) {
          dispatch(recvPackageItemsFailure());
        }
      });
  };
}

export function unsubscribePackageItems() {
    return async (dispatch, getState) => {
        if (packSub) {
            packSub();
        }
    };
}

function fetchPackage() {
  return { type: types.FETCH_PACK_DETAIL };
}

export function recvPackage(packData) {
  return { type: types.FETCH_PACK_DETAIL_SUCCESS, packData };
}

export function recvPackageFailure() {
  return { type: types.FETCH_PACK_DETAIL_FAILURE };
}


export function fetchPackageDetail(pid) {
  return async (dispatch, getState) => {
    let packRef = firebase
      .firestore()
      .collection("one_package")
      .doc(pid);
    dispatch(fetchPackage());

    let getDoc = packRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          const docData = doc.data();
          console.log(docData);
          dispatch(recvPackage(docData));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(recvPackageFailure());
      });
  };
}

export function updateServicesInPackage(pid, sers, serId) {
  return async (dispatch, getState) => {
    console.log(pid, sers, serId);
    let packRef = firebase
      .firestore()
      .collection("one_package")
      .doc(pid);
          let newSers = sers;

    if (sers.includes(serId)){
      const index = newSers.indexOf(serId);
      if (index > -1) {
        newSers.splice(index, 1);
      }
 
    }else{
        newSers.push(serId)
    }
     packRef
       .update({ services: newSers })
       .then(function(err) {
         dispatch(fetchPackageDetail(pid));
       })
       .catch(function(error) {
         dispatch(recvPackageFailure(error));
       });

  };
}

export function createPackageDetail(pid, name) {
    return async (dispatch, getState) => {
      let packRef = firebase
        .firestore()
        .collection("one_package")
        .doc(pid);

      packRef.set({
        services: [],
        plans: [],
        name: name,
        pid: pid
      });
    };
}

export function updatePlansInPackage(pid, plans, planId, planData) {
  return async (dispatch, getState) => {

    let packRef = firebase
      .firestore()
      .collection("one_package")
      .doc(pid);
    
    let newPlans = plans;
    // check to see if exists
    const planExists =  newPlans.filter(function(newPlan) {
	    return newPlan.pg_plan_id === planId;
    });

    console.log(planExists, "planExists");

    if (planExists.length > 0) {
      newPlans = newPlans.filter(function(newPlan) {
	        return newPlan.pg_plan_id !== planId;
      });
    } else {
      newPlans.push(planData);
    }

     packRef
       .update({ plans: newPlans })
       .then(function(err) {
         dispatch(fetchPackageDetail(pid));
       })
       .catch(function(error) {
         dispatch(recvPackageFailure(error));
       });

  };
}



