import * as types from "./ActionTypes";

const initialState = {
  showNotifyDialog: false,
  locationLoading: true,
  location: {},
  locationError: null,
  input: '',
  serviceInput: '',
  semantic: {},
  isSemantic: false,
  showSearchResultsLayout: false,
  selectedOrganization: null,
  searchSuggestions: [],
  searchSuggestionsLoading: false,
  searchSuggestionsLoadingFailed: false,
  serviceSuggestions: [],
  serviceSuggestionsLoading: false,
  serviceSuggestionsLoadingFailed: false,
  searchResults: [],
  searchResultsLoading: false,
  searchResultsLoadingFailed: false,
  allFromOrg: [],
  allLoading: false,
  allFailed: false,
};

export function search(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_NOTIFY_DIALOG:
      return {
        ...state,
        showNotifyDialog: action.toggle,
      }
    case types.LOCATION_REQUEST:
      return {
        ...state,
        locationLoading: false,
      };
    case types.LOCATION_SUCCESS:
      return {
        ...state,
        locationLoading: false,
        location: action.data.details,
        input : action.data.details.org.name,
        selectedOrganization: {
          ...action.data.details.org,
          heading: action.data.details.org.name,
        },
      };
    case types.LOCATION_FAILURE:
      return {
        ...state,
        locationLoading: false,
        locationError: action.error,
      };
    case types.UPDATE_INPUT:
      return {
        ...state,
        input: action.input
      };
    case types.UPDATE_SERVICE_INPUT:
      return {
        ...state,
        serviceInput: action.input,
      };
    case types.REQUEST_SEARCH_SUGGESTIONS:
      return {
        ...state,
        searchSuggestionsLoading: true
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
        serviceSuggestionsLoading: true,
      };
    case types.RECV_SERVICE_SUGGESTIONS_FAILED:
      return {
        ...state,
        serviceSuggestionsLoading: false,
        serviceSuggestionsLoadingFailed: true,
      };
    case types.RECV_SERVICE_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        serviceSuggestionsLoading: false,
        serviceSuggestionsLoadingFailed: false,
        serviceSuggestions: action.suggestions,
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
        searchResultsLoading : false,
        searchResultsLoadingFailed : false
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
        allLoading: true,
      };
    case types.ALL_FROM_ORG_FAILURE:
      return {
        ...state,
        allLoading: false,
        allFailed: true,
      };
    case types.ALL_FROM_ORG_SUCCESS:
      return {
        ...state,
        allLoading: false,
        allFailed: false,
        allFromOrg: action.services,
      };
    case types.SELECT_ORGANIZATION:
      return {
        ...state,
        selectedOrganization: action.organization,
      };
    default:
      return state;
  }
}
