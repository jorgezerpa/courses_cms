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
const status = Joi.string().regex(/^(canceled|in-process|error|done)$/)

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
    orderId:id.required(),
});

const updateOrderStatusSchema=Joi.object({
    status: status,
});

export {createOrderSchema, getOrderSchema, updateOrderStatusSchema}