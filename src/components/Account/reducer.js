import * as types from "./ActionTypes";

const initialState = {
    showLogin: false,
    showRegister: false,
    loginRequest: false,
    loggedIn: false,
    loginFailed: false,
    loginFailedMsg: '',
    registerRequest: false,
    registerEmailVerificationRequired: false,
    registerFailed: false,
    registerFailedMsg: '',
    currentUserRequest: false,
    currentUser: null,
};


export function account(state = initialState, action) {
    switch (action.type) {
        case types.CHECK_CURRENT_USER_REQUEST_START:
            return {
                ...state,
                currentUserRequest: true,
            }
        case types.TOGGLE_LOGIN_STATUS:
            return {
                ...state,
                loggedIn: action.toggle
            }
        case types.CHECK_CURRENT_USER_REQUEST_FINISH:
            return {
                ...state,
                currentUserRequest: false,
            }
        case types.TOGGLE_LOGIN_DIALOG:
            return {
                ...state,
                showLogin: action.toggle
            };
        case types.TOGGLE_REGISTER_DIALOG:
            return {
                ...state,
                showRegister: action.toggle
            };
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loginRequest: true,
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                currentUser: action.currentUser,
            }
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loginRequest : false,
                loginFailed: true,
                loginFailedMsg: action.msg
            };
        case types.REGISTER_REQUEST:
            return {
                ...state,
                registerRequest : true,
            };
        case types.REGISTER_SUBMITTED:
            return {
                ...state,
                registerRequest: false,
            };
        case types.REGISTER_VERIFICATION_REQUESTED:
            return {
                ...state,
                registerRequest: false,
                registerEmailVerificationRequired: true,
            }
        case types.REGISTER_FAILURE:
            return {
                ...state,
                registerRequest: false,
                registerFailed: true,
                registerFailedMsg: action.msg,
            };
        default:
            return state;
    }
}
