import * as types from "./ActionTypes";

const initialState = {
    loginInProgress: false,
    loginCheckInProgress: false,
    loginFailure: false,
    loginFailureMsg: '',
    isLoggedIn: false,
    userDetails: {

    },
    isFirstTime: false,
    isBusiness: false,
    isIndividual: false,
};


export function oneUser(state = initialState, action) {
    switch (action.type) {
        case types.ONE_GOOG_USER_LOGIN_START:
            return {
                ...state,
                loginInProgress: true
            }
            break;
        case types.ONE_GOOG_USER_LOGIN_SUCCESS:
            return {
                ...state,
                loginInProgress: false,
                isLoggedIn: true,
                userDetails: action.user
            }
            break;
        case types.ONE_GOOG_USER_LOGIN_FAILURE:
            return {
                ...state,
                loginInProgress: false,
                loginFailure: true,
                isLoggedIn: false,
                loginFailureMsg: action.msg
            }
            break;
        case types.ONE_GOOG_LOG_OUT:
            return {
                ...state,
                loginInProgress: false,
                isLoggedIn: false,
            }
            break;
        case types.ONE_USER_LOGIN_CHECK_START:
            return {
                ...state,
                loginCheckInProgress: true,
            }
            break;
        case types.ONE_USER_LOGIN_CHECK_LOGGED_IN:
            return {
                ...state,
                loginCheckInProgress: false,
                isLoggedIn: true,
                userDetails: action.user
            }
            break;
        case types.ONE_USER_LOGIN_CHECK_NOT_LOGGED_IN:
            return {
                ...state,
                loginCheckInProgress: false,
                isLoggedIn: false,
            }
            break;
        default:
            return state;
    }
}
