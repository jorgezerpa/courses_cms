import Joi from 'joi'

const id=Joi.number();
const firstName=Joi.string().min(3).max(30);
const lastName=Joi.string().min(3).max(30);
const email=Joi.string().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const password=Joi.string().min(3).max(30);
const phone=Joi.string().min(3).max(30);

const createMerchantSchema=Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    phone: phone.required(),
    password: password.required()
});

const updateMerchantSchema=Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    phone: phone.required(),
});

const getMerchantSchema=Joi.object({
    id:id.required(),
});

export {createMerchantSchema,updateMerchantSchema,getMerchantSchema}