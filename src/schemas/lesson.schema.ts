import Joi from 'joi'

const id=Joi.number();
const title=Joi.string().min(3).max(30);
const description=Joi.string().max(100);
const video=Joi.string().max(100);
const resources=Joi.string().max(100);

const createLessonSchema=Joi.object({
    title:title.required(),
    description: description.required(),
});

const updateLessonSchema=Joi.object({
    title:title,
    description: description,
});

const getLessonSchema=Joi.object({
    id:id.required()
});

export {createLessonSchema, getLessonSchema, updateLessonSchema}