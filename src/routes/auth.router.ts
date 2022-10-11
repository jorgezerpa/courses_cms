import express, {Request, Response, NextFunction} from 'express';
import config from '../config';
import passport from 'passport';
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req:Request, res:Response, next:NextFunction) => {
    try {
        const payload = {
          user: req.user 
        }
        // const secret = process.env.JWT_SECRET as string;
        const secret = config.JWT_SECRET;
        const token = jwt.sign(payload, secret)
        res.json({token, user:req.user});
    } catch (error) {
      next(error);
    }
  }
);

export default router;