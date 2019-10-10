import * as types from "./ActionTypes";

const initialState = {
  fetching: false,
  items: [],
  failure: false,
  failureMsg: ""
};



export function admOneUserSerTxnReducer(state = initialState, action) {
    switch (action.type) {
      case types.FETCH_USER_SER_TXN:
        return {
          ...state,
          fetching: true
        };
        break;

      case types.FETCH_USER_SER_TXN_SUCCESS:
        return {
          ...state,
          fetching: false,
          failure: false,
          items: action.items
        };
        break;

      case types.FETCH_USER_SER_TXN_FAILURE:
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
