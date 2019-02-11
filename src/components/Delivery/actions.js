import 'regenerator-runtime/runtime';
import {SubmissionError} from 'redux-form';
import * as types from './ActionTypes';
import {navigate} from '@reach/router';
import {DspApi} from '../common/api';

const windowGlobal = typeof window !== 'undefined' && window

//  flow dialog actions
export function toggleDeliveryDialog(toggle) {
    return {type: types.TOGGLE_DELIVERY_DIALOG, toggle}
}

//  flow blue print summary actions

function requestServiceFlowBpSummary() {
    return {type: types.REQUEST_SERVICE_FLOW_BLUE_PRINT_SUMMARY}
}

function recvServiceFlowBpSummary(flowSummary) {
    return {type: types.SUCCESS_RECV_FLOW_BLUE_PRINT_SUMMARY, flowSummary}
}

function failedRecvServiceFlowBpSummary() {
    return {type: types.FAILED_RECV_FLOW_BLUE_PRINT_SUMMARY}
}

export function ferchServiceBpFlowSummary(serviceId) {
    return async(dispatch, getState) => {
        dispatch(requestServiceFlowBpSummary());

        try {
            const steps = await DspApi(`/serve/service_request_flow/api/summary/`, "GET", null, null);
            if (steps && steps.success){
                dispatch(recvServiceFlowBpSummary(steps.steps));
            }
            
        } catch (e) {
            dispatch(failedRecvServiceFlowBpSummary());
        }
    }
}

//  flow actions 

function requestCreateServiceFlow() {
    return {type: types.REQUEST_CREATE_SERVICE_FLOW}
}

function successCreateServiceFlow(flowDetails) {
    return {type: types.SUCCESS_CREATE_SERVICE_FLOW, flowDetails}
}

function failedCreateServiceFlow() {
    return {type: types.FAILED_CREATE_SERVICE_FLOW}
}

export function createServiceFlow(serviceId) {
    return async(dispatch, getState) => {
        dispatch(requestCreateServiceFlow());

        try {

            const allValues = { service_id: serviceId };
            console.log(allValues);

            const createdFlow = await DspApi(`/serve/service_request_flow/api/create/`, "PUT", null, allValues);
               
            if (createdFlow && createdFlow.success) {
                dispatch(successCreateServiceFlow(createdFlow));
            }
        } catch (e) {
            dispatch(failedCreateServiceFlow());
        }
    }
}

function requestRefreshServiceFlow() {
    return {type: types.REQUEST_UDPATE_SERVICE_FLOW}
}

function successRefreshServiceFlow(flowDetails) {
    return {type: types.SUCCESS_UPDATE_SERVICE_FLOW, flowDetails}
}

function failedRefreshServiceFlow() {
    return {type: types.FAILED_UPDATE_SERVICE_FLOW}
}


// export function updateServiceFlow(flowId) {
//     return async(dispatch, getState) => {
//         dispatch(requestRefreshServiceFlow());

//         try {
//             // const steps = await
//             // DspApi(`/dashboard/api/ser/flow_summary/?service_id=${serviceId}`, "GET",
//             // null, null);
//             const flowDetails = {
//                 flowId: 1,
//                 steps: [
//                     {
//                         'id': 1,
//                         'step_type' : 'form',
//                         'step_name': 'Fill form details',
//                         'step_description': 'Fill in required details about your ultility bill that help us find your details',
//                         'ready': true,
//                         'active': false,
//                         'complete': true
//                     }, {
//                         'id': 2,
//                         'step_type': 'callapi_consent',
//                         'step_name': 'Find out your outstanding bill',
//                         'step_description': 'We do the hard work of finding your account details and outstanding bill',
//                         'ready': false,
//                         'active': true,
//                         'complete': false
//                     }, {
//                         'id': 3,
//                         'step_type': 'payment',
//                         'step_name': 'Pay your bill',
//                         'step_description': 'Pay your outstanding bill with one click',
//                         'ready': false,
//                         'active': true,
//                         'complete': false
//                     }
//                 ],
//                 currentStep: {
//                     'id': 2,
//                     'step_type': 'callapi_consent',
//                     'step_name': 'Find out your outstanding bill',
//                     'step_description': 'We do the hard work of finding your account details and outstanding bill',
//                     'ready': false,
//                     'active': true,
//                     'complete': false
//                 }
//             }

//             if (windowGlobal) {
//                 windowGlobal.setTimeout(() => {
//                     dispatch(successRefreshServiceFlow(flowDetails));
//                     // const stepId = 2 CALCULCATE THIS
//                     // dispatch(setCurrentStep(2));
//                 }, 1000);
//             }
//         } catch (e) {
//             dispatch(failedRefreshServiceFlow());
//         }
//     }
// }



//  STEP actions

function requestStepDetails(stepId) {
    return {type: types.REQUEST_STEP_DETAILS, stepId}
}

function recvStepDetails(stepDetails) {
    return {type: types.SUCCESS_RECV_STEP_DETAILS, stepDetails}
}

function failedRecvStepDetails(reason) {
    return {type: types.FAILED_RECV_STEP_DETAILS, reason}
}

export function fetchStepDetails(flowId, action) {
    return async(dispatch, getState) => {
        dispatch(requestStepDetails());

        try {
            const step_details = await DspApi(`/serve/service_request_flow/api/detail/${flowId}/${action}/`, "GET", null, null);

            if(step_details.success===false){
                dispatch(failedRecvStepDetails(step_details.failed_reason));
                return
            }

            if(step_details){
                dispatch(recvStepDetails(step_details));
            }
      
        } catch (e) {
            dispatch(failedRecvStepDetails());
        }
    }
}

function stepSubmitStart() {
    return {type: types.REQUEST_STEP_DETAILS_SUBMIT}
}

function stepSubmitSuccess(step_details) {
    return {type: types.SUCCESS_SUBMIT_STEP, step_details}
}

function stepSubmitFailed() {
    return {type: types.FAILED_STEP_DETAILS_SUBMIT}
}

export function submitStepDetails(flowId, action, stepDetailsToSubmit) {
    return async(dispatch, getState) => {
        dispatch(stepSubmitStart());

        try {

            const step_details = await DspApi(`/serve/service_request_flow/api/detail/${flowId}/${action}/`, "POST", null, stepDetailsToSubmit);
            if (step_details){
                dispatch(stepSubmitSuccess());
                dispatch(successRefreshServiceFlow(step_details));
            }
        } catch (e) {
            dispatch(stepSubmitFailed());
        }
    }
}

