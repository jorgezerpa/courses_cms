import Joi, { required, string } from 'joi'

const id=Joi.number();
const paymentMethodId=string();
const totalAmount=Joi.number();
const clientId=Joi.number();
const merchantId = Joi.number();

const createOrderSchema=Joi.object({
    id: id.required(),
    totalAmount: totalAmount.required(),
    clientId: clientId.required(),
    merchantId: merchantId.required(),
    
});

const updateOrderSchema=Joi.object({
    id: id,
    totalAmount: totalAmount,
    clientId: clientId,
    merchantId: merchantId,
});

// const filterOrderSchema=Joi.object({
//     name:name,
//     description: description,
//     price: price,
//     quantity: quantity,
//     merchantId: merchantId,
// });

const getOrderSchema=Joi.object({
    id:id.required(),
});

export {createOrderSchema,updateOrderSchema,getOrderSchema}