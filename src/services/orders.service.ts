import boom from "@hapi/boom"
import { Merchant, Client, Order, Product, Cart, Shipping } from "../database/typeorm/entities"
import AppDataSource from "../database/typeorm"

const orderModel = AppDataSource.getRepository(Order)
const clientModel = AppDataSource.getRepository(Client)
const merchantModel = AppDataSource.getRepository(Merchant)
const ProductModel = AppDataSource.getRepository(Product)
const cartModel = AppDataSource.getRepository(Cart)

const productService = {
    findOne: async function(clientId: number){

    },
    create: async function(clientId: number, data:any){ 
        const user = await clientModel.findOne({where:{id:clientId}, relations:{cart:true}})
        if(!user) throw boom.notFound('user not found')
        if(!user.cart) throw boom.notFound('user do not have a cart')
        const cart = await cartModel.findOne({where:{id:user.cart.id}, relations:{products:true, client:true, merchant:true}})
        console.log(cart)
        if(!cart) throw boom.notFound('cart not found')
        const order = new Order()
        order.paymentMethodId = data.paymentMethod;
        order.client = cart.client
        order.merchant = cart.merchant
        order.products = cart.products
        order.totalAmount = cart.totalAmount
        order.shipping = {...data.shipping}
        const orderCreated = await orderModel.save(order)
        return orderCreated
    },
    addToOrder: async function(clientId:number, productIds:number[], merchantId:number){
        
    },
    removeFromOrder: async function(clientId:number, productId:number){
        
    },
    delete: async function(clientId:number){
           
    }
}


function getTotalPrice(products:Product[]){
    
}

export default productService
