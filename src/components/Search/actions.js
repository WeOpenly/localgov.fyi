import queryString from "query-string";
import _ from "lodash";
import 'regenerator-runtime/runtime';
import Fingerprint2 from 'fingerprintjs2';
import * as types from "./ActionTypes";
import {GetApi} from "./api";

export function toggleSearchResultLayout() {
    return {type: types.TOGGLE_SEARCH_RESULTS_LAYOUT}
}

function requestAppMeta() {
    return {type: types.REQUEST_APP_META};
}

export function setMetaFromUrl(country, city = null) {
    const data = {
        userCountry: country,
        userCity: city
    }

    return {type: types.RECV_APP_META, data}
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

export function setSearchSuggesitions(suggestions) {
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

    try {
        const data = await GetApi(null, `semantic_results?country=usa&query=${input}&requester_city=''`);
        const results = await data;

        let isSemantic = false;
        let resLen = 0;

        if (results && "semantic_available" in results && results["semantic_available"] === true) {
            isSemantic = true;
            dispatch(recvSemanticResults(results));
        } else {
            const {list_results} = results;
            const res = {
                'results': list_results
            }
            resLen = list_results.length;
            dispatch(recvSearchResults(res));
        }

        const eventParams = {
            event_type: 'search_query',
            search_query: input,
            semantic: isSemantic,
            number_of_results: resLen
        }
        const payloadParams = Object
            .keys(eventParams)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(eventParams[k])}`)
            .join('&');

        fetch(`https://d3qlx9ss0mi45s.cloudfront.net/localgov.fyi/track.png?${payloadParams}`, {}).then((data) => {}).catch((err) => {})
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

export const fetchSearchSuggestions = async(dispatch, getState) => {
    const {input} = getState().search;

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

export const trackSuggestionClick = (currentPage, text, index, clicked_entity_type, clicked_entity_id, clicked_entity_name) => async(dispatch, getState) => {
        new Fingerprint2().get(function (result, components) {
            try {
                const eventParams = {
                    e: 'suggestion_click',
                    s: text,
                    p: currentPage,
                    i: index,
                    c_e_t: clicked_entity_type,
                    c_e_id: clicked_entity_id,
                    c_e_n: clicked_entity_name,
                    fp: result,
                }
                console.log(eventParams);
                const payloadParams = Object
                    .keys(eventParams)
                    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(eventParams[k])}`)
                    .join('&');

                fetch(`https://d3qlx9ss0mi45s.cloudfront.net/localgov.fyi/track.png?${payloadParams}`, {}).then((data) => { }).catch((err) => { });
            } catch (e) {
               console.log(e);
            }
        });
};

export const fetchAreaSearchSuggestions = async(dispatch, getState) => {
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
