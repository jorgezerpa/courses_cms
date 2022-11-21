import express, { Router, Response, Request, NextFunction, Express } from 'express'
import sectionService from '../../services/section.service'
import { getSectionSchema, createSectionSchema, updateSectionSchema, createSectionProgramIdSchema } from '../../schemas/section.schema'
import validatorHandler from '../../middlewares/validator.handler'
import { handleResponse } from '../../responses/response'

const router:Router = express.Router();

router.post('/:programId', validatorHandler(createSectionProgramIdSchema, 'params'), validatorHandler(createSectionSchema, 'body'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    const programId = parseInt(req.params.programId) 
    const sectionData = req.body
    const section = await sectionService.create(sectionData, programId);
    handleResponse(res, 200, 'section created', {section})
  } catch (error) {
    next(error)
  }
});

router.get('/:programId', async(req:Request, res:Response, next:NextFunction) => {
  try {
    const programId = parseInt(req.params.programId)
    const sections = await sectionService.find(programId);
    handleResponse(res, 200, 'sections list', {sections})
  } catch (error) {
    next(error)
  }
});

router.get('/find-one/:id', validatorHandler(getSectionSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let sectionId = parseInt(req.params.id)
    const section = await sectionService.findOne(sectionId);
    handleResponse(res, 200, 'sections', {section})
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', validatorHandler(getSectionSchema, 'params'), validatorHandler(updateSectionSchema, 'body'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let sectionId = parseInt(req.params.id)
    const changes = req.body
    const section = await sectionService.update(sectionId, changes);
    handleResponse(res, 200, 'section updated', {section})
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', validatorHandler(getSectionSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let sectionId = parseInt(req.params.id)
    const section = await sectionService.delete(sectionId);
    handleResponse(res, 200, 'section deleted', {section})
  } catch (error) {
    next(error)
  }
});

export default router;
