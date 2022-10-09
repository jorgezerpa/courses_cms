import express, { Router, Response, Request, NextFunction } from 'express'
import merchantService from '../services/merchant.service'
import { createMerchantSchema, updateMerchantSchema, getMerchantSchema } from '../schemas/merchant.schema'
import validatorHandler from '../middlewares/validator.handler'

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router:Router = express.Router();

router.get('/', async(req:Request, res:Response, next:NextFunction) => {
  try {
    const merchant = await merchantService.get();
    res.json({
      merchants: merchant
    });
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validatorHandler(getMerchantSchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = parseInt(req.params.id)
    const merchant = await merchantService.findOne(id);
    res.json({
      merchant: merchant
    });
  } catch (error) {
    next(error)
  }
});

router.post('/', upload.single('image'), validatorHandler(createMerchantSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const {password, ...data} = req.body
    const merchant = await merchantService.create(data, password);
    res.json({
      merchant: merchant
    });
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', upload.single('image'), validatorHandler(getMerchantSchema, 'params'), validatorHandler(updateMerchantSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = parseInt(req.params.id)
    const changes = req.body
    const merchant = await merchantService.update(id, changes);
    res.json({
      merchant: merchant
    });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', validatorHandler(getMerchantSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = parseInt(req.params.id)
    const merchantId = await merchantService.delete(id);
    res.json({
      merchant: merchantId
    });
  } catch (error) {
    next(error)
  }
});

export default router;
