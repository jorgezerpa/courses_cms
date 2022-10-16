import { Request } from 'express';
import { Strategy } from 'passport-local';
import boom from '@hapi/boom';
import encrypt from '../../bcrypt'; 
import authService from '../../../services/auth.service';

const LocalStrategy = new Strategy({
   usernameField: 'email',
   passwordField: 'password'
 },
 async (email:string, password:string, done) => {
   try {  
     const merchant = await authService.findOneByEmail(email);
     if (!merchant) {
       done(boom.unauthorized(), false);  
       return
     }
     if(merchant.password!==undefined){
         const isMatch = await encrypt.compare(password, merchant.password);
         if (!isMatch) {
           done(boom.unauthorized(), false);
         }
         delete merchant.password
         done(null, merchant.merchant);
     }
   } catch (error) {
     done(error, false);
   }
 }
);

 export default LocalStrategy;




