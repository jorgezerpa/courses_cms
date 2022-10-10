import express, { Router, Response, Request, NextFunction } from 'express'
import clientService from '../services/client.service'
import { createClientSchema, updateClientSchema, getClientSchema } from '../schemas/client.schema'
import validatorHandler from '../middlewares/validator.handler'

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router:Router = express.Router();

router.get('/', async(req:Request, res:Response, next:NextFunction) => {
  try {
    const client = await clientService.get();
    res.json({
      clients: client
    });
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validatorHandler(getClientSchema, 'params'),  async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = parseInt(req.params.id)
    const client = await clientService.findOne(id);
    res.json({
      client: client
    });
  } catch (error) {
    next(error)
  }
});

router.post('/', upload.single('image'), validatorHandler(createClientSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    const {password, ...data} = req.body
    const client = await clientService.create(data, password);
    res.json({
      client: client
    });
  } catch (error) {
    next(error)
  }
});

router.patch('/:id', upload.single('image'), validatorHandler(getClientSchema, 'params'), validatorHandler(updateClientSchema, 'body'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = parseInt(req.params.id)
    const changes = req.body
    const client = await clientService.update(id, changes);
    res.json({
      client: client
    });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', validatorHandler(getClientSchema, 'params'), async(req:Request, res:Response, next:NextFunction) => {
  try {
    let id = parseInt(req.params.id)
    const clientId = await clientService.delete(id);
    res.json({
      client: clientId
    });
  } catch (error) {
    next(error)
  }
});

export default router;
