import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
import { YusufApi } from '../common/api';

const windowGlobal = typeof window !== 'undefined' && window

function clearAll(){
    return {
        type: types.CLEAR_ALL
    }
}

function requestFetchAutoloc() {
    return {type: types.REQUEST_AUTO_SUGGESTED_LOCS}
}

function recvFetchAutLoc(suggestions) {
    return {type: types.SUCCESS_RECV_AUTO_SUGGESTED_LOCS, suggestions}
}

function failedRecvFetchAutoloc() {
    return {type: types.FAILED_RECV_AUTO_SUGGESTED_LOCS}
}

export function fetchAutoLoc(serTemplateId) {
    return async (dispatch, getState) => {
        dispatch(clearAll());
        dispatch(requestFetchAutoloc());

        try {
            const resp = await YusufApi(null, `template_results?service_template_id=${serTemplateId}&auto=True`, null, null);

            if (resp && resp.success) {
                dispatch(recvFetchAutLoc(resp.suggested));
            }

        } catch (e) {
            dispatch(failedRecvFetchAutoloc());
        }
    }
}



function requestFetchGoogleLoc() {
    return { type: types.REQUEST_GOOG_SUGGESTED_LOCS}
}

function recvFetchGoogleLoc(suggestions) {
return {type: types.SUCCESS_RECV_GOOG_SUGGESTED_LOCS, suggestions}
}

function failedFetchGoogleLoc() {
    return { type: types.FAILED_RECV_GOOG_SUGGESTED_LOCS}
}


export function fetchGoogLoc(serTemplateId, latlng) {
    return async(dispatch, getState) => {
        dispatch(requestFetchGoogleLoc());
        const {lat, lng} = latlng;
        try {
            const resp = await YusufApi(null, `template_results?service_template_id=${serTemplateId}&lat=${lat}&lng=${lng}`, null, null);

            if (resp && resp.success) {
                dispatch(recvFetchGoogleLoc(resp.suggested));
            }else{
                dispatch(failedFetchGoogleLoc());
            }

        } catch (e) {
            dispatch(failedFetchGoogleLoc());
        }
    }
}