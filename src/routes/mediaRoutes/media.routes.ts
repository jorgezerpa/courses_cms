import express, { Router, Response, Request, NextFunction, Express } from 'express'
import upload from '../../utils/multer'
import mediaService from '../../services/media.sevice'
import { handleResponse } from '../../responses/response'

const router:Router = express.Router();

router.post('/upload', upload.single('asset'), async(req:Request, res:Response, next:NextFunction) => {
  try {
        const path = req.file?.path as string
        const data = req.body
        const type = req.query.type as string
        console.log('here', path, data, type)
        const result = await mediaService.upload(path, data, type )
        handleResponse(res, 200, 'assets uploaded', result)  
  } catch (error) {
    next(error)
  }
});





export default router;
