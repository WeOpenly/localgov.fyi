import * as types from "./ActionTypes";

const initialState = {
  loginInProgress: false,
  loginCheckInProgress: false,
  loginFailure: false,
  loginFailureMsg: "",
  authenticated: false,
  userDetails: {},
  paymentSetupDone: false,
  paymentSetupInProgress: false,
  paymentSetupFailed: false,
  userDetailsLoading: false,
  userDetailsLoadingFailed: false,
  isFirstTime: false, // for onboarding slider
  isBusiness: false,
  isIndividual: false,
  landingPlan: null,
  landingType: null,
};



export function oneUser(state = initialState, action) {
    switch (action.type) {
      case types.SET_LANDING_SELECTED_PLAN:
        return {
          ...state,
          landingPlan: action.plan
        }
      case types.SET_LANDING_USER_TYPE:
        return {
          ...state,
          landingType: action.userType
        };
      case types.ONE_GOOG_USER_LOGIN_START:
        return {
          ...state,
          loginInProgress: true
        };
        break;
      case types.ONE_USER_LOGIN_USER_DETAILS_LOADING:
        return {
          ...state,
          userDetailsLoading: true
        };
        break;
      case types.ONE_USER_LOGIN_USER_DETAILS_LOADING_FAILED:
        return {
          userDetailsLoading: false,
          userDetailsLoadingFailed: true
        };
        break;
      case types.ONE_USER_LOGIN_ADD_USER_DETAILS:
        return {
          ...state,
          userDetailsLoading: false,
          paymentSetupDone: action.paymentSetupDone,
          isFirstTime: action.isFirstTime,
          isBusiness: action.isBusiness,
          isIndividual: action.isIndividual
        };
            break;
      case types.ONE_USER_LOGIN_UPDATE_PREFS:
        return {
          ...state,
          ...action.prefs,
          userDetailsLoading: false
        };
        break;
        case types.ONE_USER_SETUP_PAYMENT_LOADING:
             return {
               ...state,
               paymentSetupInProgress: true
             };
            break;
        case types.ONE_USER_SETUP_PAYMENT_SUCCESS:
            return {
              ...state,
              paymentSetupDone: true,
              paymentSetupInProgress: false
            };
            break;
        case types.ONE_USER_SETUP_PAYMENT_FAILURE:
            return {
              ...state,
            paymentSetupInProgress: false,
              paymentSetupFailed: true
            };
            break;
      case types.ONE_GOOG_USER_LOGIN_SUCCESS:
        return {
          ...state,
          loginInProgress: false,
          authenticated: true,
          userDetails: action.user
        };
        break;
      case types.ONE_GOOG_USER_LOGIN_FAILURE:
        return {
          ...state,
          loginInProgress: false,
          loginFailure: true,
          authenticated: false,
          loginFailureMsg: action.msg
        };
        break;
      case types.ONE_GOOG_LOG_OUT:
        return {
          ...state,
          loginInProgress: false,
          authenticated: false
        };
        break;
      case types.ONE_USER_LOGIN_CHECK_START:
        return {
          ...state,
          loginCheckInProgress: true
        };
        break;
      case types.ONE_USER_LOGIN_CHECK_LOGGED_IN:
        return {
          ...state,
          loginCheckInProgress: false,
          authenticated: true,
          userDetails: action.prefs
        };
        break;
      case types.ONE_USER_LOGIN_CHECK_NOT_LOGGED_IN:
        return {
          ...state,
          loginCheckInProgress: false,
          authenticated: false
        };
        break;
      default:
        return state;
    }
}
