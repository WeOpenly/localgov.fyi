import * as types from "./ActionTypes";

const initialState = {
    showLocRequestDialog: false,
    showFeedbackDialog: false,
      showNotifyDialog: false,
};

export function userRequests(state = initialState, action) {
    switch (action.type) {
        case types.TOGGLE_LOC_REQUEST_DIALOG:
            return {
                ...state,
                showLocRequestDialog: action.toggle
            };
        case types.TOGGLE_NOTIFY_DIALOG:
            return {
                ...state,
                showNotifyDialog: action.toggle,
            };
        case types.TOGGLE_FEEDBACK_DIALOG:
            return {
                ...state,
                showFeedbackDialog: action.toggle,
            };
        default:
            return state;
    }
}
