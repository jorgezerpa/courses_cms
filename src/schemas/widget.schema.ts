import Joi from 'joi'

const id=Joi.number();
const title=Joi.string().min(3).max(30);
const description=Joi.string().max(100);
const video=Joi.string().max(100);
const file=Joi.string().max(100);
const image=Joi.string().max(100);

const createWidgetSchema=Joi.object({
    title:title.required(),
    description: description.required(),
    video:video,
    file: file,
    image: image,
});

const updateWidgetSchema=Joi.object({
    title:title,
    description: description,
    video:video,
    file: file,
    image: image,
});

const getWidgetSchema=Joi.object({
    id:id.required()
});

export {createWidgetSchema, getWidgetSchema, updateWidgetSchema}