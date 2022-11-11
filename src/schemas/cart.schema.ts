import Joi, { required } from 'joi'

const id=Joi.number();
const totalAmount=Joi.number();
const merchantId = Joi.number();
const productId = Joi.number();

const updateCartSchema=Joi.object({
    productId: productId.required()
});

const getCartSchema=Joi.object({
    cartId:id.required(),
});

export {updateCartSchema,getCartSchema}
