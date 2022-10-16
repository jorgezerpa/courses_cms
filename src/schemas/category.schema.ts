import Joi from 'joi'

const id=Joi.number();
const name=Joi.string().min(3).max(30);
const description=Joi.string().max(100);

const createCategorySchema=Joi.object({
    name:name.required(),
    description: description.required(),
});

const updateCategorySchema=Joi.object({
    name:name.required(),
    description: description.required(),
});

const getCategorySchema=Joi.object({
    id:id.required(),
});

export {createCategorySchema,updateCategorySchema,getCategorySchema}
