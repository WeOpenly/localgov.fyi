import React from "react";
import * as types from "./ActionTypes";
import * as onboardTypes from '../User/ActionTypes';

export const LOADING_SERVICE_TXNS = "LOADING_SERVICE_TXNS";
export const RECV_SERVICE_TXNS = "RECV_SERVICE_TXNS";
export const FAILED_RECV_SERVICE_TXNS = "FAILED_RECV_SERVICE_TXNS";


const initialState = {
  updating: false,
  updateMsg: '',
  updateFailed: false,
  selectedServices: {},
  txnDataLoading: false,
  txnData: {},
  txnDataFailed: false,
  fetching: false,
  failed: false
};

     
export function oneUserServices(state = initialState, action) {
    switch (action.type) {
      case types.LOADING_SERVICE_TXNS:
        return {
          ...state,
          txnDataLoading: true,
          txnDataFailed: false
        };
        break;
      case types.RECV_SERVICE_TXNS:
        return {
          ...state,
          txnDataLoading: false,
          txnDataFailed: false,
          txnData: action.txnData
        };
        break;
      case types.FAILED_RECV_SERVICE_TXNS:
        return {
          ...state,
          txnDataLoading: false,
          txnDataFailed: true
        };
        break;
      case types.USER_SERVICES_FETCH_LOADING:
        return {
          ...state,
          fetching: true,
          failed: false
        };
        break;

      case types.USER_SERVICES_FETCH_SUCCESS:

        return {
          ...state,
          fetching: false,
          failed: false,
          selectedServices: action.sers
        };
        break;

      case types.USER_SERVICES_FETCH_FAILED:
        return {
          fetching: false,
          failed: true
        };
        break;

      case types.UPDATE_SELECTED_SERVICES_START:
        return {
          ...state,
          updating: true,
          updateFailed: false
        };
        break;

      case types.UPDATE_SELECTED_SERVICES_SUCCESS:
        return {
          ...state,
          updating: false,
          selectedServices: action.sers,
          updateFailed: false
        };
        break;

      case types.UPDATE_SELECTED_SERVICES_FAILED:
        return {
          ...state,
          updating: false,
          updateFailed: true
        };
        break;

      case types.UPDATE_FINALIZED_SERVICES_START:
        return {
          ...state,
          updating: true,
          updateFailed: false
        };
        break;

      case types.UPDATE_FINALIZED_SERVICES_SUCCESS:
        return {
          ...state,
          updating: false,
          selectedServices: action.result,
          updateFailed: false
        };
        break;

      case types.UPDATE_FINALIZED_SERVICES_FAILED:
        return {
          ...state,
          updating: false,
          updateFailed: true
        };
        break;
      default:
        return state;
    }
}
