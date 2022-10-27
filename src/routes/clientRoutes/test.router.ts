import express, { Router, Response, Request, NextFunction } from 'express'
import passport from "passport"
import { paypalService } from '../../utils/paypal'

const router:Router = express.Router();


router.get('/testing', async(req:Request, res:Response, next:NextFunction) => {
    res.send('i am working well')
});

export default router;