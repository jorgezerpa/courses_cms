import Joi from 'joi'

const id=Joi.number()
const name = Joi.string()
const price = Joi.number()

const orderProductSchema=Joi.object({
    id:id.required(),
    name: name.required(),
    price: price.required(),
});

export {orderProductSchema}