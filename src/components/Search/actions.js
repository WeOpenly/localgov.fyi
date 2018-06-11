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

    // dispatch(clearSuggestions());
    try {
        // const data = await GetApi(null, `search?country=usa&q=${input}`);
        // const searchResults = await data;
const searchResults = {
    "results": {
        "intent": "list_ser",
        "list_results": [
            {
                "component": "list",
                "heading": "Services from County of San Mateo",
                "results": [
                    {
                        "subhead": "",
                        "type": "service",
                        "id": "005179e3-0adc-4b8d-84d8-cfacfeca7276",
                        "title": "Scam Protection"
                    }, {
                        "subhead": "",
                        "type": "service",
                        "id": "573cfa95-ad88-48f2-ab14-dcd0fada9a7a",
                        "title": "Schedule Civil Wedding Ceremony"
                    }, {
                        "subhead": "",
                        "type": "service",
                        "id": "ea1ae014-e98e-4a8b-ac39-c4feee37c226",
                        "title": "Scam Protection"
                    }, {
                        "subhead": "",
                        "type": "service",
                        "id": "3287f2a1-bb25-4fef-92cc-1873fd6cb05e",
                        "title": "Marriage Certificate"
                    }, {
                        "subhead": "",
                        "type": "service",
                        "id": "fec10164-9fc8-4bb5-85bd-3f0919debb23",
                        "title": "Victim Compensation Program"
                    }, {
                        "subhead": "",
                        "type": "service",
                        "id": "483f4140-f84b-483e-b533-daccb6aa3116",
                        "title": "Dog License"
                    }, {
                        "subhead": "",
                        "type": "service",
                        "id": "f504f05a-4509-4f23-a06a-e8a0ef166bca",
                        "title": "Veteran Services"
                    }, {
                        "subhead": "",
                        "type": "service",
                        "id": "45d84d58-59b8-451c-a617-6711486d7bfd",
                        "title": "Pre-Adoption Service"
                    }, {
                        "subhead": "",
                        "type": "service",
                        "id": "69877255-494c-46a8-81de-c1ae44676a7d",
                        "title": "Birth Certificate"
                    }, {
                        "subhead": "",
                        "type": "service",
                        "id": "09c1d988-5e46-4c60-a920-44db04b6872e",
                        "title": "Bereavement Services"
                    }
                ]
            }
        ],
        "detail_result": {
            "org_name": "County of San Mateo",
            "org_id": "98bb2db7-5227-47ed-b2f4-520304d57fe5",
            "component": "org_detail",
            "contact_details": [
                {
                    "contact_type": "PHONE",
                    "contact_value": "(650) 363-4000"
                }, {
                    "contact_type": "ADDRESS",
                    "contact_value": " 400 County Ctr Redwood City, California 94063"
                }, {
                    "contact_type": "FACEBOOK",
                    "contact_value": "https://www.facebook.com/CountyofSanMateo"
                }, {
                    "contact_type": "TWITTER",
                    "contact_value": "https://twitter.com/sanmateoco"
                }
            ]
        },
        "semantic_available": true,
        "intent_string": "Showing list of services from County of San Mateo"
    },
    "success": true
}

        const {results} = searchResults;
        console.log(results);

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
        console.log(e)
        dispatch(recvMetaFailed());
    }
};

export const trackSuggestionClick = (query, index, country) => async(dispatch) => {
    try {
        console.log(query)
        await GetApi('en', `track_suggestion_click?country=${country}&query=${query}&index=${index}`);
    } catch (e) {
        console.log(e)
    }
};

export const fetchSearchSuggestions = async(dispatch, getState) => {
    const {input} = getState().search;

    dispatch(reqSearchSuggestions());
    const country = 'usa'
    try {
        const data = await GetApi(null, `suggest?country=${country}&query=${input}`);
        const searchResults = await data;
        console.log(searchResults, "search results");

        if (searchResults.success) {

            dispatch(setSearchSuggesitions(searchResults));
        } else {
            dispatch(recvSuggestionsFailed());
        }
    } catch (e) {
        console.log(e)
        dispatch(recvSuggestionsFailed());
    }
};
