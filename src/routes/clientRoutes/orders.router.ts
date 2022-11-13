import express, { Router, Response, Request, NextFunction } from 'express'
import passport from "passport"
import fs from 'fs'
import { handleResponse } from '../../responses/response'
import { order } from "../../dataTemplates/order"
import { createOrderSchema } from '../../schemas/order/order.schema'
import validatorHandler from '../../middlewares/validator.handler'
import orderService from '../../services/orders.service'
import { handleOrderProducts } from '../../middlewares/orderProducts.handler'

const router:Router = express.Router();

router.post('/', passport.authenticate('header', {session:false}), validatorHandler(createOrderSchema, 'body'), handleOrderProducts, async(req:Request, res:Response, next:NextFunction) => {
    try {
        const order = JSON.stringify(req.body)
        const userId = req.user?.sub as number
        const result = await orderService.create(order, userId)
        handleResponse(res, 200, 'order saved', {result})
    } catch (error) {   
        next(error)
    }
});

router.get('/template', passport.authenticate('header', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
    res.json(order)
});

router.get('/getOrderFile/:orderId', passport.authenticate('header', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
    try {
        const merchantId = req.user?.sub as number
        const orderId = parseInt(req.params.orderId) 
        const filePath = await orderService.createFile(orderId, merchantId)
        res.sendFile(filePath)
    } catch (error) {
        next(error)
    }
});

export default router;