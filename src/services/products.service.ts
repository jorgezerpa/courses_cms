import boom from "@hapi/boom"
import path from "path"
import AppDataSource from "../database/typeorm"
import { Product } from "../database/typeorm/entities/product"
import { Merchant } from "../database/typeorm/entities"
import { Category } from "../database/typeorm/entities"
import fs from 'fs'

const productModel = AppDataSource.getRepository(Product)
const categoryModel = AppDataSource.getRepository(Category)
const merchantModel = AppDataSource.getRepository(Merchant)

interface filterProducts  {
    categoryId?: number
}

const productService = {
    get: async function(merchantId:number){
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{products:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.products || merchant.products.length<=0 )throw boom.notFound("not products created") 
        const products = productModel.find({where:{merchant:merchant}, relations:{categories:true}})       
        return products
    },
    getByCategory: async function(merchantId:number, categoryId:number){
        const merchant = await merchantModel.findOne({where:{id:merchantId, categories:{id:categoryId}}, relations:{products:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.products || merchant.products.length<=0 )throw boom.notFound("not products created") 
        const products = productModel.find({where:{merchant:merchant}, relations:{categories:true}})       
        return products
    },
    findOne: async function(merchantId:number, productId: number){
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{products:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.products || merchant.products.length<=0 )throw boom.notFound("not products created")        
        const productIndex = merchant.products.findIndex(product=>product.id===productId)
        if(productIndex===-1) throw boom.notFound('product not found')
        const product = merchant.products[productIndex]
        return product    
    },
    create: async function(merchantId:number, data: Product){
        let imagePath = ''
        if(data.image)imagePath = path.resolve('./','uploads', data.image)
        const merchant = await merchantModel.findOneBy({id:merchantId})
        if(!merchant) throw boom.notFound('merchant not found')
        const newProduct = new Product()
        newProduct.name = data.name
        newProduct.description = data.description
        newProduct.price = data.price
        newProduct.quantity = data.quantity
        newProduct.image = imagePath
        newProduct.merchant = merchant
        const result = await productModel.save(newProduct)
        if(!result) throw boom.badRequest('Can not create the product')
        return result
    },
    update: async function(merchantId:number, productId:number, rawChanges: any){
        const {image, ...changes} = rawChanges
        if(image){
            changes.image = path.resolve('./','uploads', rawChanges.image) 
        } 
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{products:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.products || merchant.products.length<=0 )throw boom.notFound("not products created")        
        const productIndex = merchant.products.findIndex(product=>product.id===productId)
        if(productIndex===-1) throw boom.notFound('product not found')
        const product = merchant.products[productIndex]
        if(image){
            const path = product.image as string
            fs.unlink(path, (err)=>{
                if(err) throw err
            })
        }
        const updatedProduct = {...product, ...changes}
        const result = await productModel.save(updatedProduct)
        return result
    },
    delete: async function(merchantId:number, productId:number){
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{products:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.products || merchant.products.length<=0 )throw boom.notFound("not products created")        
        const productIndex = merchant.products.findIndex(product=>product.id===productId)
        if(productIndex===-1) throw boom.notFound('product not found')
        const product = merchant.products[productIndex]
        if(Boolean(product.image)){
            const path = product.image as string
            fs.unlink(path, (err)=>{
                if(err) throw err
            })
        }
        const result = await productModel.remove(product)
        return `product ${productId} deleted successfully`
    },
}

export default productService
