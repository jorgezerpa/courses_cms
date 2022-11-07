import express, { Router, Response, Request, NextFunction } from 'express'
import passport from "passport"
import { handleResponse } from '../../responses/response'
import { order } from "../../dataTemplates/order"
import { createOrderSchema, getOrderSchema, updateOrderStatusSchema } from '../../schemas/order/order.schema'
import validatorHandler from '../../middlewares/validator.handler'
import orderService from '../../services/orders.service'
import { OrderStateType } from '../../types/orderState.type'
import { handleOrderProducts } from '../../middlewares/orderProducts.handler'

const router:Router = express.Router();

router.get('/template', passport.authenticate('jwt', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
    res.json(order)
});

router.get('/', passport.authenticate('jwt', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
    try {
        const merchantId = req.user?.sub as number
        const orders = await orderService.get(merchantId)
        handleResponse(res, 200, 'orders', {orders})
    } catch (error) {   
        next(error)
    }
});

router.get('/:orderId', passport.authenticate('jwt', {session:false}), validatorHandler(getOrderSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
    try {
        const orderId = parseInt(req.params.orderId) as number
        const merchantId = req.user?.sub as number
        const order = await orderService.getOne(orderId, merchantId)
        handleResponse(res, 200, 'order', {order})
    } catch (error) {   
        next(error)
    }
});

router.post('/', passport.authenticate('jwt', {session:false}), validatorHandler(createOrderSchema, 'body'), handleOrderProducts, async(req:Request, res:Response, next:NextFunction) => {
    try {
        const order = JSON.stringify(req.body)
        const userId = req.user?.sub as number
        const result = await orderService.create(order, userId)
        handleResponse(res, 200, 'order saved', {result})
    } catch (error) {   
        next(error)
    }
});

router.patch('/change-status/:orderId', passport.authenticate('jwt', {session:false}), validatorHandler(updateOrderStatusSchema, 'query') , async(req:Request, res:Response, next:NextFunction) => {
    try {
        const orderId = parseInt(req.params.orderId) as number
        const orderStatus = req.query.status as OrderStateType
        const merchantId = req.user?.sub as number
        const order = await orderService.updateState(orderId, merchantId, orderStatus)
        handleResponse(res, 200, 'order status updated', {order})
    } catch (error) {   
        next(error)
    }
});

router.delete('/:orderId', passport.authenticate('jwt', {session:false}), validatorHandler(getOrderSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
    try {
        const orderId = parseInt(req.params.orderId) as number
        const merchantId = req.user?.sub as number
        const result = await orderService.delete(orderId, merchantId)
        handleResponse(res, 200, 'order deleted', {result})
    } catch (error) {   
        next(error)
    }
});

export default router;