import express, { Router, Response, Request, NextFunction } from 'express'
import { handleResponse } from '../responses/response';
import courseService from '../services/course.service';
import { createCourseSchema, getCourseSchema, updateCourseSchema, getCoursesFilters } from '../schemas/course.schema'
import validatorHandler from '../middlewares/validator.handler';

const router:Router = express.Router();

router.post('/', validatorHandler(createCourseSchema, 'body'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth0|1234';
        const courseData = req.body;
        const newCourse = await courseService.create(userId, courseData)
        handleResponse(res, 201, 'course created.', newCourse)
    } catch (error) {
        next(error)
    }
})

router.get('/', validatorHandler(getCoursesFilters, 'query'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        console.log(req.auth.payload.sub)
        const userId = req.user?.sub || 'auth0|1234';
        const filter=req.query;
        const courses = await courseService.list(userId, filter);
        handleResponse(res, 200, 'courses list', {courses})
    } catch (error) {
        next(error)
    }
})

router.get('/:id', validatorHandler(getCourseSchema, 'params'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id);
        const course = await courseService.listOne(userId, courseId);
        handleResponse(res, 200, 'course', course)
    } catch (error) {
        next(error)
    }
})

router.patch('/:id',validatorHandler(getCourseSchema, 'params'), validatorHandler(updateCourseSchema, 'body'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id);
        const data = req.body;
        const course = await courseService.updateOne(userId, courseId, data);
        handleResponse(res, 200, 'course updated', course)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', validatorHandler(getCourseSchema, 'params') , async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id);
        const result = await courseService.deleteOne(userId, courseId);
        handleResponse(res, 200, 'course deleted', result)
    } catch (error) {
        next(error)
    }
})

export default router;
