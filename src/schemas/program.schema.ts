import Joi from 'joi'

const id=Joi.number();
const name=Joi.string().min(3).max(30);
const description=Joi.string().max(100);

const createProgramSchema=Joi.object({
    name:name.required(),
    description: description.required(),
});

const updateProgramSchema=Joi.object({
    name:name,
    description: description,
});

const getProgramSchema=Joi.object({
    id:id.required()
});

export {createProgramSchema, getProgramSchema, updateProgramSchema}