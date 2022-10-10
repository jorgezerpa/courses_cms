import express, {Request, Response, NextFunction} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req:Request, res:Response, next:NextFunction) => {
    try {
        const payload = {
            something: '10'
        }
        const secret = 'soy un secreto super seguro yeaahhh'
        const token = jwt.sign(payload, secret)
        res.json({token});
    } catch (error) {
      next(error);
    }
  }
);

export default router;