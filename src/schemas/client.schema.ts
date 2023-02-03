import Joi from 'joi'

const id=Joi.string();
const firstName=Joi.string().min(3).max(30);
const lastName=Joi.string().min(3).max(30);
const email=Joi.string().max(100);
const phone=Joi.string().max(100);

const createClientSchema=Joi.object({
    id: id.required(),
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    phone: phone.required(),
});

const updateUserSchema=Joi.object({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
});

const getUserSchema=Joi.object({
    id:id.required()
});

export {createClientSchema, getUserSchema, updateUserSchema }