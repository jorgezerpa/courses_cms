import express, { Router, Response, Request, NextFunction } from 'express'
import { handleResponse } from '../responses/response';
import lessonService from '../services/lesson.service';
import { createLessonSchema, getLessonSchema, updateLessonSchema } from '../schemas/lesson.schema'
import validatorHandler from '../middlewares/validator.handler';
import { UploadedFile } from 'express-fileupload';

const router:Router = express.Router();

router.post('/:id', validatorHandler(createLessonSchema, 'body'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const sectionId = parseInt(req.params.id)
        const lessonData = req.body;
        const newLesson = await lessonService.create(userId, sectionId, lessonData)
        handleResponse(res, 201, 'lesson created.', newLesson)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id);
        const lessons = await lessonService.list(userId, courseId);
        handleResponse(res, 200, 'section list', {lessons})
    } catch (error) {
        next(error)
    }
})

router.get('/get-lesson/:id', validatorHandler(getLessonSchema, 'params'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const lesson = await lessonService.listOne(userId, lessonId, req.auth.token);
        handleResponse(res, 200, 'lesson', lesson)
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', validatorHandler(getLessonSchema, 'params'), validatorHandler(updateLessonSchema, 'body'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const data = req.body;
        const lesson = await lessonService.updateOne(userId, lessonId, data);
        handleResponse(res, 200, 'section updated', lesson)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', validatorHandler(getLessonSchema, 'params') , async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const result = await lessonService.deleteOne(userId, lessonId);
        handleResponse(res, 200, 'section deleted', result)
    } catch (error) {
        next(error)
    }
})


//VIDEOS
router.get('/assets/getVideo/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const result = await lessonService.getVideo(userId, lessonId, req.auth.token);
        handleResponse(res, 200, 'video url', result)
    } catch (error) {
        next(error)
    }
})
router.post('/assets/addVideo/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const videoPath = (req.files?.video as UploadedFile).tempFilePath; 
        const result = await lessonService.addVideo(userId, lessonId, videoPath, 'mp4', req.auth.token);
        handleResponse(res, 200, 'video uploaded', result)
    } catch (error) {
        next(error)
    }
})
router.patch('/assets/updateVideo/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const videoPath = (req.files?.video as UploadedFile).tempFilePath; 
        const result = await lessonService.updateVideo(userId, lessonId, videoPath, 'mp4', req.auth.token);
        handleResponse(res, 200, 'video updated', result)
    } catch (error) {
        next(error)
    }
})
router.delete('/assets/deleteVideo/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const lessonId = parseInt(req.params.id);
        const result = await lessonService.removeVideo(userId, lessonId, req.auth.token);
        handleResponse(res, 200, 'video deleted', result)
    } catch (error) {
        next(error)
    }
})

export default router;

