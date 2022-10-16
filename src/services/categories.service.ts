import boom from "@hapi/boom"
import { Category } from "../database/typeorm/entities/category"
import AppDataSource from "../database/typeorm"
import { Merchant } from "../database/typeorm/entities"

const categoryModel = AppDataSource.getRepository(Category)
const merchantModel = AppDataSource.getRepository(Merchant)

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
        return `category ${categoryId} deleted successfully`

    }
}

export default categoryService
