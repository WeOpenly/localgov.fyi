import * as types from "./ActionTypes";

const initialState = {
    showLocRequestDialog: false
};

export function userRequests(state = initialState, action) {
    switch (action.type) {
        case types.TOGGLE_LOC_REQUEST_DIALOG:
            return {
                ...state,
                showLocRequestDialog: action.toggle
            };
        default:
            return state;
    }
}
