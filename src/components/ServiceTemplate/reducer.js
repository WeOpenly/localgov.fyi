import * as types from "./ActionTypes";

const initialState = {
    autoLocLoading: false,
    autoLocResults: [],
    autoLocFailed: false,
    googLocLoading: false,
    googLocResults: [],
    googlLocFailed: false,
    googLat: null,
    googLng: null
};

export function serTemplate(state = initialState, action) {
    switch (action.type) {
        case types.REQUEST_AUTO_SUGGESTED_LOCS:
            return {
                ...state,
                autoLocLoading: true,
                autoLocFailed: false,
            };
        case types.SUCCESS_RECV_AUTO_SUGGESTED_LOCS:
            return {
                ...state,
                autoLocResults: action.suggestions,
                autoLocLoading: false,
            }
        case types.FAILED_RECV_AUTO_SUGGESTED_LOCS:
            return {
                ...state,
                autoLocLoading: false,
                autoLocFailed: true
            }
        case types.REQUEST_GOOG_SUGGESTED_LOCS:
            return {
                ...state,
                googLocLoading: true,
                googlLocFailed: false,
            };
        case types.SUCCESS_RECV_GOOG_SUGGESTED_LOCS:
            return {
                ...state,
                googLocResults: action.suggestions,
                googLocLoading: false,
            }
        case types.FAILED_RECV_GOOG_SUGGESTED_LOCS:
            return {
                ...state,
                googLocLoading: false,
                googlLocFailed: true
            }
        case types.CLEAR_ALL:
            return {
                ...initialState,
            }
        case types.CLEAR_GOOG_LAT_LNG:
            return {
                ...state,
                googLat: null,
                googLng: null
            }
        default:
            return state;
    }
}
