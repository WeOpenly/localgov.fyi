import { navigate } from "@reach/router";

import { log } from "util";

// import 'regenerator-runtime/runtime';
import * as types from "./ActionTypes";
import getFirebase from "../../common/firebase/firebase";
import { trackQPevent } from "../../common/tracking";
import { updateServerOnboardingStep } from "../User/actions";
const windowGlobal = typeof window !== "undefined" && window;

const firebase = getFirebase();

const dateNow = Date.now();


export function toggleStripeModal(toggle) {
  return { type: types.TOGGLE_STRIPE_MODAL, toggle };
}


function setupBegin() {
  return { type: types.ONE_USER_SETUP_PAYMENT_LOADING };
}

export function setupPaymentSuccess() {
  return { type: types.ONE_USER_SETUP_PAYMENT_SUCCESS };
}

export function setupPaymentFailed() {
  return { type: types.ONE_USER_SETUP_PAYMENT_FAILURE };
}

export function watchForStripeResp(uid) {
  return async (dispatch, getState) => {
    firebase
      .firestore()
      .collection("one_user")
      .doc(uid)
      .onSnapshot(function(doc) {
        const stripe_resp = doc.data().stripe_resp;
        if (stripe_resp) {
          dispatch(setupPaymentSuccess());
          dispatch(updateServerOnboardingStep(uid, 'payment_added'));
        }
      });
  };
}

function receiptsBegin() {
  return { type: types.ONE_USER_RECEIPTS_LOADING };
}

export function receiptsSuccess(receipts) {
  return { type: types.ONE_USER_RECEIPTS_SUCCESS, receipts };
}

export function receiptsFailure() {
  return { type: types.ONE_USER_RECEIPTS_LOADING_FAILED };
}

export function watchForReceipts(uid) {
  return async (dispatch, getState) => {


    const oneUserReceipt = firebase
      .firestore()
      .collection("one_user_receipts")
      .doc(uid);

    console.log(oneUserReceipt);

    dispatch(receiptsBegin());

    oneUserReceipt
      .get()
      .then((docData, err) => {
        console.log(docData.data());
        const data = docData.data();
        if (data) {
          const { receipts } = data;
          if (receipts) {
            dispatch(receiptsSuccess(receipts));
          }
        }
      })
      .catch(fail => {
        console.log(fail, "servicesreffail");
      });
  };
}

export function setupCardPayment(uid, stripe_token, plan_id) {
  return async (dispatch, getState) => {
    dispatch(setupBegin());
  
    const userRef = firebase
      .firestore()
      .collection("one_user")
      .doc(uid)
      .update({
        payment_method: "card",
        stripe_token: stripe_token,
        selected_plan_id: plan_id
      })
      .then(function() {
        dispatch(watchForStripeResp(uid));
      })
      .catch(function(error) {
        dispatch(setupPaymentFailed(error));
      });
  };
}

export function setupBankPayment(uid, plaid_token, plaid_account_id, plan_id) {
  return async (dispatch, getState) => {
    dispatch(setupBegin());

    const userRef = firebase
      .firestore()
      .collection("one_user")
      .doc(uid)
      .update({
        payment_method: "bank_account",
        plaid_token: plaid_token,
        plaid_account_id: plaid_account_id,
        selected_plan_id: plan_id
      })
      .then(function() {
        dispatch(watchForStripeResp(uid));
      })
      .catch(function(error) {
        dispatch(setupPaymentFailed(error));
      });
  };
}

