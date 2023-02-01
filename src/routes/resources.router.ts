import express, { Router, Response, Request, NextFunction } from 'express'
import { handleResponse } from '../responses/response';
import resourceService from '../services/resource.service';
import { createLessonSchema, getLessonSchema, updateLessonSchema } from '../schemas/lesson.schema'
import validatorHandler from '../middlewares/validator.handler';
import { UploadedFile } from 'express-fileupload';

const router:Router = express.Router();

router.post('/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const resourcePath = (req.files?.resource as UploadedFile).tempFilePath;
        const resourceData = req.body;
        const result = await resourceService.addResource(userId, lessonId, resourceData, resourcePath, 'png');
        handleResponse(res, 200, 'resource uploaded', result)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const result = await resourceService.getResources(userId, lessonId);
        handleResponse(res, 200, 'resources', result||{})
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth0|1234';
        const resourceId = parseInt(req.params.id);
        const resourcePath = req.files?.resource ? (req.files?.resource as UploadedFile).tempFilePath : null;
        const resourceData = req.body;
        const result = await resourceService.updateResource(userId, resourceId, resourceData, resourcePath, 'png');
        handleResponse(res, 200, 'resource updated', result)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth0|1234';
        const resourceId = parseInt(req.params.id);
        const result = await resourceService.removeResource(userId, resourceId);
        handleResponse(res, 200, 'resource deleted', result)
    } catch (error) {
        next(error)
    }
})


export default router;

