import Joi from 'joi'

const id=Joi.number();
const name=Joi.string().min(3).max(30);
const description=Joi.string().max(100);

const createCourseSchema=Joi.object({
    name:name.required(),
    description: description.required(),
});

const updateCourseSchema=Joi.object({
    name:name,
    description: description,
});

const getCourseSchema=Joi.object({
    id:id.required()
});

//still not implemented, just "mock" filter schema
const getCoursesFilters = Joi.object({
    name:name,
    description: description,   
})

export {createCourseSchema, getCourseSchema, updateCourseSchema, getCoursesFilters }