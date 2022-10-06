import Joi from 'joi'

const id=Joi.number();
const name=Joi.string().min(3).max(30);
// const price=Joi.number().integer().min(10);

const createProductSchema=Joi.object({
    name:name.required(),
});

const updateProductSchema=Joi.object({
    name:name,
});

const getProductSchema=Joi.object({
    id:id.required(),
});

export {createProductSchema,updateProductSchema,getProductSchema}