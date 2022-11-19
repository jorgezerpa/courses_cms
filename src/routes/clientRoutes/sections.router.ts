import express, { Router, Response, Request, NextFunction, Express } from 'express'
import sectionService from '../../services/section.service'
import { getSectionSchema } from '../../schemas/section.schema'
import validatorHandler from '../../middlewares/validator.handler'
import { handleResponse } from '../../responses/response'

const router:Router = express.Router();

router.get('/', async(req:Request, res:Response, next:NextFunction) => {
  try {
    const sections = await sectionService.find();
    handleResponse(res, 200, 'sections list', {sections})
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validatorHandler(getSectionSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let sectionId = parseInt(req.params.id)
    const section = await sectionService.findOne(sectionId);
    handleResponse(res, 200, 'section', {section})
  } catch (error) {
    next(error)
  }
});

export default router;
