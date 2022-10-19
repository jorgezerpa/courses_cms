import boom from "@hapi/boom"
import { Category } from "../database/typeorm/entities/category"
import AppDataSource from "../database/typeorm"
import { Merchant } from "../database/typeorm/entities"
import { Product } from "../database/typeorm/entities"

const categoryModel = AppDataSource.getRepository(Category)
const merchantModel = AppDataSource.getRepository(Merchant)
const productModel = AppDataSource.getRepository(Product)

const categoryService = {
    get: async function(merchantId:number){
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{categories:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.categories || merchant.categories.length<=0 )throw boom.notFound("not categories created")        
        return merchant.categories
    },
    findOne: async function(merchantId:number, categoryId: number){
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{categories:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.categories || merchant.categories.length<=0 )throw boom.notFound("not categories created")        
        const categoryIndex = merchant.categories.findIndex(category=>category.id===categoryId)
        if(categoryIndex===-1) throw boom.notFound('category not found')
        const category = merchant.categories[categoryIndex]
        return category    
    },
    create: async function(merchantId:number, data: Category){
        const merchant = await merchantModel.findOneBy({id:merchantId})
        if(!merchant) throw boom.notFound('merchant not found')
        const newCategory = new Category()
        newCategory.name = data.name
        newCategory.description = data.description
        newCategory.merchant = merchant
        const result = await categoryModel.save(newCategory)
        if(!result) throw boom.badRequest('Can not create the category')
        return result
    },
    update: async function(merchantId:number, categoryId:number, changes: any){
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{categories:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.categories || merchant.categories.length<=0 )throw boom.notFound("not categories created")        
        const categoryIndex = merchant.categories.findIndex(category=>category.id===categoryId)
        if(categoryIndex===-1) throw boom.notFound('category not found')
        const category = merchant.categories[categoryIndex]
        const updatedCategory = {...category, ...changes}
        const result = await categoryModel.save(updatedCategory)
        return result
    },
    delete: async function(merchantId:number, categoryId:number){
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{categories:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.categories || merchant.categories.length<=0 )throw boom.notFound("not categories created")        
        const categoryIndex = merchant.categories.findIndex(category=>category.id===categoryId)
        if(categoryIndex===-1) throw boom.notFound('category not found')
        const category = merchant.categories[categoryIndex]
        const result = await categoryModel.remove(category)
        return `category ${categoryId} deleted`
    },
    addToCategory:async function(productId:number, categoryId:number, merchantId:number){
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{categories:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.categories || merchant.categories.length<=0 )throw boom.notFound("not categories created")
        const categoryIndex = merchant.categories.findIndex(category=>category.id === categoryId)
        if(categoryIndex===-1) throw boom.notFound('category not found')
        const category = await categoryModel.findOne({where:{id:merchant.categories[categoryIndex].id}, relations:{products:true}})
        if(!category)throw boom.notFound('category not found')
        const product = await productModel.findOneBy({id:productId, merchant:{id:merchantId}})
        if(!product) throw boom.notFound('product not found')
        if(!category.products || category.products?.length<=0) category.products = [product]
        else category.products.push(product)
        const result = await categoryModel.save(category)
        return `product ${productId} added to category "${category.name}"`
    },
    removeFromCategory:async function(productId:number, categoryId:number, merchantId:number){
        const merchant = await merchantModel.findOne({where:{id:merchantId}, relations:{categories:true}})
        if(!merchant) throw boom.notFound('user not found')
        if(!merchant.categories || merchant.categories.length<=0 )throw boom.notFound("not categories created")
        const categoryIndex = merchant.categories.findIndex(category=>category.id === categoryId)
        if(categoryIndex===-1) throw boom.notFound('category not found')
        const category = await categoryModel.findOne({where:{id:merchant.categories[categoryIndex].id}, relations:{products:true}})
        if(!category)throw boom.notFound('category not found')
        if(!category.products || category.products?.length<=0) throw boom.notFound('this category do not have products')
        const categoryUpdated = category.products.filter(product=>product.id!==productId)
        category.products = [...categoryUpdated]
        const result = await categoryModel.save(category)
        return `product ${productId} removed from category "${category.name}"`
    }
}

export default categoryService
