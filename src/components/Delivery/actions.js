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
            // const steps = await DspApi(`/dashboard/api/ser/flow_summary/?service_id=${serviceId}`, "GET", null, null);
            flowSummary = [{
                'step_name': 'Fill form details',
                'step_description': 'Fill in required details about your ultility bill that help us find your details'
            },
            {
                'step_name': 'Find out your outstanding bill',
                'step_description': 'We do the hard work of finding your account details and outstanding bill'
            },
            {
                'step_name': 'Pay your bill',
                'step_description': 'Pay your outstanding bill with one click'
            }
        ]
            if(windowGlobal){
                windowGlobal. setTimeout(() => {
                    dispatch(recvServiceFlowBpSummary(flowSummary));
                }, 1000);
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
            // const steps = await
            // DspApi(`/dashboard/api/ser/flow_summary/?service_id=${serviceId}`, "GET",
            // null, null);
            flowDetails = {
                flowId: 1,
                steps: [{
                    'id': 1,
                    'step_name': 'Fill form details',
                    'step_description': 'Fill in required details about your ultility bill that help us find your details',
                    'ready': true,
                    'active': true,
                    'complete': false,
                }, {
                    'id': 2,
                    'step_name': 'Find out your outstanding bill',
                    'step_description': 'We do the hard work of finding your account details and outstanding bill',
                    'ready': false,
                    'active': true,
                    'complete': false,
                }, {
                    'id': 3,
                    'step_name': 'Pay your bill',
                    'step_description': 'Pay your outstanding bill with one click',
                    'ready': false,
                    'active': true,
                    'complete': false,
                }]
            }
               
            if (windowGlobal) {
                windowGlobal.setTimeout(() => {
                    dispatch(successCreateServiceFlow(flowSummary));
                }, 1000);
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


export function updateServiceFlow(flowId) {
    return async(dispatch, getState) => {
        dispatch(requestRefreshServiceFlow());

        try {
            // const steps = await
            // DspApi(`/dashboard/api/ser/flow_summary/?service_id=${serviceId}`, "GET",
            // null, null);
            flowDetails = {
                flowId: 1,
                steps: [
                    {
                        'id': 1,
                        'step_name': 'Fill form details',
                        'step_description': 'Fill in required details about your ultility bill that help us find your details',
                        'ready': true,
                        'active': false,
                        'complete': true
                    }, {
                        'id': 2,
                        'step_name': 'Find out your outstanding bill',
                        'step_description': 'We do the hard work of finding your account details and outstanding bill',
                        'ready': false,
                        'active': true,
                        'complete': false
                    }, {
                        'id': 3,
                        'step_name': 'Pay your bill',
                        'step_description': 'Pay your outstanding bill with one click',
                        'ready': false,
                        'active': true,
                        'complete': false
                    }
                ],
                currentStep: {
                     'id': 2,
                        'step_name': 'Fill form details',
                        'step_description': 'Fill in required details about your ultility bill that help us find your details',
                        'ready': true,
                        'active': false,
                        'complete': true
                }
            }

            if (windowGlobal) {
                windowGlobal.setTimeout(() => {
                    dispatch(successRefreshServiceFlow(flowSummary));
                    // const stepId = 2 CALCULCATE THIS
                    // dispatch(setCurrentStep(2));
                }, 1000);
            }
        } catch (e) {
            dispatch(failedRefreshServiceFlow());
        }
    }
}



//  STEP actions

function requestStepDetails(stepId) {
    return {type: types.REQUEST_STEP_DETAILS, stepId}
}

function recvStepDetails(currentStep) {
    return {type: types.SUCCESS_RECV_STEP_DETAILS, currentStep}
}

function failedRecvStepDetails() {
    return {type: types.FAILED_RECV_STEP_DETAILS}
}

export function fetchStepDetails(stepId) {
    return async(dispatch, getState) => {
        dispatch(requestStepDetails());

        try {
            // const step_details = await DspApi(`/dashboard/api/ser/flow_form/${stepId}/`, "GET", null, null);

            const stepDetails = {
                    'id': 1,
                    'step_name': 'Fill form details',
                    'step_description': 'Fill in required details about your ultility bill that help us find your details',
                    'step_type': 'form',
                    'step_details': {
                        'field_schema' : {
                            "title": "Pay Utility bill",
                            "description": "Make a one time payment for your utility bills",
                            "type": "object",
                            "required": [
                                "accountNumber", "zipcode"
                            ],
                            "properties": {
                                "accountNumber": {
                                    "type": "string",
                                    "title": "SPU or SCL account number:"
                                },
                                "zipcode": {
                                    "type": "integer",
                                    "title": "Mailing address zip code"
                                }
                            }
                        },
                        'ui_schema': {
                            "accountNumber": {
                                "ui:autofocus": true,
                                "ui:emptyValue": "",
                                "ui:description": "Enter account number exactly as it appears on the bill."
                            },
                            "zipcode": {
                                "ui:emptyValue": "98101"
                            }
                        }
                    }
                }
            
            if (windowGlobal) {
                windowGlobal.setTimeout(() => {
                    dispatch(recvStepDetails(stepDetails));
                }, 1000);
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

export function submitStepDetails(stepId, stepDetailsToSubmit) {
    return async(dispatch, getState) => {
        dispatch(stepSubmitStart());

        try {//user step
            // const step_details = await DspApi(`/dashboard/api/ser/flow`, "POST", null, null);
            if (windowGlobal) {
                windowGlobal.setTimeout(() => {
                    dispatch(stepSubmitSuccess());
                }, 1000);
            }
        } catch (e) {
            dispatch(stepSubmitFailed());
        }
    }
}

