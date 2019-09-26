import * as types from "./ActionTypes";


const initialState = {
  loginInProgress: false,
  loginCheckInProgress: false,
  loginFailure: false,
  loginFailureMsg: "",
  authenticated: false,
  userDetails: {},
};

export function oneUser(state = initialState, action) {
    switch (action.type) {

      case types.ADM_GOOG_USER_LOGIN_START:
        return {
          ...state,
          loginInProgress: true
        };
        break;

      case types.ADM_GOOG_USER_LOGIN_SUCCESS:
        return {
          ...state,
          loginInProgress: false,
          authenticated: true,
          userDetails: action.user
        };
        break;
      case types.ADM_GOOG_USER_LOGIN_FAILURE:
        return {
          ...state,
          loginInProgress: false,
          loginFailure: true,
          authenticated: false,
          loginFailureMsg: action.msg
        };
        break;
      case types.ADM_GOOG_LOG_OUT:
        return {
          ...state,
          loginInProgress: false,
          authenticated: false
        };
        break;
      case types.ADM_USER_LOGIN_CHECK_START:
        return {
          ...state,
          loginCheckInProgress: true
        };
        break;
      case types.ADM_USER_LOGIN_CHECK_LOGGED_IN:
        return {
          ...state,
          loginCheckInProgress: false,
          authenticated: true,
          userDetails: action.prefs
        };
        break;
      case types.ADM_USER_LOGIN_CHECK_NOT_LOGGED_IN:
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
