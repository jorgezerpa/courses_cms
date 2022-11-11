import express, { Router, Response, Request, NextFunction, Express } from 'express'
import passport from "passport"
import cartService from '../../services/cart.service'
import { updateCartSchema, getCartSchema } from '../../schemas/cart.schema'
import validatorHandler from '../../middlewares/validator.handler'
import { handleResponse } from '../../responses/response'

const router:Router = express.Router();

router.get('/', passport.authenticate('header', {session:false}),  async(req:Request, res:Response, next:NextFunction) => {
    try {
      let merchantId = req.user?.sub as number
      const cart = await cartService.create(merchantId)
      handleResponse(res, 200, 'cart', {cart})
    } catch (error) {
      next(error)
    }
});

router.get('/:cartId', passport.authenticate('header', {session:false}), validatorHandler(getCartSchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let cartId = parseInt(req.params.cartId)
    let merchantId = req.user?.sub as number
    const cart = await cartService.getOne(cartId, merchantId)
    handleResponse(res, 200, 'cart', {cart})
  } catch (error) {
    next(error)
  }
});

router.delete('/:cartId', passport.authenticate('header', {session:false}), validatorHandler(getCartSchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let cartId = parseInt(req.params.cartId)
    let merchantId = req.user?.sub as number
    const cart = await cartService.delete(cartId, merchantId)
    handleResponse(res, 200, 'cart', {cart})
  } catch (error) {
    next(error)
  }
});

router.patch('/empty/:cartId', passport.authenticate('header', {session:false}), validatorHandler(getCartSchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let cartId = parseInt(req.params.cartId)
    let merchantId = req.user?.sub as number
    const cart = await cartService.emptyCart(cartId, merchantId)
    handleResponse(res, 200, 'cart', {cart})
  } catch (error) {
    next(error)
  }
});

router.patch('/addToCart/:cartId', passport.authenticate('header', {session:false}), validatorHandler(getCartSchema, 'params'), validatorHandler(updateCartSchema, 'body'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let cartId = parseInt(req.params.cartId)
    let merchantId = req.user?.sub as number
    let productId = req.body.productId
    const cart = await cartService.addToCart(productId, cartId, merchantId)
    handleResponse(res, 200, 'cart', {cart})
  } catch (error) {
    next(error)
  }
});

router.patch('/removeFromCart/:cartId', passport.authenticate('header', {session:false}), validatorHandler(getCartSchema, 'params'), validatorHandler(updateCartSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let cartId = parseInt(req.params.cartId)
    let merchantId = req.user?.sub as number
    let productId = req.body.productId
    const cart = await cartService.removeFromCart(productId, cartId, merchantId)
    handleResponse(res, 200, 'cart', {cart})
  } catch (error) {
    next(error)
  }
});

export default router;
