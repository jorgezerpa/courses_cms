import Joi, { required } from 'joi'

const id=Joi.number();
const totalAmount=Joi.number();
const clientId=Joi.number();
const merchantId = Joi.number();

const createCartSchema=Joi.object({
    id: id.required(),
    totalAmount: totalAmount.required(),
    clientId: clientId.required(),
    merchantId: merchantId.required(),
    
});

const updateCartSchema=Joi.object({
    id: id,
    totalAmount: totalAmount,
    clientId: clientId,
    merchantId: merchantId,
});

// const filterCartSchema=Joi.object({
//     name:name,
//     description: description,
//     price: price,
//     quantity: quantity,
//     merchantId: merchantId,
// });

const getCartSchema=Joi.object({
    id:id.required(),
});

export {createCartSchema,updateCartSchema,getCartSchema}