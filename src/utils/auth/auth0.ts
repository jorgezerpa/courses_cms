import axios from "axios";
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

export const jwtCheck = auth({
  audience: 'https://courses-cms.com',
  issuerBaseURL: 'https://courses-cms.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

export const getUserInfo = async(accessToken:string) => {
  const result = await axios.get('https://courses-cms.us.auth0.com/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

  return result.data
}
