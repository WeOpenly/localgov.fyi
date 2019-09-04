import * as types from "./ActionTypes";

const initialState = {
  receipts: [],
  loading: false,
  failed: false
};


export function oneReceipts(state = initialState, action) {
    switch (action.type) {
        case types.ONE_USER_RECEIPTS_LOADING:
            return {
                ...state,
                loading: true,
                failed: false
            };
            break;
        case types.ONE_USER_RECEIPTS_SUCCESS:
            return {
                ...state,
                receipts: action.receipts,
                loading: false,
                failed: false
            };
            break;
        case types.ONE_USER_RECEIPTS_LOADING_FAILED:
            return {
                ...state,
                loading: false,
                failed: true
            };
            break;
      default:
        return state;
    }
}
