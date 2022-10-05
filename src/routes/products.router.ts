import express, { Router, Response, Request, NextFunction } from 'express'
import productService from '../services/products.service'
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

router.get('/:id', async(req:Request, res:Response, next:NextFunction) => {
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

router.post('/', upload.single('image'), async(req:Request, res:Response, next:NextFunction) => {
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

router.patch('/:id', async(req:Request, res:Response, next:NextFunction) => {
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

router.delete('/:id', async(req:Request, res:Response, next:NextFunction) => {
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
