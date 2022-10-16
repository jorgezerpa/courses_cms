import boom from "@hapi/boom"
import { Product } from "../database/typeorm/entities/product"
import AppDataSource from "../database/typeorm"
import { Merchant } from "../database/typeorm/entities"

const productModel = AppDataSource.getRepository(Product)
const merchantModel = AppDataSource.getRepository(Merchant)

const productService = {
    get: async function(merchantId:number){
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{products:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.products || merchant.products.length<=0 )throw boom.notFound("not products created")        
        return merchant.products
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
        const merchant = await merchantModel.findOneBy({id:merchantId})
        if(!merchant) throw boom.notFound('merchant not found')
        const newProduct = new Product()
        newProduct.name = data.name
        newProduct.description = data.description
        newProduct.price = data.price
        newProduct.quantity = data.quantity
        newProduct.merchant = merchant
        const result = await productModel.save(newProduct)
        if(!result) throw boom.badRequest('Can not create the product')
        return result
    },
    update: async function(merchantId:number, productId:number, changes: any){
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{products:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.products || merchant.products.length<=0 )throw boom.notFound("not products created")        
        const productIndex = merchant.products.findIndex(product=>product.id===productId)
        if(productIndex===-1) throw boom.notFound('product not found')
        const product = merchant.products[productIndex]
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
        const result = await productModel.remove(product)
        return `product ${productId} deleted successfully`

    }
}

export default productService
