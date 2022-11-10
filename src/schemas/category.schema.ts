import Joi from 'joi'

const id=Joi.number();
const name=Joi.string().min(3).max(30);
const description=Joi.string().max(100);
const image=Joi.string();
const imageId=Joi.string();

const createCategorySchema=Joi.object({
    name:name.required(),
    description: description.required(),
    image: image.required(),
});

const updateCategorySchema=Joi.object({
    name:name,
    description: description,
    image: image,
});

const getCategorySchema=Joi.object({
    id:id.required(),
});

export {createCategorySchema,updateCategorySchema,getCategorySchema}
