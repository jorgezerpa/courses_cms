import Joi from 'joi'

const id=Joi.number();
const programId=Joi.number();
const name=Joi.string().min(3).max(30);
const description=Joi.string().max(100);
const coverImage=Joi.string().max(100);
const widgetsOrder=Joi.string().max(100);
const type=Joi.string().max(100);

const createSectionSchema=Joi.object({
    name:name.required(),
    description: description.required(),
});

const updateSectionSchema=Joi.object({
    name:name,
    description: description,
});

const getSectionSchema=Joi.object({
    id:id.required()
});

export {createSectionSchema, getSectionSchema, updateSectionSchema}