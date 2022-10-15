import express, { Router, Response, Request, NextFunction, Express } from 'express'
import passport from "passport"
import productService from '../services/products.service'
import { createProductSchema, updateProductSchema, getProductSchema, filterProductSchema } from '../schemas/product.schema'
import validatorHandler from '../middlewares/validator.handler'
import { checkRoles } from '../middlewares/authorization.handler'

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router:Router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}), checkRoles(['client', 'merchant']), validatorHandler(filterProductSchema, 'query'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const query = req.query;
    const userId = req.user?.id
    const products = await productService.get({...query, merchantId: userId});
    res.json({
      products: products
    });
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validatorHandler(getProductSchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = parseInt(req.params.id)
    const product = await productService.findOne(id);
    res.json({
      products: product
    });
  } catch (error) {
    next(error)
  }
});

router.post('/', passport.authenticate('jwt', {session:false}), checkRoles(['merchant']), upload.single('image'), validatorHandler(createProductSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const data = req.body
    data.merchantId = req.user?.id
    const product = await productService.create(data);
    res.json({
      product: product
    });
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', passport.authenticate('jwt', {session:false}), checkRoles(['merchant']), upload.single('image'), validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let productId = parseInt(req.params.id)
    const user = req.user;
    const changes = req.body;
    let userId = user?.id;
    changes.merchantId = userId;
    const product = await productService.update(productId, userId, changes);
    res.json({
      product: product
    });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',  passport.authenticate('jwt', {session:false}), checkRoles(['merchant']), validatorHandler(getProductSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = parseInt(req.params.id)
    const userId = req.user?.id as number;
    const productId = await productService.delete(id, userId);
    res.json({
      product: productId
    });
  } catch (error) {
    next(error)
  }
});

export default router;
