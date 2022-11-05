import Joi from 'joi'
import { directionSchema } from './direction'
import { orderProductSchema } from './product'

const id=Joi.number();
const firstName=Joi.string().min(3).max(30);
const lastName=Joi.string().min(3).max(30);
const email=Joi.string().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const products= Joi.array().items(orderProductSchema)
const phone=Joi.string().min(3).max(30);
const paymentMethod=Joi.string();
const totalAmount=Joi.number();
const paymentMethodReceipt=Joi.string()
const direction = directionSchema

const createOrderSchema=Joi.object({
    buyer: {
        firstName: firstName.required(),
        lastName: lastName.required(),
        email: email.required(),
        phone: phone.required(),
        direction: direction.required(),
    },
    products: products.required(),
    totalAmount: totalAmount.required(),
    paymentMethod: paymentMethod.required(),
    paymentMethodReceipt: paymentMethodReceipt,
});

const getOrderSchema=Joi.object({
    id:id.required(),
});

export {createOrderSchema, getOrderSchema}