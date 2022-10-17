import express, {Request, Response, NextFunction} from 'express';
import config from '../config';
import passport from 'passport';
import jwt from 'jsonwebtoken'
import authService from '../services/auth.service';
const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req:Request, res:Response, next:NextFunction) => {
    try {
        const merchant = req.user
        const payload = {...merchant}
        const secret = config.JWT_SECRET;
        const secretRefresh = config.JWT_REFRESH_SECRET;
        const token = jwt.sign(payload, secret, {expiresIn:'10min'})
        const refreshToken = jwt.sign(payload, secretRefresh, {expiresIn:'1d'})
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none',secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({token, merchant});
    } catch (error) {
      next(error);
    }
  }
);

router.post('/refresh', async(req:Request, res:Response, next:NextFunction) => {
  try {
    if(!req.cookies?.jwt) res.status(406).json('unauthorized')
      const merchant = req.body.merchant 
      const payload = {...merchant}
      const refreshToken = req.cookies.jwt;
      jwt.verify(refreshToken, config.JWT_REFRESH_SECRET, (err:any, decoded:any)=>{
        if(err) res.status(406).json('unauthorized')
        const secret = config.JWT_SECRET;
        const token = jwt.sign(payload, secret, {expiresIn:'10min'})
        res.json({token, merchant})
      })
  } catch (error) {
    next(error)
  }
})

router.post('/change-password', async(req:Request, res:Response, next:NextFunction)=>{
    try {
      const {newPassword, recoveryToken} = req.body
      const result = await authService.changePassword(recoveryToken, newPassword)
      res.json({result})
    } catch (error) {
      next(error)
    }
})

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const response = await authService.sendRecoveryEmail(email);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);



export default router;