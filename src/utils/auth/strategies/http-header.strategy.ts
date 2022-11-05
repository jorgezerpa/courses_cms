import { Request } from 'express';
import { Strategy as headerStrategy } from 'passport-http-header-strategy';
import boom from '@hapi/boom';
import encrypt from '../../bcrypt'; 
import authService from '../../../services/auth.service';

const httpHeaderStrategy = new headerStrategy({header: 'X-APP-TOKEN', param: 'app_token', passReqToCallback: true},
  async(req:Request, token:any, done:any) => { 
    try {  
      let buff = Buffer.from(token, 'base64');
      let text = buff.toString('ascii');
      const creds = text.split(':') // [clientId, clientSecret]
      const merchant = await authService.findOneByClientId(creds[0]);
      if (!merchant) {
        done(boom.unauthorized(), false);  
        return
      }
      if(merchant.clientSecret!==undefined){
          const isMatch = creds[1] === merchant.clientSecret ? true : false
          if (!isMatch) {
            done(boom.unauthorized(), false);
          }
          delete merchant.password
          done(null, {sub:merchant.merchant?.id});
      }
    } catch (error) {
      done(error, false);
    }
  }
);

export default httpHeaderStrategy
