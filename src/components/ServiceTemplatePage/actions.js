import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
import { YusufApi } from '../common/api';

const windowGlobal = typeof window !== 'undefined' && window

export function clearAll(){
    return {
        type: types.CLEAR_ALL
    }
}

export function setGoogRegion(region){
    return {type: types.SET_GOOG_REGION, region}
}

function setAutoRegion(region){
    return {type: types.SET_AUTO_REGION, region}
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
        dispatch(requestFetchAutoloc());

        try {
            const resp = await YusufApi(null, `template_results?service_template_id=${serTemplateId}&auto=True`, null, null);
   
            if (resp && resp.success) {
                dispatch(recvFetchAutLoc(resp.suggested));
                dispatch(setAutoRegion(resp.region));
            }else{
                 dispatch(failedRecvFetchAutoloc());
                 if(resp && resp.region){
                    dispatch(setAutoRegion(resp.region));
                 }
            }

        } catch (e) {
            dispatch(failedRecvFetchAutoloc());
        }
    }
}

export function updateSearchText(text){
    return {
        type: types.UPDATE_SEARCH_TEXT_FOR_GOOG,
        text
    }
}

function requestFetchGoogleLoc() {
    return { type: types.REQUEST_GOOG_SUGGESTED_LOCS}
}

function recvFetchGoogleLoc(suggestions) {
    return { type: types.SUCCESS_RECV_GOOG_SUGGESTED_LOCS, suggestions}
}

function failedFetchGoogleLoc() {
    return { type: types.FAILED_RECV_GOOG_SUGGESTED_LOCS}
}


export function fetchGoogLoc(serTemplateId, latlng) {
    return async(dispatch, getState) => {
        dispatch(clearAll());
        dispatch(requestFetchGoogleLoc());

        const {lat, lng} = latlng;
        try {
            const resp = await YusufApi(null, `template_results?service_template_id=${serTemplateId}&lat=${lat}&lng=${lng}`, null, null);

            if (resp && resp.success) {
                dispatch(recvFetchGoogleLoc(resp.suggested));
                dispatch(setAutoRegion(resp.region));
            }else{
                dispatch(failedFetchGoogleLoc());
                if (resp && resp.region) {
                    dispatch(setAutoRegion(resp.region));
                }
            }

        } catch (e) {
            dispatch(failedFetchGoogleLoc());
        }
    }
}