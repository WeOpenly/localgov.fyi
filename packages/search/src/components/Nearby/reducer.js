import * as types from "./ActionTypes";

const initialState = {
    loading: false,
    items: [],
    failed: false
};

export function nearbyOrgs(state = initialState, action) {
    switch (action.type) {
     
        case types.REQUEST_NEARBY_ORGS:
            return {
                ...initialState,
                loading: true
            }
        case types.RECV_NEARBY_ORGS:
            return {
                ...initialState,
                loading: false,
                items: action.items
            }
        case types.FAILED_RECV_NEARBY_ORGS:
            return {
                ...initialState,
                loading: false,
                failed: true
            }
        case types.CLEAR_ALL:
            return {
                ...initialState
            }
        default:
            return state;
    }
}