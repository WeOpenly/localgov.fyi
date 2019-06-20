import * as types from "./ActionTypes";

const initialState = {
    searchResultCase: null,
    is_assoc_ser: null,
    assoc_original_name: null,
    is_parent_ser : null,
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
        case types.HIDE_RESULT_HELPER_MSG:
            return {
                ...state,
                is_parent_ser: null,
                is_assoc_ser: null,
                assoc_original_name: null,
            }
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
                is_parent_ser: action.is_parent_ser,
                is_assoc_ser: action.is_assoc_ser,
                assoc_original_name: action.assoc_original_name,
                searchResults: action.results,
                searchResultCase: action.case,
                shouldRedirect: action.shouldRedirect,
                searchResultsFoundAtParent: action.is_parent_ser,
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
                ...initialState,
                is_assoc_ser: state.is_assoc_ser,
                is_parent_ser: state.is_parent_ser,
                assoc_original_name: state.assoc_original_name,
            }
        default:
            return state;
    }
}
