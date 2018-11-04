export const AUTH_CONFIG = {
    domain : `${process.env.AUTH0_DOMAIN}`,
    clientId : `${process.env.AUTH0_CLIENT_ID}`,
    callbackUrl : `${process.env.AUTH0_CALLBACK_URL}`,
    audience : `${process.env.AUTH0_AUDIENCE}`,
    dbConnectionName : 'Username-Password-Authentication',
}
