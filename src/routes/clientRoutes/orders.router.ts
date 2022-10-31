import express, { Router, Response, Request, NextFunction } from 'express'
import passport from "passport"
import { paypalService } from '../../utils/paypal'

const router:Router = express.Router();


router.post('/', async(req:Request, res:Response, next:NextFunction) => {
    //create order logic
});

export default router;