import queryString from "query-string";
import _ from "lodash";

import * as types from "./ActionTypes";
import {GetApi} from "./api";

export function toggleSearchResultLayout() {
    return {type: types.TOGGLE_SEARCH_RESULTS_LAYOUT}
}

function requestAppMeta() {
    return {type: types.REQUEST_APP_META};
}

export function setMetaFromUrl(country, city=null){
    const data = {
        userCountry: country,
        userCity: city
    }

    return {
        type: types.RECV_APP_META, 
        data,
    }
}

function recvAppMeta(data) {
    return {type: types.RECV_APP_META, data};
}

function recvMetaFailed() {
    return {type: types.RECV_APP_META_FAILED};
}

export function updateInput(input) {
    return {type: types.UPDATE_INPUT, input};
}

function reqSearchSuggestions() {
    return {type: types.REQUEST_SEARCH_SUGGESTIONS};
}

function recvSuggestionsFailed() {
    return {type: types.RECV_SEARCH_SUGGESTIONS_FAILED};
}

function setSearchSuggesitions(suggestions) {
    return {type: types.RECV_SEARCH_SUGGESTIONS_SUCCESS, suggestions: suggestions.results};
}

function requestSearchResults() {
    return {type: types.REQUEST_SEARCH_RESULTS};
}

function recvSearchResults(res) {
    return {type: types.RECV_SEARCH_RESULTS_SUCCESS, res};
}

function recvSemanticResults(results) {
    return {type: types.RECV_SEMANTIC_SEARCH_RESULTS, results}
}

function recvSearchResultsFailure() {
    return {type: types.RECV_SEARCH_RESULTS_FAILED};
}

export function clearInput() {
    return {type: types.UPDATE_INPUT, input: ''};
}

export const fetchSearchResults = async(dispatch, getState) => {
    const {input} = getState().search;
    dispatch(requestSearchResults());

    dispatch(clearInput());
    try {
        const data = await GetApi(null, `search?country=usa&q=${input}`);
        const searchResults = await data;

        const {results} = searchResults;

        if ("semantic_available" in results && results["semantic_available"] === true) {
            dispatch(recvSemanticResults(results));
        } else {
            const {list_results} = results;
            const res = {
                'results': list_results
            }
            dispatch(recvSearchResults(res));
        }
    } catch (e) {
        dispatch(recvSearchResultsFailure());
    }
};

export const fetchMeta = async(dispatch, getState) => {
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

export const trackSuggestionClick = (query, index, country) => async(dispatch) => {
    try {

        await GetApi('en', `track_suggestion_click?country=${country}&query=${query}&index=${index}`);
    } catch (e) {

    }
};

export const fetchSearchSuggestions = async(dispatch, getState) => {
    const {input} = getState().search;

    dispatch(reqSearchSuggestions());
    const country = 'usa'
    try {
        const data = await GetApi(null, `suggest?country=${country}&query=${input}`);
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
