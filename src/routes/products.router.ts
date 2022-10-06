import express, { Router, Response, Request, NextFunction } from 'express'
import productService from '../services/products.service'
import { createProductSchema, updateProductSchema, getProductSchema } from '../schemas/product.schema'
import validatorHandler from '../middlewares/validator.handler'

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router:Router = express.Router();

router.get('/', async(req:Request, res:Response, next:NextFunction) => {
  try {
    const products = await productService.get();
    res.json({
      products: products
    });
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validatorHandler(getProductSchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.params
    const product = await productService.findOne(id);
    res.json({
      products: product
    });
  } catch (error) {
    next(error)
  }
});

router.post('/', upload.single('image'), validatorHandler(createProductSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const data = req.body
    const product = await productService.create(data);
    res.json({
      product: product
    });
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', upload.single('image'), validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.params
    const changes = req.body
    
    const product = await productService.update(id, changes);
    res.json({
      product: product
    });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', validatorHandler(getProductSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.params
    const productId = await productService.delete(id);
    res.json({
      product: productId
    });
  } catch (error) {
    next(error)
  }
});

export default router;
