import Joi from 'joi'

const houseNumber=Joi.string()
const street=Joi.string()
const city=Joi.string()
const references=Joi.string()
const coordinates=Joi.array().items(Joi.number())

const directionSchema=Joi.object({
        houseNumber: houseNumber.required(),
        street: street.required(),
        city: city.required(),
        references: references.required(),
        coordinates:coordinates.required(),
});

export {directionSchema}