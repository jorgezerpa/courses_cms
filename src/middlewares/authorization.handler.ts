import { Request, Response, NextFunction, Express} from 'express'
import { UserType } from '../types/user.type'
import boom from '@hapi/boom'

function checkRoles(roles:UserType[]) {
    return (req:Request, res:Response, next:NextFunction) => {
      const user = req.user;
      console.log('heeeeyyyyyyyyyyy',user)
      // @ts-ignore
      if (roles.includes(user.userType)) {
        next();
      } else {
        next(boom.unauthorized());
      }
    }
  }

export { checkRoles }
  