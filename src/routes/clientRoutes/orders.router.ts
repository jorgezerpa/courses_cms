import express, { Router, Response, Request, NextFunction } from 'express'
import passport from "passport"
import { paypalService } from '../../utils/paypal'

const router:Router = express.Router();


router.get('/', passport.authenticate('header', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
    res.json(req.user)
});

export default router;