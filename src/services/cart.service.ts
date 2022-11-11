import boom from "@hapi/boom"
import AppDataSource from "../database/typeorm"
import { Product } from "../database/typeorm/entities"
import { Merchant } from "../database/typeorm/entities"
import { Cart } from "../database/typeorm/entities/cart"

const cartModel = AppDataSource.getRepository(Cart)
const merchantModel = AppDataSource.getRepository(Merchant)
const productModel = AppDataSource.getRepository(Product)

const cartService = {
    getOne: async function(cartId:number, merchantId:number){
        const cart = await cartModel.findOne({where:{ id: cartId, merchant:{ id: merchantId }}, relations:{products:true}})
        if(!cart) throw boom.notFound('cart not found')
        return cart
    },
    create: async function(merchantId:number){
        const merchant = await merchantModel.findOneBy({id: merchantId})
        if(!merchant) throw boom.unauthorized('unauthorized')
        const newCart = new Cart()
        newCart.merchant = merchant
        const cart = cartModel.save(newCart)
        return cart
    },
    delete: async function(cartId:number, merchantId:number){
        const cart = await cartModel.findOneBy({id:cartId, merchant:{id:merchantId}})
        if(!cart) throw boom.notFound('order to delete not found')
        await cartModel.remove(cart)
        return `cart ${cartId} deleted`
    },
    addToCart:async function(productId:number, cartId:number, merchantId:number){
        const cart = await cartModel.findOne({where:{id:cartId, merchant: {id:merchantId}}, relations:{products:true}})
        const product = await productModel.findOneBy({id:productId, merchant: {id:merchantId}})
        if(!cart) throw boom.notFound('cart not exist')
        if(!product) throw boom.notFound('product not found')
        //handle empty cart, repeated product & add normal
        if(!cart.products || cart.products?.length<=0 ) cart.products = [product]
        else if(cart.products.findIndex(product=>product.id===productId )!==-1) cart.products = cart.products
        else cart.products = [...cart.products, product]

        if(product.price && cart.totalAmmount) cart.totalAmmount = cart.totalAmmount + product.price
        const updatedCart = await cartModel.save(cart)
        return updatedCart
    },
    removeFromCart:async function(productId:number, cartId:number, merchantId:number){
        const cart = await cartModel.findOne({where:{id:cartId, merchant: {id:merchantId}}, relations:{products:true}})
        const product = await productModel.findOneBy({id:productId, merchant: {id:merchantId}})
        if(!cart) throw boom.notFound('cart not exist')
        if(!product) throw boom.notFound('product not found')
        if(!cart.products || cart.products?.length<=0 ) throw boom.notFound('cart is empty.') 
        const newProducts = cart.products.filter(product => product.id!==productId)
        cart.products = newProducts
        if(product.price && cart.totalAmmount) cart.totalAmmount = cart.totalAmmount - product.price
        const updatedCart = await cartModel.save(cart)
        return updatedCart    
    },
    emptyCart:async function(cartId:number, merchantId:number){
        const cart = await cartModel.findOneBy({id:cartId, merchant: {id:merchantId}})
        if(!cart) throw boom.notFound('cart not exist') 
        cart.products = []
        cart.totalAmmount = 0
        const updatedCart = await cartModel.save(cart)
        return updatedCart    
    },
}

export default cartService


//this can be usefull in a future
async function addProductsFromDtaBase(productIds:number[]){
    const products:Product[]= []
    for await (let productId of productIds){
        const product = await productModel.findOneBy({ id:productId })
        if(!product) break
        products.push(product)
    }
    if(productIds.length !== products.length) throw boom.badRequest('one or some products not found. Can not create cart')
    return products     
}
