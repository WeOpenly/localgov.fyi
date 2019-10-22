import React from "react";
import * as types from "./ActionTypes";

const initialState = {
  fetching: false,
  sers: {},
  plans: [],
  failed: false,
};

export function oneServices(state = initialState, action) {
  switch (action.type) {
    case types.ONE_SERVICES_LOADING:
      return {
        ...state,
        fetching: true,
        failed: false
      };
      break;
    case types.ONE_SERVICES_LOADING_SUCCESS:
      return {
        ...state,
        fetching: false,
        failed: false,
        sers: action.sers,
        plans: action.plans,
      };
      break;
    case types.ONE_SERVICES_LOADING_FAILED:
      return {
        ...state,
        fetching: false,
        failed: true
      };
      break;
    default:
      return state;
  }
}
