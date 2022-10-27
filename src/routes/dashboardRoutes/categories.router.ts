import express, { Router, Response, Request, NextFunction, Express } from 'express'
import passport from "passport"
import categoryService from '../../services/categories.service'
import { createCategorySchema, updateCategorySchema, getCategorySchema } from '../../schemas/category.schema'
import validatorHandler from '../../middlewares/validator.handler'
import { handleResponse } from '../../responses/response'

const router:Router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const merchantId = req.user?.sub as number
    const categories = await categoryService.get(merchantId);
    handleResponse(res, 200, 'categories list', {categories})
  } catch (error) {
    next(error)
  }
});

router.get('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(getCategorySchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let categoryId = parseInt(req.params.id)
    let merchantId = req.user?.sub as number
    const category = await categoryService.findOne(merchantId, categoryId);
    handleResponse(res, 200, 'category', {category})
  } catch (error) {
    next(error)
  }
});

router.post('/', passport.authenticate('jwt', {session:false}), validatorHandler(createCategorySchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const data = req.body
    const merchantId = req.user?.sub as number
    const category = await categoryService.create(merchantId, data);
    handleResponse(res, 201,'category created', {category})
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(getCategorySchema, 'params'), validatorHandler(updateCategorySchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const categoryId = parseInt(req.params.id)
    const merchantId = req.user?.sub as number
    const changes = req.body;
    const category = await categoryService.update(merchantId,categoryId, changes);
    handleResponse(res, 200, 'category updated', {category})
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',  passport.authenticate('jwt', {session:false}), validatorHandler(getCategorySchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let categoryId = parseInt(req.params.id)
    const merchantId = req.user?.sub as number;
    const result = await categoryService.delete(merchantId, categoryId);
    handleResponse(res, 200, result, {})
  } catch (error) {
    next(error)
  }
});

router.patch('/add-to-category/:categoryId', passport.authenticate('jwt', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const categoryId = parseInt(req.params.categoryId)
    const productId = req.body.productId
    const merchantId = req.user?.sub as number
    const result = await categoryService.addToCategory(productId, categoryId, merchantId)
    handleResponse(res, 200, result, {})
  } catch (error) {
      next(error)
  }
})

router.patch('/remove-from-category/:categoryId', passport.authenticate('jwt', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const categoryId = parseInt(req.params.categoryId)
    const productId = req.body.productId
    const merchantId = req.user?.sub as number
    const result = await categoryService.removeFromCategory(productId, categoryId, merchantId)
    handleResponse(res, 200, result, {})
  } catch (error) {
      next(error)
  }
})

export default router;
