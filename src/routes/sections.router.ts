import express, { Router, Response, Request, NextFunction } from 'express'
import { handleResponse } from '../responses/response';
import sectionService from '../services/section.service';
import { createSectionSchema, getSectionSchema, updateSectionSchema } from '../schemas/section.schema'
import validatorHandler from '../middlewares/validator.handler';

const router:Router = express.Router();

router.post('/:id', validatorHandler(createSectionSchema, 'body'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id)
        const sectionData = req.body;
        const newSection = await sectionService.create(userId, courseId, sectionData)
        handleResponse(res, 201, 'section created.', newSection)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const courseId = parseInt(req.params.id);
        const sections = await sectionService.list(userId, courseId);
        handleResponse(res, 200, 'courses list', {sections})
    } catch (error) {
        next(error)
    }
})

router.get('/get-section/:id', validatorHandler(getSectionSchema, 'params'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const sectionId = parseInt(req.params.id);
        const section = await sectionService.listOne(userId, sectionId);
        handleResponse(res, 200, 'section', section)
    } catch (error) {
        next(error)
    }
})

router.patch('/:id', validatorHandler(getSectionSchema, 'params'), validatorHandler(updateSectionSchema, 'body'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const sectionId = parseInt(req.params.id);
        const data = req.body;
        const section = await sectionService.updateOne(userId, sectionId, data);
        handleResponse(res, 200, 'section updated', section)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', validatorHandler(getSectionSchema, 'params') , async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.auth.payload.sub || 'auth0|1234';
        const sectionId = parseInt(req.params.id);
        const result = await sectionService.deleteOne(userId, sectionId);
        handleResponse(res, 200, 'section deleted', result)
    } catch (error) {
        next(error)
    }
})

export default router;

