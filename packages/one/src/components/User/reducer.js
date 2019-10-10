import * as types from "./ActionTypes";


const initialState = {
  authInProgress: false,
  authFailure: false,
  authFailureMsg: "",
  authenticated: false,
  details: {},
  landingPlan: null,
  landingType: null
};
// "add_services,"'update_services_details', 'add_payment', 'payment_added'

export function oneUser(state = initialState, action) {
    switch (action.type) {
      case types.SET_LANDING_USER_TYPE:
        return {
          ...state,
          landingType: action.userType
        };
        break;
      case types.SET_LANDING_SELECTED_PLAN:
        return {
          ...state,
          landingPlan: action.plan
        };
        break;
      case types.USER_DETAILS_LOADING:
        return {
          ...state,
          authInProgress: true,
          authFailure: false
        };
        break;
      case types.USER_DETAILS_SUCCESS:
        return {
          ...state,
          authInProgress: false,
          authFailure: false,
          details: action.details
        };
        break;
      case types.USER_SET_AUTHENTICATED:
        return {
          authenticated: action.toggle
        };
      case types.USER_DETAILS_FAILED:
        return {
          authenticated: false,
          authInProgress: false,
          authFailure: true
        };
        break;
      default:
        return state;
    }
}
