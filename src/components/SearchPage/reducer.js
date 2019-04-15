import * as types from "./ActionTypes";

const initialState = {
    searchResultCase: null,
    searchResultsFoundAtParent: false,
    shouldRedirect: false,
    searchResultsLoading: false,
    searchResults: [],
    searchResultsFailed: false,
    nearByOrgsLoading: false,
    nearByOrgs: [],
    nearByOrgsFailed: false,
};

export function searchPage(state = initialState, action) {
    switch (action.type) {
        case types.REQUEST_SEARCH_RESULTS:
            return {
                ...state,
                searchResultsLoading: true,
                searchResultsFailed: false
            };
        case types.RECV_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                searchResultsLoading: false,
                searchResults: action.results,
                searchResultCase: action.case,
                shouldRedirect: action.shouldRedirect,
                searchResultsFoundAtParent: action.found_at_parent,
                searchResultsFailed: false
            }
        case types.FAILED_RECV_SEARCH_RESULTS:
            return {
                ...state,
                searchResultsLoading: false,
                searchResultsFailed: true
            }
        case types.REQUEST_EXTRA_RESULTS:
            return {
                ...state,
                extraResultsLoading: true,
                extraResultsFailed: false,
            }
        case types.RECV_EXTRA_RESULTS:
            return {
                ...state,
                extraResultsLoading: false,
                extraResults: action.results
            }
        case types.FAILED_RECV_EXTRA_RESULTS:
            return {
                ...state,
                extraResultsLoading: false,
                extraResultsFailed: true
            }
        case types.CLEAR_ALL:
            return {
                ...initialState
            }
        default:
            return state;
    }
}
