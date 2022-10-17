import express, { Router, Response, Request, NextFunction, Express } from 'express'
import passport from "passport"
import categoryService from '../services/categories.service'
import { createCategorySchema, updateCategorySchema, getCategorySchema } from '../schemas/category.schema'
import validatorHandler from '../middlewares/validator.handler'

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router:Router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const merchantId = req.user?.id as number
    const categories = await categoryService.get(merchantId);
    res.json({
      categories: categories
    });
  } catch (error) {
    next(error)
  }
});

router.get('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(getCategorySchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let categoryId = parseInt(req.params.id)
    let merchantId = req.user?.id as number
    const category = await categoryService.findOne(merchantId, categoryId);
    res.json({
      category: category
    });
  } catch (error) {
    next(error)
  }
});

router.post('/', passport.authenticate('jwt', {session:false}), upload.single('image'), validatorHandler(createCategorySchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const data = req.body
    const merchantId = req.user?.id as number
    const category = await categoryService.create(merchantId, data);
    res.json({
      category: category
    });
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', passport.authenticate('jwt', {session:false}), validatorHandler(getCategorySchema, 'params'), validatorHandler(updateCategorySchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const categoryId = parseInt(req.params.id)
    const merchantId = req.user?.id as number
    const changes = req.body;
    const category = await categoryService.update(merchantId,categoryId, changes);
    res.json({
      category: category
    });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id',  passport.authenticate('jwt', {session:false}), validatorHandler(getCategorySchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let categoryId = parseInt(req.params.id)
    const merchantId = req.user?.id as number;
    const result = await categoryService.delete(merchantId, categoryId);
    res.json({
      result: result
    });
  } catch (error) {
    next(error)
  }
});

export default router;
