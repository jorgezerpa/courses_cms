import express, { Router, Response, Request, NextFunction, Express } from 'express'
import upload from '../../utils/multer'
import mediaService from '../../services/media.sevice'
import { handleResponse } from '../../responses/response'
import { createMediaSchema, getMediaSchema, filterMediaSchema } from '../../schemas/media.schema'
import validatorHandler from '../../middlewares/validator.handler'

const router:Router = express.Router();

router.post('/upload', upload.single('asset'), validatorHandler(createMediaSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
        const path = req.file?.path as string
        const data = req.body
        const type:'video'|'image'|'file' = req.query.type as 'video'|'image'|'file'
        const result = await mediaService.upload(path, data, type)
        handleResponse(res, 200, 'assets uploaded', result)  
  } catch (error) {
    next(error)
  }
});

router.get('/', validatorHandler(filterMediaSchema, 'query') ,async(req:Request, res:Response, next:NextFunction) => {
  try {
        let filter = req.query.filter as string || null 
        const result = await mediaService.find(filter)
        handleResponse(res, 200, 'assets', result)  
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', upload.single('asset'), validatorHandler(createMediaSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
        const assetId = parseInt(req.params.id)
        const data = req.body
        if(req.file) data.path = req.file.path
        const type:'video'|'image'|'file' = req.query.type as 'video'|'image'|'file'
        const result = await mediaService.update(assetId, type, data)
        handleResponse(res, 200, `${type} updated`, result)  
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', validatorHandler(getMediaSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
        const assetId = parseInt(req.params.id)
        const type:'video'|'image'|'file' = req.query.type as 'video'|'image'|'file'
        const result = await mediaService.delete(assetId, type)
        handleResponse(res, 200, 'asset deleted', result)  
  } catch (error) {
    next(error)
  }
});

export default router;
