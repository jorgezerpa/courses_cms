import express, { Router, Response, Request, NextFunction } from 'express'
import passport from "passport"
import { handleResponse } from '../../responses/response'
import { paypalService } from '../../utils/paypal'

const router:Router = express.Router();

router.post('/capture', async(req:Request, res:Response, next:NextFunction) => {
  try {
    const price = req.body.price 
    const result = await paypalService.createPayment(price)
    res.json(result.data)
  } catch (error) {
    next(error)
  }
});

router.post('/execute', async(req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.body.token 
    const result = await paypalService.executePayment(token)
    res.json(result.data)
  } catch (error) {
    next(error)
  }
});

export default router;
