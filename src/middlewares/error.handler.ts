import express, { Response, Request, NextFunction } from 'express'
import { handleErrorResponse } from '../responses/response'

function logErrors(err: any,req:Request,res: Response,next: NextFunction){
    console.error(err);
    next(err);
}

function errorHandler(err: any,req:Request,res: Response,next: NextFunction){
    handleErrorResponse(res, err.status || 500, err.message, {})
}

function boomErrorHandler(err: any,req:Request,res: Response,next: NextFunction){
    if(err.isBoom){
        const{output}=err;
        handleErrorResponse(res, output.statusCode || 500, output.payload, {})
        return
    }
    next(err);
}

export {logErrors,errorHandler, boomErrorHandler}