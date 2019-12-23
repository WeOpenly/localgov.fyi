import "regenerator-runtime/runtime";
import * as types from "./ActionTypes";
import { YusufApi } from "../../common/api";

const windowGlobal = typeof window !== "undefined" && window;

export function clearAll() {
  return {
    type: types.CLEAR_ALL
  };
}

function setAutoRegion(region) {
  return { type: types.SET_AUTO_REGION, region };
}

function requestFetchAutoloc() {
  return { type: types.REQUEST_AUTO_SUGGESTED_LOCS };
}

function recvFetchAutLoc(suggestions) {
  return { type: types.SUCCESS_RECV_AUTO_SUGGESTED_LOCS, suggestions };
}

function failedRecvFetchAutoloc() {
  return { type: types.FAILED_RECV_AUTO_SUGGESTED_LOCS };
}

export function fetchAutoLoc(serTemplateId) {
  return async (dispatch, getState) => {
    dispatch(requestFetchAutoloc());

    try {
      const resp = await YusufApi(
        null,
        `template_results?service_template_id=${serTemplateId}&auto=True`,
        null,
        null
      );

      if (resp && resp.success) {
        dispatch(recvFetchAutLoc(resp.suggested));
        dispatch(setAutoRegion(resp.region));
      } else {
        dispatch(failedRecvFetchAutoloc());
        if (resp && resp.region) {
          dispatch(setAutoRegion(resp.region));
        }
      }
    } catch (e) {
      dispatch(failedRecvFetchAutoloc());
    }
  };
}
