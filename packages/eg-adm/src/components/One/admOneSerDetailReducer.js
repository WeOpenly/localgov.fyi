import * as types from "./ActionTypes";

const initialState = {
  fetching: false,
  serData: {},
  failure: false,
  failureMsg: ""
};


export function admOneSerDetailReducer(state = initialState, action) {
         switch (action.type) {
           case types.FETCH_SER_DETAIL:
             return {
               ...state,
               fetching: true
             };
             break;
           case types.FETCH_SER_DETAIL_SUCCESS:
             return {
               ...state,
               fetching: false,
               failure: false,
               serData: action.serData
             };
             break;

           case types.FETCH_SER_DETAIL_FAILURE:
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
