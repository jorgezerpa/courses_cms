import express, {Request, Response, NextFunction} from 'express';
import config from '../config';
import passport from 'passport';
import jwt from 'jsonwebtoken'
import authService from '../services/auth.service';
import merchantService from '../services/merchant.service';
import { handleResponse } from '../responses/response';
const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req:Request, res:Response, next:NextFunction) => {
    try {
        const merchant = req.user
        const payload = {sub: merchant?.id }
        const secret = config.JWT_SECRET;
        const secretRefresh = config.JWT_REFRESH_SECRET;
        const token = jwt.sign({...payload}, secret, {expiresIn:'10min'})
        const refreshToken = jwt.sign({...payload}, secretRefresh, {expiresIn:'1d'})
        handleResponse(res, 200, 'login successfull', {token, refreshToken, tokenType: 'Bearer', tokenExpires: '5min', refreshTokenExpires: '1d'})
    } catch (error) {
      next(error);
    }
  }
);

router.post('/refresh', async(req:Request, res:Response, next:NextFunction) => {
  try {
    const { token, refreshToken } = await authService.handleRefreshToken(req.body.refreshToken)
    handleResponse(res, 200, 'refresh token accepted', {token, refreshToken, tokenType: 'Bearer', tokenExpires: '5min', refreshTokenExpires: '1d'})
  } catch (error) {
    next(error)
  }
})

router.post('/change-password', async(req:Request, res:Response, next:NextFunction)=>{
    try {
      const {newPassword, recoveryToken} = req.body
      const result = await authService.changePassword(recoveryToken, newPassword)
      handleResponse(res, 200, result, {})
    } catch (error) {
      next(error)
    }
})

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await authService.sendRecoveryEmail(email);
      handleResponse(res, 200, result, {})
    } catch (error) {
      next(error);
    }
  }
);



export default router;