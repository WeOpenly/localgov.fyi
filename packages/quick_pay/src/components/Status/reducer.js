import * as types from "./ActionTypes";

const initialState = {
    loading: false,
    details: {},
    failed:false,
};

export function quickPayStatus(state = initialState, action) {
  switch (action.type) {
   case types.QP_STATUS_LOAD_BEGIN:
       return {
         ...state,
         loading: true
       };
    case types.QP_STATUS_LOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          details: action.details,
          failed: false,
        };
    case types.QP_STATUS_LOAD_FAILED:
        return {
          ...state,
          loading: false,
          failed: true
        };
    default:
      return state;
  }
}
