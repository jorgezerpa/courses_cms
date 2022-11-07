import express, { Router, Response, Request, NextFunction } from 'express'
import passport from "passport"
import merchantService from '../../services/merchant.service'
import { createMerchantSchema, updateMerchantSchema, getMerchantSchema } from '../../schemas/merchant.schema'
import validatorHandler from '../../middlewares/validator.handler'
import { handleResponse } from '../../responses/response'

const router:Router = express.Router();

router.get('/', passport.authenticate('jwt', {session:false}),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = req.user?.sub as number
    const merchant = await merchantService.findOne(id);
    handleResponse(res, 200, 'merchant', {merchant})
  } catch (error) {
    next(error)
  }
});

router.post('/', validatorHandler(createMerchantSchema, 'body'), validatorHandler(createMerchantSchema, 'body') , async(req:Request, res:Response, next:NextFunction) => {
  try {
    const {password, ...data} = req.body
    const merchant = await merchantService.create(data, password);
    handleResponse(res, 201, 'merchant created', {merchant})
  } catch (error) {
    next(error)
  }
});

router.patch('/', passport.authenticate('jwt', {session:false}), validatorHandler(updateMerchantSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = req.user?.sub as number
    const changes = req.body
    const merchant = await merchantService.update(id, changes);
    handleResponse(res, 200, 'merchant updated', {merchant})
  } catch (error) {
    next(error)
  }
});

router.delete('',passport.authenticate('jwt', {session:false}), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = req.user?.sub as number
    const result = await merchantService.delete(id);
    handleResponse(res, 200, result, {})
  } catch (error) {
    next(error)
  }
});

router.get('/client-credentials', passport.authenticate('jwt', {session:false}),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = req.user?.sub as number
    const merchantCredentials = await merchantService.getClientCredentials(id);
    handleResponse(res, 200, 'merchant credentials', {merchantCredentials})
  } catch (error) {
    next(error)
  }
});

export default router;
