import * as types from "./ActionTypes";

const initialState = {
    showLogin: false,
    showRegister: false,
    loginRequest: false,
    loggedIn: false,
    loginFailure: false,
    registesRequest: false,
    registerEmailVerificationRequired: false,
    registerFailed: false,
    accessToken: null,
    currentUser: null,
};

export function account(state = initialState, action) {
    switch (action.type) {
        case types.TOGGLE_LOGIN_DIALOG:
            return {
                ...state,
                showLogin: action.toggle
            };
        case types.TOGGLE_REGISTER_DIALOG:
            return {
                ...state,
                showRegister: action.toggle
            };
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loginRequest: true,
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                accessToken: action.accessToken,
                currentUser: action.currentUser,
            }
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loginRequest : false,
                loginFailure: true,
            };
        case types.REGISTER_REQUEST:
            return {
                ...state,
                registesRequest : true,
            };
        case types.REGISTER_SUBMITTED:
            return {
                ...state,
                registesRequest: false,
                registerEmailVerificationRequired: true,
            };
        case types.REGISTER_FAILURE:
            return {
                ...state,
                registesRequest: false,
                registerFailed: true
            };
        case types.RECV_SEARCH_SUGGESTIONS_FAILED:
            return {
                ...state,
                searchSuggestionsLoadingFailed: true,
                searchSuggestionsLoading: false
            };
        case types.RECV_SEARCH_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                searchSuggestions: action.suggestions,
                searchSuggestionsLoadingFailed: false,
                searchSuggestionsLoading: false
            };
        case types.REQUEST_SERVICE_SUGGESTIONS:
            return {
                ...state,
                serviceSuggestionsLoading: true
            };
        case types.RECV_SERVICE_SUGGESTIONS_FAILED:
            return {
                ...state,
                serviceSuggestionsLoading: false,
                serviceSuggestionsLoadingFailed: true
            };
        case types.RECV_SERVICE_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                serviceSuggestionsLoading: false,
                serviceSuggestionsLoadingFailed: false,
                serviceSuggestions: action.suggestions
            };
        case types.REQUEST_SEARCH_RESULTS:
            return {
                ...state,
                searchResultsLoading: true,
                searchResultsLoadingFailed: false
            };
        case types.RECV_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                isSemantic: false,
                semantic: {},
                searchResults: action.res.results,
                searchResultsLoading: false,
                searchResultsLoadingFailed: false
            };
        case types.RECV_SEMANTIC_SEARCH_RESULTS:
            return {
                ...state,
                isSemantic: true,
                semantic: action.results,
                searchResultsLoading: false,
                searchResultsLoadingFailed: false
            };
        case types.RECV_SEARCH_RESULTS_FAILED:
            return {
                ...state,
                searchResultsLoading: false,
                searchResultsLoadingFailed: true
            };
        case types.ALL_FROM_ORG_REQUEST:
            return {
                ...state,
                allLoading: true
            };
        case types.ALL_FROM_ORG_FAILURE:
            return {
                ...state,
                allLoading: false,
                allFailed: true
            };
        case types.ALL_FROM_ORG_SUCCESS:
            return {
                ...state,
                allLoading: false,
                allFailed: false,
                allFromOrg: action.services
            };
        case types.SELECT_ORGANIZATION:
            return {
                ...state,
                selectedOrganization: action.organization
            };
        default:
            return state;
    }
}
