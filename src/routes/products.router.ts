import express, { Router, Response, Request, NextFunction, Express } from 'express'
import passport from "passport"
import productService from '../services/products.service'
import { createProductSchema, updateProductSchema, getProductSchema } from '../schemas/product.schema'
import validatorHandler from '../middlewares/validator.handler'
import { handleResponse } from '../responses/response'

const router:Router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const merchantId = req.user?.id as number
    const products = await productService.get(merchantId);
    handleResponse(res, 200, 'products list', {products})
  } catch (error) {
    next(error)
  }
});

router.get('/get-by-category/:categoryId', passport.authenticate('jwt', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const merchantId = req.user?.id as number
    const categoryId = parseInt(req.params.categoryId)
    const products = await productService.getByCategory(merchantId, categoryId);
    handleResponse(res, 200, 'products list', {products})
  } catch (error) {
    next(error)
  }
});

router.get('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(getProductSchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let productId = parseInt(req.params.id)
    let merchantId = req.user?.id as number
    const product = await productService.findOne(merchantId, productId);
    handleResponse(res, 200, 'product found', {product})
  } catch (error) {
    next(error)
  }
});

router.post('/', passport.authenticate('jwt', {session:false}), validatorHandler(createProductSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const data = req.body
    const merchantId = req.user?.id as number
    const product = await productService.create(merchantId, data);
    handleResponse(res, 201, 'product created', {product})
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const productId = parseInt(req.params.id)
    const merchantId = req.user?.id as number
    const changes = req.body;
    const product = await productService.update(merchantId,productId, changes);
    handleResponse(res, 200, 'products updated', {product})
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',  passport.authenticate('jwt', {session:false}), validatorHandler(getProductSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const productId = parseInt(req.params.id)
    const merchantId = req.user?.id as number;
    const result = await productService.delete(merchantId, productId);
    handleResponse(res, 200, result, {})
  } catch (error) {
    next(error)
  }
});

export default router;
