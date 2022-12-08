import  { auth, requiredScopes } from 'express-oauth2-jwt-bearer'

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = auth({
    audience: 'https://zerpasw.zerpacode.com/api',
    issuerBaseURL: `https://dev-x7zwzkjp2jhejnw5.us.auth0.com/`,
});

export const adminScopes = requiredScopes('admin');
