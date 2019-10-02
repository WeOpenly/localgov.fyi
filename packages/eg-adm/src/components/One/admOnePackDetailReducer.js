import * as types from "./ActionTypes";

const initialState = {
  fetching: false,
  packData: {},
  failure: false,
  failureMsg: ""
};

export function admOnePackDetailReducer(state = initialState, action) {
         switch (action.type) {
           case types.FETCH_PACK_DETAIL:
             return {
               ...state,
               fetching: true
             };
             break;

           case types.FETCH_PACK_DETAIL_SUCCESS:
 
             return {
               ...state,
               fetching: false,
               failure: false,
               packData: action.packData
             };
             break;

           case types.FETCH_PACK_DETAIL_FAILURE:
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
