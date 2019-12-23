import * as types from "./ActionTypes";

const initialState = {
  autoLocLoading: false,
  autoLocResults: [],
  autoLocRegion: null,
  autoLocFailed: false
};

export function SerLocations(state = initialState, action) {
  switch (action.type) {
    case types.SET_AUTO_REGION:
      return {
        ...state,
        autoLocRegion: action.region
      };
    case types.REQUEST_AUTO_SUGGESTED_LOCS:
      return {
        ...state,
        autoLocLoading: true,
        autoLocFailed: false
      };
    case types.SUCCESS_RECV_AUTO_SUGGESTED_LOCS:
      return {
        ...state,
        autoLocResults: action.suggestions,
        autoLocLoading: false
      };
    case types.FAILED_RECV_AUTO_SUGGESTED_LOCS:
      return {
        ...state,
        autoLocLoading: false,
        autoLocFailed: true
      };
    default:
      return state;
  }
}
