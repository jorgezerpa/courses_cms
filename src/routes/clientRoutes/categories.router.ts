import express, { Router, Response, Request, NextFunction, Express } from 'express'
import passport from "passport"
import categoryService from '../../services/categories.service'
import { createCategorySchema, updateCategorySchema, getCategorySchema } from '../../schemas/category.schema'
import validatorHandler from '../../middlewares/validator.handler'
import { handleResponse } from '../../responses/response'

const router:Router = express.Router();

router.get('/', async(req:Request, res:Response, next:NextFunction) => {
  try {
    const merchantId = req.user?.sub as number
    const categories = await categoryService.get(merchantId);
    handleResponse(res, 200, 'categories list', {categories})
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validatorHandler(getCategorySchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let categoryId = parseInt(req.params.id)
    let merchantId = req.user?.sub as number
    const category = await categoryService.findOne(merchantId, categoryId);
    handleResponse(res, 200, 'category', {category})
  } catch (error) {
    next(error)
  }
});

export default router;
