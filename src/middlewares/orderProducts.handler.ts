import { Request, Response, NextFunction } from 'express'
import boom from '@hapi/boom'
import { Product } from '../database/typeorm/entities/product'
import AppDataSource from "../database/typeorm"

const productModel = AppDataSource.getRepository(Product)



export const handleOrderProducts = async(req:Request, res:Response, next:NextFunction)=>{
    const merchantId = req.user?.sub // Be sure that this middleware execute always after user authentication
    const products = req.body.products
    if(!products || products.length<=0) next(boom.badRequest('products array can not be empty.'))
        //check if products exist and are available
    const dbProducts:Product[] = []
    for await (let element of products){
        const product = await productModel.findOne({ where: { id:element.id, isAvailable:true, merchant: { id: merchantId } } })
        if(!product){
            next(boom.badRequest("one or some of the order's products not exist or are not available. Can not create order."))
            return
        } 
        dbProducts.push(product)
    };
    //change product to unavailable
    for await (let element of dbProducts){
        let product:Product = { ...element, isAvailable:false }
        await productModel.save(product) 
    };
    next()    
}
