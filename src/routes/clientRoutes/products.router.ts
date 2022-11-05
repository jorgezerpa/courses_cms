import express, { Router, Response, Request, NextFunction, Express } from 'express'
import passport from "passport"
import productService from '../../services/products.service'
import { createProductSchema, updateProductSchema, getProductSchema } from '../../schemas/product.schema'
import validatorHandler from '../../middlewares/validator.handler'
import { handleResponse } from '../../responses/response'

const router:Router = express.Router();

router.get('/', passport.authenticate('header', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const merchantId = req.user?.sub as number
    const products = await productService.get(merchantId);
    handleResponse(res, 200, 'products list', {products})
  } catch (error) {
    next(error)
  }
});

router.get('/get-by-category/:categoryId', passport.authenticate('header', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const merchantId = req.user?.sub as number
    const categoryId = parseInt(req.params.categoryId)
    const products = await productService.getByCategory(merchantId, categoryId);
    handleResponse(res, 200, 'products list', {products})
  } catch (error) {
    next(error)
  }
});

router.get('/:id', passport.authenticate('header', {session:false}), validatorHandler(getProductSchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let productId = parseInt(req.params.id)
    let merchantId = req.user?.sub as number
    const product = await productService.findOne(merchantId, productId);
    handleResponse(res, 200, 'product found', {product})
  } catch (error) {
    next(error)
  }
});

export default router;
