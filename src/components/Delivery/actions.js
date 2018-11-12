import 'regenerator-runtime/runtime';
import {SubmissionError} from 'redux-form';
import * as types from './ActionTypes';
import {navigate} from '@reach/router';
import {DspApi} from '../common/api';


export function toggleDeliveryDialog(toggle) {
    return {type: types.TOGGLE_DELIVERY_DIALOG, toggle}
}

function requestStep(step_type) {
    return {type: types.REQUEST_CURRENT_USER_STEP, step_type}
}

function recvStep(step_details) {
    return {type: types.SUCCESS_RECV_CURRENT_USER_STEP, step_details}
}

function failedRecvStep() {
    return {type: types.FAILED_RECV_CURRENT_USER_STEP}
}

//  later send user id and service id instead of just step id
// when you call user with service id, it looks up and creates one if it doesn't exist and keeps track of the current step
export function fetchUserCurrentStepDetails(stepId) {
    return async(dispatch, getState) => {
        dispatch(requestStep());

        try {
            const step_details = await DspApi(`/dashboard/api/ser/flow_form/${stepId}/`, "GET", null, null);
            dispatch(recvStep(step_details));
        } catch (e) {
            dispatch(failedRecvStep());
        }
    }
}

function stepSubmitStart(step_type) {
    return {type: types.REQUEST_CURRENT_STEP, step_type}
}

function stepSubmitSuccess(step_details) {
    return {type: types.SUCCESS_RECV_CURRENT_STEP, step_details}
}

function stepSubmitFailed() {
    return {type: types.FAILED_RECV_CURRENT_STEP}
}

export function submitStep(stepId, stepDetailsToSubmit) {
    return async(dispatch, getState) => {
        dispatch(requestStep());

        try {//user step
            const step_details = await DspApi(`/dashboard/api/ser/flow`, "POST", null, null);
            dispatch(recvStep(step_details));
        } catch (e) {
            dispatch(failedRecvStep());
        }
    }
}


function requestFlowSteps() {
    return {type: types.REQUEST_FLOW_STEPS}
}

function recvFlowSteps(steps) {
    return {type: types.SUCCESS_RECV_FLOW_STEPS, steps}
}

function failedRecvFlowSteps() {
    return {type: types.FAILED_RECV_FLOW_STEPS}
}

export function fetchFlowSteps(serviceId) {
    return async(dispatch, getState) => {
        dispatch(requestFlowSteps());

        try {
            const steps = await DspApi(`/dashboard/api/ser/flow/?service_id=${serviceId}`, "GET", null, null);
            dispatch(recvFlowSteps(steps));
            console.log(steps);
            if(steps && steps.length > 0){
                if(steps[0].form_step){
                    dispatch(fetchUserCurrentStepDetails(steps[0].form_step.id))
                }
            }
        } catch (e) {
            console.log(e)
            dispatch(failedRecvFlowSteps());
        }
    }
}
