const AUTH0_DOMAIN = 'weopenly.auth0.com'
const AUTH0_CLIENT_ID = 'Dp5GQvZIbvatXbbnlBhZTYzsfvlI0Caw'
const AUTH0_CALLBACK_URL = 'https://determined-kirch-9a3322.netlify.com/app/auth/callback'
const AUTH0_DB_CONNECTION_NAME = 'Username-Password-Authentication'
const AUTH0_LOGOUT_RETURN_TO = 'https://determined-kirch-9a3322.netlify.com/'
const AUTH0_AUDIENCE = 'localgov.fyi-local'

export const AUTH_CONFIG = {
    domain : `${AUTH0_DOMAIN}`,
    clientId : `${AUTH0_CLIENT_ID}`,
    callbackUrl : `${AUTH0_CALLBACK_URL}`,
    audience : `${AUTH0_AUDIENCE}`,
    dbConnectionName : 'Username-Password-Authentication',
}

