import express, { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from 'joi'
import boom from "@hapi/boom";

type Property = 'body'|'header'|'params'|'query';

function validatorHandler(schema:ObjectSchema,property:Property){
    return(req:Request, res: Response, next: NextFunction)=>{
    const data= req[property];
    const{error}=schema.validate(data);
    if(error){
        next(boom.badRequest(error.message));
    }
    next();
}}

export default validatorHandler
