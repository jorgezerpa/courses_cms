const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

export const jwtCheck = auth({
  audience: 'https://courses-cms.com',
  issuerBaseURL: 'https://courses-cms.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});
