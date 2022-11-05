import boom from "@hapi/boom"
import AppDataSource from "../database/typeorm"
import { Order } from '../database/typeorm/entities/order'
import { Merchant } from "../database/typeorm/entities"
import { OrderStateType } from '../types/orderState.type'

const orderModel = AppDataSource.getRepository(Order)
const merchantModel = AppDataSource.getRepository(Merchant)

const ordersService = {
    get: async function(merchantId:number){
        const orders = await orderModel.find({where:{merchant:{ id: merchantId } }})
        if(!orders || orders.length<=0) throw boom.notFound('order not found')
        return orders
    },
    getOne: async function(orderId:number, merchantId:number){
        const order = await orderModel.findOne({where:{ id: orderId, merchant:{ id: merchantId } }})
        if(!order) throw boom.notFound('order not found')
        return order
    },
    create: async function(data:string, merchantId:number){
        const merchant = await merchantModel.findOneBy({id: merchantId})
        if(!merchant) throw boom.unauthorized('unauthorized')
        const newOrder = await orderModel.save({ order: data, status:'in-process', merchant:merchant})
        if(!newOrder) throw boom.badRequest('Can not save the order')
        return newOrder
    },
    delete: async function(orderId:number, merchantId:number){
        const order = await orderModel.findOneBy({id:orderId, merchant:{id:merchantId}})
        if(!order){
            throw boom.notFound('order to delete not found')
        }
        await orderModel.remove(order)
        return `order ${orderId} deleted`
    },
    updateState: async function(orderId:number, merchantId:number, state:OrderStateType){
        //change btw inProcess, canceled, success, error
        const order = await orderModel.findOne({where:{ id: orderId, merchant:{ id: merchantId } }})
        if(!order) throw boom.notFound('order not found')
        const updatedOrder:Order = { ...order, state:state }
        const result = await orderModel.save(updatedOrder)
        return result
    },
    createFile: async function(){
        //create .txt or .pdf or .excel file to save register
    }
}

export default ordersService
