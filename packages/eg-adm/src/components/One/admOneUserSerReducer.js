import * as types from "./ActionTypes";

const initialState = {
  fetching: false,
  services: [],
  userData: {},
  failure: false,
  failureMsg: ""
};



export function admOneUserSerReducer(state = initialState, action) {
         switch (action.type) {
           case types.FETCH_USER_SER:
             return {
               ...state,
               fetching: true
             };
             break;
           case types.SET_USER_DETAIL:
             return {
               ...state,
               fetching: false,
               userData: action.userData
             };
             break;
           case types.FETCH_USER_SER_SUCCESS:
             return {
               ...state,
               fetching: false,
               failure: false,
               services: action.sers
             };
             break;

           case types.FETCH_USER_SER_FAILURE:
             return {
               ...state,
               fetching: false,
               failure: true
             };
             break;
           default:
             return state;
         }
       }
