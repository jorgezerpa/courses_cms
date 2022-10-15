import express, { Router, Response, Request, NextFunction, Express } from 'express'
import passport from "passport"
import orderService from '../services/orders.service'
// import { createOrderSchema, updateOrderSchema, getOrderSchema } from '../schemas/order.schema'
// import validatorHandler from '../middlewares/validator.handler'
import { checkRoles } from '../middlewares/authorization.handler'

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router:Router = express.Router();

router.post('/', passport.authenticate('jwt', {session:false}), checkRoles(['client']), async(req:Request, res:Response, next:NextFunction) =>{
  try {
    //@ts-ignore
    const clientId = req.user?.id as number
    const data = req.body;
    const order = await orderService.create(clientId, data)
    res.json({order})
  } catch (error) {
    next(error)
  }

})

router.get('/', passport.authenticate('jwt', {session:false}), checkRoles(['client']), async(req:Request, res:Response, next:NextFunction) => {
  try {
    //@ts-ignore
    let userId = req.user?.id as number
    const order = await orderService.findOne(userId);
    res.json({
      orders: order
    });
  } catch (error) {
    next(error)
  }
});



router.delete('',  passport.authenticate('jwt', {session:false}), checkRoles(['client']), async(req:Request, res:Response, next:NextFunction) => {
  try {
    //@ts-ignore
    const userId = req.user?.id as number;
    const result = await orderService.delete(userId);
    res.json({result});
  } catch (error) {
    next(error)
  }
});

export default router;
