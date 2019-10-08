import React from "react";
import * as types from "./ActionTypes";

const initialState = {
  stripeCardModalOpen: false,
  paymentSetupDone: false,
  paymentSetupInProgress: false,
  paymentSetupFailed: false,
  paymentMethods: [],
  paymentsFetching: false,
  paymentsLoadingFailed: false,
  receipts: [],
  receiptsLoading: false,
  receiptsLoadingFailed: false
};


export function oneUserPayment(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_STRIPE_MODAL:
      return {
        ...state,
        stripeCardModalOpen: action.toggle
      };
      break;
    case types.USER_PAYMENT_LOADING:
      return {
        ...state,
        paymentsFetching: true,
        paymentsLoadingFailed: false
      };
      break;
    case types.USER_PAYMENT_LOADING_SUCCESS:
      return {
        ...state,
        paymentsFetching: false,
        paymentsLoadingFailed: false,
        paymentMethods: action.methods
      };
      break;
    case types.USER_PAYMENT_LOADING_FAILED:
      return {
        ...state,
        paymentsFetching: false,
        paymentsLoadingFailed: false
      };
      break;
    case types.ONE_USER_SETUP_PAYMENT_LOADING:
      return {
        ...state,
        paymentSetupInProgress: true
      };
      break;
    case types.ONE_USER_SETUP_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentSetupDone: true,
        paymentSetupInProgress: false
      };
      break;
    case types.ONE_USER_SETUP_PAYMENT_FAILURE:
      return {
        ...state,
        paymentSetupInProgress: false,
        paymentSetupFailed: true
      };
      break;
    case types.ONE_USER_RECEIPTS_LOADING:
      return {
        ...state,
        receiptsLoading: true,
        receiptsLoadingFailed: false
      };
      break;
    case types.ONE_USER_RECEIPTS_SUCCESS:
      return {
        ...state,
        receipts: action.receipts,
        receiptsLoading: false,
        receiptsLoadingFailed: false
      };
      break;
    case types.ONE_USER_RECEIPTS_LOADING_FAILED:
      return {
        ...state,
        receiptsLoading: false,
        receiptsLoadingFailed: true
      };
      break;
    default:
      return state;
  }
}