import "regenerator-runtime/runtime";
import * as types from "./ActionTypes";
import { YusufApi } from "../common/api";

const windowGlobal = typeof window !== "undefined" && window;

export function loading(name){
    console.log("loading", name, types[`${name}_LOADING`])
    return { type: types[`${name}_LOADING`]}
}

export function success(name, results){
   return {type: types[`${name}_SUCCESS`], results}
}

export function failed(name){
 return { type: types[`${name}_FAILED`] };
}

export function setAutoRegion(region){
    return {type: types.SET_AUTO_REG, region}
}

export function fetchAutoLocSers(serName, serTemplateId) {
  return async (dispatch, getState) => {
    dispatch(loading(serName));

    try {
      const resp = await YusufApi(
        null,
        `template_results?service_template_id=${serTemplateId}&auto=True`,
        null,
        null
      );

      if (resp && resp.success) {
        dispatch(success(serName, resp.suggested));
        dispatch(setAutoRegion(resp.region));
      } else {
        dispatch(failed(serName));
        if (resp && resp.region) {
          dispatch(setAutoRegion(resp.region));
        }
      }
    } catch (e) {
      dispatch(failed(serName));
    }
  };
}

export function clearAll(){
    return {
        type: types.CLEAR_ALL
    }
}


export function fetchSeachedLocSers(serName, serTemplateId, lat, lng) {
  return async (dispatch, getState) => {
    dispatch(loading(serName));
    dispatch(clearAll())

    console.log(lat, lng);

    try {
      const resp = await YusufApi(
        null,
        `template_results?service_template_id=${serTemplateId}&lat=${lat}&lng=${lng}`,
        null,
        null
      );

      if (resp && resp.success) {
        dispatch(success(serName, resp.suggested));
        dispatch(setAutoRegion(resp.region));
      } else {
           dispatch(failed(serName));
        if (resp && resp.region) {
          dispatch(setAutoRegion(resp.region));
        }
      }
    } catch (e) {
           dispatch(failed(serName));
    }
  };
}
