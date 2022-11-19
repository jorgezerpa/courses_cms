import express, { Router, Response, Request, NextFunction, Express } from 'express'
import programService from '../../services/program.service'
import { getProgramSchema } from '../../schemas/program.schema'
import validatorHandler from '../../middlewares/validator.handler'
import { handleResponse } from '../../responses/response'

const router:Router = express.Router();

router.get('/', async(req:Request, res:Response, next:NextFunction) => {
  try {
    const programs = await programService.find();
    handleResponse(res, 200, 'programs list', {programs})
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validatorHandler(getProgramSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let programId = parseInt(req.params.id)
    const program = await programService.findOne(programId);
    handleResponse(res, 200, 'program', {program})
  } catch (error) {
    next(error)
  }
});

export default router;
