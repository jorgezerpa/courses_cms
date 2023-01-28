import express, { Router, Response, Request, NextFunction } from 'express'
import { handleResponse } from '../responses/response';
import lessonService from '../services/lesson.service';
import { createLessonSchema, getLessonSchema, updateLessonSchema } from '../schemas/lesson.schema'
import validatorHandler from '../middlewares/validator.handler';

const router:Router = express.Router();

router.post('/:id', validatorHandler(createLessonSchema, 'body'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth|1';
        const courseId = parseInt(req.params.id)
        const sectionData = req.body;
        const newSection = await lessonService.create(userId, courseId, sectionData)
        handleResponse(res, 201, 'section created.', newSection)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth|1';
        const courseId = parseInt(req.params.id);
        const sections = await lessonService.list(userId, courseId);
        handleResponse(res, 200, 'courses list', sections)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', validatorHandler(getLessonSchema, 'params'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth|1';
        const sectionId = parseInt(req.params.id);
        const section = await lessonService.listOne(userId, sectionId);
        handleResponse(res, 200, 'section', section)
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', validatorHandler(updateLessonSchema, 'params'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth|1';
        const sectionId = parseInt(req.params.id);
        const data = req.body;
        const section = await lessonService.updateOne(userId, sectionId, data);
        handleResponse(res, 200, 'section updated', section)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', validatorHandler(getLessonSchema, 'params') , async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth|1';
        const sectionId = parseInt(req.params.id);
        const result = await lessonService.deleteOne(userId, sectionId);
        handleResponse(res, 200, 'section deleted', result)
    } catch (error) {
        next(error)
    }
})

export default router;

