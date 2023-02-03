import express, { Router, Response, Request, NextFunction } from 'express'
import { handleResponse } from '../responses/response';
import clientService from '../services/client.service';
import { createClientSchema } from '../schemas/client.schema'
import validatorHandler from '../middlewares/validator.handler';

const router:Router = express.Router();

router.post('/', validatorHandler(createClientSchema, 'body'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const clientData = req.body;
        const newClient = await clientService.create(clientData)
        handleResponse(res, 201, 'user created.', newClient)
    } catch (error) {
        next(error)
    }
})

export default router;
