import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        clientID: AUTH_CONFIG.clientId,
        redirectUri: AUTH_CONFIG.callbackUrl,
        responseType: 'token id_token',
        audience: AUTH_CONFIG.audience,
        auto_login: false,
    });

    constructor() {
        this.loginWithGoogle = this
            .loginWithGoogle
            .bind(this);
        this.logout = this
            .logout
            .bind(this);
    }

  
    loginWithGoogle() {
        this
            .auth0
            .authorize({ connection: 'google-oauth2' });
    }

    setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        const userData = JSON.stringify(authResult.idTokenPayload);
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('user_info', userData);
        localStorage.setItem('expires_at', expiresAt);
        // navigate to the home route
    }
    
    

    logout(cb) {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user_info');
        this.auth0.logout({returnTo: `${process.env.AUTH0_LOGOUT_RETURN_TO}`});
        // navigate to the home route
        if (cb){
            cb();
        }
    }
}

const isBrowser = typeof window !== `undefined`

export const getUser = () => window.localStorage.user_info
    ? JSON.parse(window.localStorage.user_info)
    : {}

export function isLoggedIn() {

    // Check whether the current time is past the access token's expiry time
    if (isBrowser && !window.localStorage.getItem('expires_at')) {
        return false;
    }

    if (isBrowser){
        let expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
   
}

export const getCurrentUser = () => isBrowser && getUser()


