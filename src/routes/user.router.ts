import express, { Router, Response, Request, NextFunction } from 'express'
import { handleResponse } from '../responses/response';
import userService from '../services/user.service';
import { createUserSchema } from '../schemas/user.schema'
import validatorHandler from '../middlewares/validator.handler';

const router:Router = express.Router();

router.post('/', validatorHandler(createUserSchema, 'body'), async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userData = req.body;
        const newUser = await userService.create(userData)
        handleResponse(res, 201, 'user created.', newUser)
    } catch (error) {
        next(error)
    }
})


export default router;
