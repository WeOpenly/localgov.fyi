import * as types from "./ActionTypes";


    // # tickets/ tolls
    // # parking https://papergov.com/api/yusuf/template_results?service_template_id=0bbec7f3-7c54-4ce8-8356-8494835e2ef3&auto=True
    // #  Traffic https://papergov.com/api/yusuf/template_results?service_template_id=f250a144-69d0-416c-94f3-dffb58fd895a&auto=True

    // # city specific 
    // # renew bus  https://papergov.com/api/yusuf/template_results?service_template_id=b6a31bb0-90d7-4806-8a05-6e45c5485215&auto=True

    // apply new bus https://papergov.com/api/yusuf/template_results?service_template_id=873daa5b-3f60-44ce-91f0-9742c13adb74&auto=True
    
    // # general 
    // #driver license renewal https://papergov.com/api/yusuf/template_results?service_template_id=b04f7338-53b2-40af-a295-f0c736c16f97&auto=True
    // # vehicle registration https://papergov.com/services/renew-vehicle-registration/
    //papergov.com/api/yusuf/template_results?service_template_id=4b169939-ca8d-4289-9a53-2a6d211423c2&auto=True

const initialState = {
      auto_region: {},
      veh_reg_loading: false,
      veh_reg_results: [],
      veh_reg_failed: false,
      driv_lic_loading: false,
      driv_lic_results: [],
      driv_lic_failed: false,
      bus_lic_loading: false,
      bus_lic_results: [],
      bus_lic_failed: false,
      parking_tik_loading: false,
      parking_tik_results: [],
      parking_tik_failed: false,
      toll_tik_loading: false,
      toll_tik_results: [],
      toll_tik_failed: false
    };

 

export function serPack(state = initialState, action) {
  switch (action.type) {
      case types.CLEAR_ALL:
        return initialState
    case types.SET_AUTO_REG:
      return {
        ...state,
        auto_region: action.region
      };
    
    case types.BUS_LIC_LOADING:
      return { ...state, bus_lic_loading: true, bus_lic_failed: false };
    case types.BUS_LIC_SUCCESS:
      return {
        ...state,
        bus_lic_loading: false,
        bus_lic_results: action.results,
        bus_lic_failed: false
      };
    case types.BUS_LIC_FAILED:
      return {
        ...state,
        bus_lic_loading: false,
        bus_lic_failed: true
      };
    case types.PARK_TIK_LOADING:
      return { ...state, parking_tik_loading: true, parking_tik_failed: false };
    case types.PARK_TIK_SUCCESS:
      return {
        ...state,
        parking_tik_loading: false,
        parking_tik_results: action.results,
        parking_tik_failed: false
      };
    case types.PARK_TIK_FAILED:
      return {
        ...state,
        parking_tik_loading: false,
        parking_tik_failed: true
      };
    case types.TOLL_TIK_LOADING:
      return {
        ...state,
        toll_tik_loading: true,
        toll_tik_results: [],
        toll_tik_failed: false
      };
    case types.TOLL_TIK_SUCCESS:
      return {
        ...state,
        toll_tik_loading: false,
        toll_tik_results: action.results,
        toll_tik_failed: false
      };
    case types.TOLL_TIK_FAILED:
      return {
        ...state,
        toll_tik_loading: false,
        toll_tik_failed: true
      };
    case types.DRIV_LIC_LOADING:
      return {
        ...state,
        driv_lic_loading: true,
        driv_lic_failed: false
      };
    case types.DRIV_LIC_SUCCESS:
      return {
        ...state,
        driv_lic_loading: false,
        driv_lic_results: action.results,
        driv_lic_failed: false
      };
    case types.DRIV_LIC_FAILED:
      return {
        ...state,
        driv_lic_loading: false,
        driv_lic_failed: true
      };
    case types.VEH_REG_LOADING:
      return {
        ...state,
        veh_reg_loading: true,
        veh_reg_failed: false
      };
    case types.VEH_REG_SUCCESS:
      return {
        ...state,
        veh_reg_loading: false,
        veh_reg_results: action.results,
        veh_reg_failed: false
      };
    case types.VEH_REG_FAILED:
      return {
        ...state,
        veh_reg_loading: false,
        veh_reg_failed: true
      };
    default:
      return state;
  }
}
