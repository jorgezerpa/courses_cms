import express, { Router, Response, Request, NextFunction, Express } from 'express'
import passport from "passport"
import cartService from '../services/cart.service'
import { createCartSchema, updateCartSchema, getCartSchema } from '../schemas/cart.schema'
import validatorHandler from '../middlewares/validator.handler'
import { checkRoles } from '../middlewares/authorization.handler'

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router:Router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}), checkRoles(['client']), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let userId = req.user?.id as number
    const cart = await cartService.findOne(userId);
    res.json({
      carts: cart
    });
  } catch (error) {
    next(error)
  }
});

router.patch('/add-to-cart', passport.authenticate('jwt', {session:false}), checkRoles(['client']), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const userId = req.user?.id as number
    const merchantId = req.body.merchantId
    const products = req.body.products;
    const cart = await cartService.addToCart(userId, products, merchantId);
    res.json({
      cart: cart
    });
  } catch (error) {
    next(error)
  }
});

router.patch('/remove-from-cart/:productId', passport.authenticate('jwt', {session:false}), checkRoles(['client']), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const userId = req.user?.id as number;
    const productId = parseInt(req.params.productId);
    const cart = await cartService.removeFromCart(userId, productId);
    res.json({
      cart: cart
    });
  } catch (error) {
    next(error)
  }
});

router.delete('',  passport.authenticate('jwt', {session:false}), checkRoles(['client']), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const userId = req.user?.id as number;
    const result = await cartService.delete(userId);
    res.json({result});
  } catch (error) {
    next(error)
  }
});

export default router;
