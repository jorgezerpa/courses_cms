const { auth } = require('express-oauth2-jwt-bearer');

export const jwtCheck = auth({
  audience: 'zerpacode-courses.cms',
  issuerBaseURL: 'https://dev-x7zwzkjp2jhejnw5.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});
