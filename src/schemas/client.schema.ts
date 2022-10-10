import Joi from 'joi'

const id=Joi.number();
const firstName=Joi.string().min(3).max(30);
const lastName=Joi.string().min(3).max(30);
const userName=Joi.string().min(3).max(30);
const email=Joi.string().min(3).max(30);
const password=Joi.string().min(3).max(30);
const phone=Joi.string().min(3).max(30);

const createClientSchema=Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    username: userName.required(),
    email: email.required(),
    phone: phone.required(),
    password: password.required()
});

const updateClientSchema=Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    userName: userName.required(),
    email: email.required(),
    phone: phone.required(),
});

const getClientSchema=Joi.object({
    id:id.required(),
});

export {createClientSchema,updateClientSchema,getClientSchema}