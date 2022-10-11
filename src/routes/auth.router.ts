import express, {Request, Response, NextFunction} from 'express';
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
        const token = jwt.sign(payload, 'secreto')
        res.json({token, user:req.user});
    } catch (error) {
      next(error);
    }
  }
);

export default router;