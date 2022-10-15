import boom from "@hapi/boom"
import { Merchant, Client, Order, Product, Cart, Shipping } from "../database/typeorm/entities"
import AppDataSource from "../database/typeorm"

const orderModel = AppDataSource.getRepository(Order)
const clientModel = AppDataSource.getRepository(Client)
const merchantModel = AppDataSource.getRepository(Merchant)
const ProductModel = AppDataSource.getRepository(Product)
const cartModel = AppDataSource.getRepository(Cart)

const productService = {
    list: async function(clientId: number){
        const client = await clientModel.findOne({where:{id:clientId}, relations: {order:true}})
        if(!client) throw boom.notFound('client not found')
        if(!client.order) throw boom.notFound('User not have orders')
        const orders = client.order
        const fullOrders:Order[] = []
        for await (let order of orders){
            const fullOrder = await orderModel.findOne({where:{id:order.id}, relations:{products:true, merchant:true}}) as Order
            fullOrders.push(fullOrder)
        } 
        return fullOrders
    },
    create: async function(clientId: number, data:any){ 
        const user = await clientModel.findOne({where:{id:clientId}, relations:{cart:true}})
        if(!user) throw boom.notFound('user not found')
        if(!user.cart) throw boom.notFound('user do not have a cart')
        const cart = await cartModel.findOne({where:{id:user.cart.id}, relations:{products:true, client:true, merchant:true}})
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
    delete: async function(clientId:number, orderId:number){
        const user = await clientModel.findOne({where:{id:clientId}, relations:{order:true}})
        if(!user) throw boom.notFound('user not found')
        if(!user.order) throw boom.notFound('user do not have a cart')           
        const order = user.order.find(order=>order.id===orderId)
        if(!order) throw boom.notFound('Order not found')
        const result = orderModel.remove(order)
        return `order ${orderId} deleted`
    }
}

export default productService
