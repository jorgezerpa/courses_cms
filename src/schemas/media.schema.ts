import Joi from 'joi'

const id=Joi.number();
const name=Joi.string().min(3).max(30);
const identifier=Joi.string().min(3).max(30);

const createMediaSchema=Joi.object({
    name:name.required(),
    identifier: identifier.required(),
});

const updateMediaSchema=Joi.object({
    name:name,
    identifier: identifier,
});

const getMediaSchema=Joi.object({
    id:id.required()
});

const filterMediaSchema=Joi.object({
    filter: Joi.string().regex(/images|files|videos/m)
});

export {createMediaSchema, getMediaSchema, updateMediaSchema, filterMediaSchema}