import 'regenerator-runtime/runtime';
import * as types from './ActionTypes';
import { GetApi } from '../common/api';
import {trackInput} from '../common/tracking';

export function toggleSearchResultLayout() {
  return { type: types.TOGGLE_SEARCH_RESULTS_LAYOUT };
}

function requestAppMeta() {
  return { type: types.REQUEST_APP_META };
}

export function setMetaFromUrl(country, city = null) {
  const data = {
    userCountry: country,
    userCity: city
  };

  return { type: types.RECV_APP_META, data };
}

function recvAppMeta(data) {
  return { type: types.RECV_APP_META, data };
}

function recvMetaFailed() {
  return { type: types.RECV_APP_META_FAILED };
}

function locationRequest() {
  return { type: types.LOCATION_REQUEST };
}

function locationSuccess(data) {
  return { type: types.LOCATION_SUCCESS, data };
}

function locationFailure(error) {
  return { type: types.LOCATION_FAILURE, error };
}

export function updateInput(input) {
  return { type: types.UPDATE_INPUT, input };
}

export function updateServiceInput(input) {
  return { type: types.UPDATE_SERVICE_INPUT, input };
}

function reqSearchSuggestions() {
  return { type: types.REQUEST_SEARCH_SUGGESTIONS };
}

function recvSuggestionsFailed() {
  return { type: types.RECV_SEARCH_SUGGESTIONS_FAILED };
}

export function setSearchSuggesitions(suggestions) {
  return { type: types.RECV_SEARCH_SUGGESTIONS_SUCCESS, suggestions: suggestions.results };
}

function reqServiceSuggestions() {
  return { type: types.REQUEST_SERVICE_SUGGESTIONS };
}

function recvServiceSuggestionsFailed() {
  return { type: types.RECV_SERVICE_SUGGESTIONS_FAILED };
}

export function setServiceSuggestions(suggestions) {
  return {
    type: types.RECV_SERVICE_SUGGESTIONS_SUCCESS,
    suggestions: suggestions.results[0]
      ? suggestions.results[0].suggestions
      : suggestions.results
  };
}

function requestSearchResults() {
  return { type: types.REQUEST_SEARCH_RESULTS };
}

function recvSearchResults(res) {
  return { type: types.RECV_SEARCH_RESULTS_SUCCESS, res };
}

function recvSemanticResults(results) {
  return { type: types.RECV_SEMANTIC_SEARCH_RESULTS, results };
}

function recvSearchResultsFailure() {
  return { type: types.RECV_SEARCH_RESULTS_FAILED };
}

export function clearInput() {
  return { type: types.UPDATE_INPUT, input: '' };
}

export function clearServiceInput() {
  return { type: types.UPDATE_SERVICE_INPUT, input: '' };
}

export function selectOrganization(organization) {
  return { type: types.SELECT_ORGANIZATION, organization };
}

export function toggleNotifyDialog(toggle){
  return {type: types.TOGGLE_NOTIFY_DIALOG, toggle}
}

export const fetchSearchResults = async (dispatch, getState) => {
  const { input } = getState().search;
  dispatch(requestSearchResults());

  try {
    const data = await GetApi(null, `semantic_results?country=usa&query=${input}&requester_city=''`);
    const results = await data;

    let isSemantic = false;
    let resLen = 0;

    if (results && "semantic_available" in results && results["semantic_available"] === true) {
      isSemantic = true;
      dispatch(recvSemanticResults(results));
    } else {
      const { list_results } = results;
      const res = {
        'results': list_results
      };
      resLen = list_results.length;
      dispatch(recvSearchResults(res));
    }
  } catch (e) {

    dispatch(recvSearchResultsFailure());
  }
};

export const fetchMeta = async(dispatch) => {
  dispatch(requestAppMeta());

  try {
    const data = await GetApi(null, 'meta');
    const appMeta = await data;
    dispatch(recvAppMeta(appMeta));

    if (!appMeta.success) {
      dispatch(recvMetaFailed())
    }
  } catch (e) {
    dispatch(recvMetaFailed());
  }
};

export const fetchSearchSuggestions = async (dispatch, getState) => {
  const { input } = getState().search;

  dispatch(reqSearchSuggestions());
  const country = 'usa'
  try {
    const data = await GetApi(null, `get_results?country=${country}&query=${input}&requester_city=''`);
    const searchResults = await data;

    if (searchResults.success) {
      dispatch(setSearchSuggesitions(searchResults));
    } else {
      dispatch(recvSuggestionsFailed());
    }
  } catch (e) {
    dispatch(recvSuggestionsFailed());
  }
};

export const fetchAreaSearchSuggestions = async (dispatch, getState) => {
  const {input} = getState().search;

  dispatch(reqSearchSuggestions());
  const country = 'usa'
  try {
    const data = await GetApi(null, `area_suggestions?country=${country}&query=${input}`);
    const searchResults = await data;

    if (searchResults.success) {
      dispatch(setSearchSuggesitions(searchResults));
    } else {
      dispatch(recvSuggestionsFailed());
    }
  } catch (e) {
    dispatch(recvSuggestionsFailed());
  }
};

export const fetchServiceSearchSuggestions = async (dispatch, getState) => {
  const { serviceInput, selectedOrganization } = getState().search;
  const country = 'usa';
  let searchResults;

  dispatch(reqServiceSuggestions());
  try {
    searchResults = await GetApi(null, `get_results?country=${country}&query=${serviceInput}&in_org=${selectedOrganization.id}`);

    if (searchResults.success) {
      dispatch(setServiceSuggestions(searchResults));
    } else {
      dispatch(recvServiceSuggestionsFailed());
    }
  } catch (error) {
    dispatch(recvServiceSuggestionsFailed());
  }
}

function allFromOrganizationRequest() {
  return { type: types.ALL_FROM_ORG_REQUEST };
}

function allFromOrganizationSuccess(services) {
  return { type: types.ALL_FROM_ORG_SUCCESS, services };
}

function allFromOrganizationFailure() {
  return { type: types.ALL_FROM_ORG_FAILURE };
}

export const getLocation = async(dispatch) => {
  dispatch(locationRequest());

  try {
    const data = await GetApi(null, `auto_locate`);
    const results = await data;

    const {details} = results;

    if (details) {
      dispatch(trackInput('auto_locate', details.org.name));
      dispatch(locationSuccess(results));
    }
  } catch (error) {
    dispatch(locationFailure(error));
  }
};

export const fetchAllFromOrganization = async (dispatch, getState) => {
  const organization = '49ab4440-1176-4791-a7cf-1e27a756488d';
  const country = 'usa';
  let services;

  dispatch(allFromOrganizationRequest());
  try {
    services = await GetApi(null, `get_results?country=${country}&in_org=${organization}&list_all=true`);

    if (services.success) {
      dispatch(allFromOrganizationSuccess(services));
    } else {
      dispatch(allFromOrganizationFailure());
    }
  } catch (error) {
    dispatch(allFromOrganizationFailure());
  }
}
