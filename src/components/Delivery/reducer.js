import * as types from "./ActionTypes";

const initialState = {
    showDeliveryDialog: false,
    flowSummaryLoading: false,
    flowSummary: [],
    flowSummaryLoadingFailed: false,
    requestFlowCreate: false,
    successFlowCreate: false,
    failedFlowCreate: false,
    serviceFlowLoading: false,
    serviceFlow: {},
    serviceFlowLoadingFailed: false,
    stepDetailsLoading: false,
    stepDetails: {},
    stepDetailsLoadingFailed: false,
    requestStepDetailsSubmit: false,
    successStepDetailsSubmit: false,
    failedStepDetailsSubmit: false,
};


export function delivery(state = initialState, action) {
    switch (action.type) {
        case types.TOGGLE_DELIVERY_DIALOG:
            return {
                ...state,
                showDeliveryDialog: action.toggle
            };
        case types.REQUEST_SERVICE_FLOW_BLUE_PRINT_SUMMARY:
            return {
                ...state,
                flowSummaryLoading: true,
            }
        case types.SUCCESS_RECV_FLOW_BLUE_PRINT_SUMMARY:
            return {
                ...state,
                flowSummaryLoading: false,
                flowSummary: action.flowSummary
            }
        case types.FAILED_RECV_FLOW_BLUE_PRINT_SUMMARY:
            return {
                ...state,
                flowSummaryLoading: false,
                flowSummaryLoadingFailed: true,
            }
        case types.REQUEST_CREATE_SERVICE_FLOW:
            return {
                ...state,
                requestFlowCreate: true,
            }
        case types.SUCCESS_CREATE_SERVICE_FLOW:
            return {
                ...state,
                serviceFlow: action.flowDetails,
                requestFlowCreate: false,
                successFlowCreate: true
            }
        case types.FAILED_CREATE_SERVICE_FLOW:
            return {
                ...state,
                requestFlowCreate: false,
                failedFlowCreate: true,
            }
        case types.REQUEST_UDPATE_SERVICE_FLOW:
            return {
                ...state,
                serviceFlowLoading: true
            }
        case types.SUCCESS_UPDATE_SERVICE_FLOW:
            return {
                ...state,
                serviceFlowLoading: false,
                serviceFlow: action.flowDetails
            }
        case types.FAILED_UPDATE_SERVICE_FLOW:
            return {
                ...state,
                serviceFlowLoading: false,
                serviceFlowLoadingFailed: true
            }
        case types.REQUEST_STEP_DETAILS:
            return {
                ...state,
                stepDetailsLoading: true,
            }
        case types.SUCCESS_RECV_STEP_DETAILS:
            return {
                ...state,
                stepDetailsLoading: false,
                stepDetails: action.stepDetails
            }
        case types.FAILED_RECV_STEP_DETAILS:
            return {
                ...state,
                stepDetailsLoading: false,
                stepDetailsLoadingFailed: true,
            }
        case types.REQUEST_STEP_DETAILS_SUBMIT:
            return {
                ...state,
                requestStepDetailsSubmit: true,
            }
        case types.SUCCESS_SUBMIT_STEP:
            return {
                ...state,
                requestStepDetailsSubmit: false,
                successStepDetailsSubmit: true,
            }
        case types.FAILED_STEP_DETAILS_SUBMIT:
            return {
                ...state,
                requestStepDetailsSubmit: false,
                failedStepDetailsSubmit: true
            }
        default:
            return state;
    }
}

