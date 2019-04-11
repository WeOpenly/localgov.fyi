import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
import {YusufApi} from '../common/api';
import queryString from 'query-string'

function requestNearbyOrgs() {
    return { type: types.REQUEST_NEARBY_ORGS }
}

function recvNearbyOrgs(items) {
    return { type: types.RECV_NEARBY_ORGS, items }
}

function failedRecvNearbyOrgs() {
    return { type: types.FAILED_RECV_NEARBY_ORGS }
}

export function fetchNearbyOrgs(lat, lng, service_template_id, service_text, exclude_area_id) {
    return async (dispatch, getState) => {

        dispatch(requestNearbyOrgs());
        let params = {
            lat,
            lng
        }

        if (service_template_id) {
            params['service_template_id'] = service_template_id
        }
        if (service_text) {
            params['service_text'] = service_text
        }
        if (exclude_area_id){
            params['exclude_area_id'] = exclude_area_id
        }

        const newQueryString = queryString.stringify(params);

        try {
            const resp = await YusufApi(null, `get_nearby_results?${newQueryString}`, null, null);

            if (resp && resp.success) {
                dispatch(recvNearbyOrgs(resp.results));
            }
            else {
                dispatch(failedRecvNearbyOrgs());
            }

        } catch (e) {
            dispatch(failedRecvNearbyOrgs());
        }
    }
}
