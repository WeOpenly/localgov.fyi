import * as types from "./ActionTypes";

const initialState = {
  areaGuessReady: false,
  areaSersReady: false,
  appReady: false,
  serviceSearchText: null,
  locationSearchText: null,
  origLocationText: null,
  selectedTemplateId: null,
  selectedLocationLatLng: null,
  areaGuessLoading: false,
  areaGuessResult: {},
  areaGuessFailed: false,
  serviceTemplates: [],
  serviceTemplatesForSuggestions: [],
  areaServicesLoading: false,
  areaServices: [],
  areaServicesLoadingFailed: false
};

export function dynamicSearch(state = initialState, action) {
  switch (action.type) {
    case types.APP_READY:
      return {
        ...state,
        appReady: true
      };
    case types.UPDATE_SERVICE_SEARCH_TEXT:
      return {
        ...state,
        serviceSearchText: action.text
      };
    case types.UPDATE_GOOG_LOCATION_SEARCH_TEXT:
      return {
        ...state,
        locationSearchText: action.text
      };
    case types.SELECT_SERVICE_TEMPLATE_ID:
      return {
        ...state,
        selectedTemplateId: action.service_template_id
      };
    case types.SELECT_GOOG_LOCATION:
      return {
        ...state,
        selectedLocationLatLng: {
          lat: action.lat,
          lng: action.lng,
          addr: action.addr
        }
      };
    case types.REQUEST_AREA_GUESS:
      return {
        ...state,
        areaGuessLoading: true,
        areaGuessFailed: false
      };
    case types.SUCCESS_RECV_AREA_GUESS:
      return {
        ...state,
        areaGuessResult: action.suggested, //services default are UI concern
        areaGuessLoading: false
      };
    case types.FAILED_RECV_AREA_GUESS:
      return {
        ...state,
        areaGuessLoading: false,
        areaGuessFailed: true // show default based on this in the UI
      };

    case types.REQUEST_AREA_SERVICES:
      return {
        ...state,
        areaServicesLoading: true,
        areaServicesLoadingFailed: false
      };
    case types.SUCCESS_RECV_AREA_SERVICES:
      return {
        ...state,
        areaServices: action.suggestions,
        areaServicesLoading: false
      };
    case types.FAILED_RECV_AREA_SERVICES:
      return {
        ...state,
        areaServicesLoading: false,
        areaServicesLoadingFailed: true
      };
    case types.CLEAR_ALL:
      return {
        ...state
      };
    default:
      return state;
  }
}
