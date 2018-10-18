import 'regenerator-runtime/runtime';
import {SubmissionError} from 'redux-form';
import {AUTH_CONFIG} from './auth0-variables';
import * as types from './ActionTypes';
import {navigate} from '@reach/router';

import {YusufApi} from '../common/api';
import Auth from './Auth';

const auth = new Auth();

export function toggleAccountForm(toggle) {
    return {type: types.TOGGLE_ACCOUNT_FORM, toggle}
}


function loginRequest() {
    return {type: types.LOGIN_REQUEST}
}

function loginSuccess() {
    return {type: types.LOGIN_SUCCESS}
}

function loginFailure(error) {
    let errStr = '';
    if (typeof error === 'string') {
        errStr = error
    } else {
        const {rules} = error;
        for (const i in rules) {
            const {message} = rules[i];
            errStr = errStr + ' ' + message;
        }
    }
    return {type: types.LOGIN_FAILURE, msg: errStr};
}

function registerRequest() {
    return {type: types.REGISTER_REQUEST}
}

function registerSuccess() {
    return {type: types.REGISTER_SUBMITTED}
}

function registerFailure(error) {
    if (error.code === 'user_exists' || error.code === 'username_exists') {
        throw new SubmissionError({email: 'A user exists with that email address', _error: ''})
    } else if (['invalid_password', 'password_dictionary_error', 'password_no_user_info_error', 'password_strength_error'].indexOf(error.code) !== -1) {
        throw new SubmissionError({password: 'Weak password', _error: ''})

    } else {
        throw new SubmissionError({_error: error.description})
    }

    return {type: types.REGISTER_FAILURE, msg: error.code}
}

// const checkCurrentUserRequest = () => {
//     return {type: types.CHECK_CURRENT_USER_REQUEST_START}
// }

// const checkCurrentUserFinish = () => {
//     return {type: types.CHECK_CURRENT_USER_REQUEST_FINISH}
// }

// export const checkCurrentUser = async(dispatch, getState) => {
//     dispatch(checkCurrentUserRequest());
//     const active = auth.isAuthenticated();
//     dispatch(toggleLoginStatus(active));
//     dispatch(checkCurrentUserFinish());
// }

export const handleLoginRequest = (values) => {
    return new Promise((resolve, reject) => {
        const {email, password} = values;

        auth.auth0.login({
                realm: AUTH_CONFIG.dbConnectionName,
                email,
                password
            }, (err, res) => {
                if (err) {
                    var errObj = new SubmissionError({_error: err.description})
                    reject(errObj);
                }
                if (res) {
                    resolve(res);
                }
            });
    });
}

export const handleAuthentication = () => {
    return async(dispatch, getState) => {
        auth.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    auth.setSession(authResult);
                    dispatch(loginSuccess());
                    navigate('/')
                } else if (err) {
                    console.log(err, 'err');
                    dispatch(loginFailure(err.description));
                }
            });
    }
}

const setEmailVertificationRequired = () => {
    return {type: types.REGISTER_VERIFICATION_REQUESTED}
}

export function handleRegisterRequest(values) {
    return new Promise((resolve, reject) => {
        const {email, password} = values;

        auth
            .auth0
            .signup({
                connection: AUTH_CONFIG.dbConnectionName,
                email,
                password
            }, (err, res) => {
                if (err) {
                    var errObj = new SubmissionError({_error: err.description})
                    reject(errObj);
                }
                if (res) {
                    resolve(res);
                }
            });
    });
}

export const logOut = (prev) => {
    return async(dispatch, getState) => {
        auth.logout(navigate(prev || '/'));
    }
}

