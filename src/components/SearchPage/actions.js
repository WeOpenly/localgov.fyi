import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
import { YusufApi } from '../common/api';
import {trackEvent} from '../common/api';
import queryString from 'query-string'

const windowGlobal = typeof window !== 'undefined' && window

function clearAll() {
    return {
        type: types.CLEAR_ALL
    }
}

function requestSearchResults() {
    return { type: types.REQUEST_SEARCH_RESULTS }
}

function recvSearchResults(results, whichCase, shouldRedirect, is_parent_ser, is_assoc_ser, assoc_original_name) {
    return { type: types.RECV_SEARCH_RESULTS_SUCCESS, case: whichCase, results, is_parent_ser, shouldRedirect, is_assoc_ser, assoc_original_name}
}

function failedRecvSearchResults() {
    return { type: types.FAILED_RECV_SEARCH_RESULTS }
}


export function hideResultHelperMsg(){
    return { type: types.HIDE_RESULT_HELPER_MSG }
}

export function fetchSearchResults(lat, lng, service_template_id, service_text) {
    return async (dispatch, getState) => {
        dispatch(clearAll());
        dispatch(requestSearchResults());
        let params = {
            lat,
            lng
        }
        if(service_template_id){
            params['service_template_id'] = service_template_id
        }
        if(service_text){
            params['service_text'] = service_text
        }
        const newQueryString = queryString.stringify(params);

        try {
            const resp = await YusufApi(null, `get_search_results?${newQueryString}`, null, null);

            if (resp && resp.success) {
                dispatch(recvSearchResults(resp.results, resp.case, resp.is_redirect, resp.is_parent_ser, resp.is_assoc_ser, resp.assoc_original_name));
            }
            else{
                dispatch(failedRecvSearchResults()); 
            }
        } catch (e) {
            dispatch(failedRecvSearchResults());
        }
    }
}