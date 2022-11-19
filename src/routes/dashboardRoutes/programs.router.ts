import express, { Router, Response, Request, NextFunction, Express } from 'express'
import programService from '../../services/program.service'
import { getProgramSchema, createProgramSchema, updateProgramSchema } from '../../schemas/program.schema'
import validatorHandler from '../../middlewares/validator.handler'
import { handleResponse } from '../../responses/response'

const router:Router = express.Router();

router.post('/', validatorHandler(createProgramSchema, 'body'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    const programData = req.body
    const program = await programService.create(programData);
    handleResponse(res, 200, 'program created', {program})
  } catch (error) {
    next(error)
  }
});

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
    handleResponse(res, 200, 'programs', {program})
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', validatorHandler(getProgramSchema, 'params'), validatorHandler(updateProgramSchema, 'body'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let programId = parseInt(req.params.id)
    const changes = req.body
    const program = await programService.update(programId, changes);
    handleResponse(res, 200, 'program updated', {program})
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', validatorHandler(getProgramSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let programId = parseInt(req.params.id)
    const program = await programService.delete(programId);
    handleResponse(res, 200, 'program deleted', {program})
  } catch (error) {
    next(error)
  }
});

export default router;
