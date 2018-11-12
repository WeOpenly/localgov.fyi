import * as types from "./ActionTypes";

const initialState = {
    showDeliveryDialog: false,
    flowStepsLoading: false,
    flowSteps: [],
    flowStepsLoadingFailed: false,
    currentUserStepIndex: 0,
    currentUserStepLoading: false,
    currentUserLoadingStepType: '',
    currentUserStepDetails: {},
    currentUserStepLaodingFailing: false,
};


export function delivery(state = initialState, action) {
    switch (action.type) {
        case types.TOGGLE_DELIVERY_DIALOG:
            return {
                ...state,
                showDeliveryDialog: action.toggle
            };
        case types.REQUEST_FLOW_STEPS:
            return {
                ...state,
                flowStepsLoading: true,
            }
        case types.SUCCESS_RECV_FLOW_STEPS:
            return {
                ...state,
                flowStepsLoading: false,
                flowSteps: action.steps
            }
        case types.FAILED_RECV_FLOW_STEPS:
            return {
                ...state,
                flowStepsLoading: false,
                flowStepsLoadingFailed: true,
            }
        case types.REQUEST_CURRENT_USER_STEP:
            return {
                ...state,
                currentUserStepLoading: true,
            }
        case types.SUCCESS_RECV_CURRENT_USER_STEP:
            return {
                ...state,
                currentUserStepLoading: false,
                currentUserStepDetails: action.step_details
            }
        case types.FAILED_RECV_CURRENT_STEP:
            return {
                ...state,
                currentUserStepLoading: false,
                currentUserStepLaodingFailing: true,
            }
        default:
            return state;
    }
}
