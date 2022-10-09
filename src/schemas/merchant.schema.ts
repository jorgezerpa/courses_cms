import Joi from 'joi'

const id=Joi.number();
const firstName=Joi.string().min(3).max(30);
const lastName=Joi.string().min(3).max(30);
const userName=Joi.string().min(3).max(30);
const email=Joi.string().min(3).max(30);
const password=Joi.string().min(3).max(30);
const phone=Joi.number();

const createMerchantSchema=Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    username: userName.required(),
    email: email.required(),
    phone: phone.required(),
    password: password.required()
});

const updateMerchantSchema=Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    userName: userName.required(),
    email: email.required(),
    phone: phone.required(),
});

const getMerchantSchema=Joi.object({
    id:id.required(),
});

export {createMerchantSchema,updateMerchantSchema,getMerchantSchema}