import express, { Router, Response, Request, NextFunction, Express } from 'express'
import widgetService from '../../services/widget.service'
import { getWidgetSchema } from '../../schemas/widget.schema'
import validatorHandler from '../../middlewares/validator.handler'
import { handleResponse } from '../../responses/response'

const router:Router = express.Router();

router.get('/', async(req:Request, res:Response, next:NextFunction) => {
  try {
    const widgets = await widgetService.find();
    handleResponse(res, 200, 'widgets list', {widgets})
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validatorHandler(getWidgetSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let widgetId = parseInt(req.params.id)
    const widget = await widgetService.findOne(widgetId);
    handleResponse(res, 200, 'widget', {widget})
  } catch (error) {
    next(error)
  }
});

export default router;
