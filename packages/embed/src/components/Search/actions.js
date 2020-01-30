import "regenerator-runtime/runtime";
import * as types from "./ActionTypes";
import { YusufApi } from "../../common/api";
import queryString from "query-string";
import { navigate } from "gatsby";

const windowGlobal = typeof window !== "undefined" && window;

function clearAll() {
  return {
    type: types.CLEAR_ALL
  };
}

function setAppReady() {
  return {
    type: types.APP_READY
  };
}

function requestAreaGuess() {
  return { type: types.REQUEST_AREA_GUESS };
}

function recvAreaGuess(suggested) {
  return { type: types.SUCCESS_RECV_AREA_GUESS, suggested };
}

function failedRecvAreaGuess() {
  return { type: types.FAILED_RECV_AREA_GUESS };
}

export function fetchAreaGuess() {
  return async (dispatch, getState) => {
    dispatch(clearAll());
    dispatch(requestAreaGuess());

    try {
      const resp = await YusufApi(null, `index_auto_locate`, null, null);

      if (resp && resp.success) {
        dispatch(recvAreaGuess(resp.suggestion));
      } else {
        const resp = {
          success: "true",
          suggested: {
            lat: "37.5",
            lng: "-122.5",
            city_name: "San Mateo"
          }
        };
        dispatch(recvAreaGuess(resp.suggested));
      }
    } catch (e) {
      dispatch(failedRecvAreaGuess());
    }
    dispatch(setAppReady());
  };
}

export function updateServciceSearchText(text) {
  return { type: types.UPDATE_SERVICE_SEARCH_TEXT, text };
}

export function updateGoogLocationSearchText(text) {
  return { type: types.UPDATE_GOOG_LOCATION_SEARCH_TEXT, text };
}

export function selectServiceTemplateId(service_template_id) {
  return { type: types.SELECT_SERVICE_TEMPLATE_ID, service_template_id };
}

export function selectGoogLocation(lat, lng, addr) {
  return { type: types.SELECT_GOOG_LOCATION, lat, lng, addr };
}

export function executeSearch() {
  return async (dispatch, getState) => {
    const {
      areaGuessResult,
      selectedLocationLatLng,
      selectedTemplateId,
      serviceSearchText
    } = getState().dynamicSearch;
    let lat = null;
    let lng = null;

    if (selectedLocationLatLng) {
      lat = selectedLocationLatLng.lat;
      lng = selectedLocationLatLng.lng;
    } else {
      lat = areaGuessResult.lat;
      lng = areaGuessResult.lng;
    }

    let params = {
      lat,
      lng
    };
    if (selectedTemplateId) {
      params["service_template_id"] = selectedTemplateId;
    }
    if (serviceSearchText) {
      params["service_text"] = serviceSearchText;
    }
    const newQueryString = queryString.stringify(params);
    navigate(`/search?${newQueryString}`);
  };
}

function requestAreaServices() {
  return { type: types.REQUEST_AREA_SERVICES };
}

function recvAreaServices(suggestions) {
  return { type: types.SUCCESS_RECV_AREA_SERVICES, suggestions };
}

function failedRecvAreaServices() {
  return { type: types.FAILED_RECV_AREA_SERVICES };
}

export function fetchAreaServices(lat, lng) {
  return async (dispatch, getState) => {
    dispatch(requestAreaServices());

    try {
      let params = {
        lat,
        lng
      };

      const newQueryString = queryString.stringify(params);
      const resp = await YusufApi(
        null,
        `get_nearby_sers?${newQueryString}`,
        null,
        null
      );

      if (resp && resp.success) {
        dispatch(recvAreaServices(resp.results));
      } else {
        dispatch(failedRecvAreaServices());
      }
    } catch (e) {
      dispatch(failedRecvAreaServices());
    }
  };
}
