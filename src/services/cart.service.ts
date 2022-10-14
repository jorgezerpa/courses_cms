import boom from "@hapi/boom"
import { Merchant, Client, Cart, Product } from "../database/typeorm/entities"
import AppDataSource from "../database/typeorm"

const cartModel = AppDataSource.getRepository(Cart)
const clientModel = AppDataSource.getRepository(Client)
const merchantModel = AppDataSource.getRepository(Merchant)
const ProductModel = AppDataSource.getRepository(Product)

const productService = {
    findOne: async function(clientId: number){
        const client = await clientModel.findOne({where:{id:clientId}, relations:{cart:true}})
        if(!client){
            throw boom.notFound('client not found')
        }
        if(!client.cart){
            throw boom.notFound('this user do not have a cart')
        }
        const cart = cartModel.findOne({where:{id:client.cart.id}, relations: {products:true}})
        return cart    
    },
    create: async function(merchantId: number, clientId: number){ 
        const newCart = new Cart()
        const client = await clientModel.findOneBy({id:clientId})
        const merchant = await merchantModel.findOneBy({id: merchantId})
        if(!client){
            throw boom.notFound('the client owner of the cart was not found')
        }
        if(!merchant){
            throw boom.notFound('the client owner of the cart was not found')
        }
        newCart.client = client 
        newCart.merchant = merchant
        const createdCart = await cartModel.save(newCart)
        if(!createdCart){
            throw boom.badRequest('Can not create the cart')
        }
        return createdCart
    },
    addToCart: async function(clientId:number, productIds:number[], merchantId:number){
        const client = await clientModel.findOne({where:{id:clientId}, relations:{cart:true}})
        if(!client){
            throw boom.notFound('client not found')
        }
        if(!client.cart){
            client.cart = await this.create(merchantId, clientId)
        }
        const cart = await cartModel.findOne({where:{id:client.cart.id}, relations:{products:true}}) as Cart
        const products = cart.products || [];
        for await(let productId of productIds){
            const product = await ProductModel.findOneBy({id:productId})
            if(product) products.push(product)
        }
        const updatedProducts = [...new Set(products.map(product=>JSON.stringify(product)))]
        cart.products = [...updatedProducts.map(product=>JSON.parse(product))] 
        cart.totalAmount = getTotalPrice(cart.products)
        const updatedCart = await cartModel.save(cart)
        return updatedCart

    },
    removeFromCart: async function(clientId:number, productId:number){
        const client = await clientModel.findOne({where:{id:clientId}, relations:{cart:true}})
        if(!client) throw boom.notFound('client not found')
        if(!client.cart)throw boom.notFound('this user do not have a cart')
        if(client.cart){
            const cart = await cartModel.findOne({where:{id:client.cart.id}, relations:{products:true}}) as Cart
            if(cart.products===undefined || cart.products.length<=0)throw boom.notFound('not products on cart')
            const newProducts = cart.products.filter(product=> product.id !== productId)
            if(cart.products.length === newProducts.length)throw boom.notFound(`can not delete. Product ${productId} is not in this cart`)
            cart.products = newProducts
            cart.totalAmount = getTotalPrice(cart.products)
            const updatedCart = await cartModel.save(cart)
            return updatedCart
        }
    },
    delete: async function(clientId:number){
        const client = await clientModel.findOne({where:{id:clientId}, relations:{cart:true}})
        if(!client) throw boom.notFound('client not found')
        if(!client.cart || client.cart===null) throw boom.notFound('this user do not have a cart')
        const cart = await cartModel.findOneBy({id:client.cart.id}) as Cart
        const result = await cartModel.remove(cart)
        return { result }   
    }
}


function getTotalPrice(products:Product[]){
    const productsPrices = products.map(product=> product.price)
    const totalPrice = productsPrices.reduce((acc, cur)=>{
        if(acc!==undefined && cur!==undefined) return acc+cur
    })
    return totalPrice as number
}

export default productService
