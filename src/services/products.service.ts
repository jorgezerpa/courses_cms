import sequelize from "../database/sequelize/connection"
import boom from "@hapi/boom"
const { models } = sequelize

const productService = {
    get: async function(){
        const result = await models.Product.findAll()
        if(!result){
            throw boom.notFound('products not found')
        }
        if(result.length <= 0){
            throw boom.notFound("not products created")
        }
        return result
    },
    findOne: async function(id: number|string){
        const product = await models.Product.findByPk(id)
        if(!product){
            throw boom.notFound('product not found')
        }
        return product    
    },
    create: async function(data: any){
        const newProduct = await models.Product.create(data)
        if(!newProduct){
            throw boom.badRequest('Can not create the product')
        }
        return newProduct
    },
    update: async function(id:number|string, changes: any){
        const product = await models.Product.findByPk(id)
        if(!product){
            throw boom.notFound('product to update not found')
        }
        product?.update(changes)
        return product
    },
    delete: async function(id:number|string){
        const product = await models.Product.findByPk(id)
        if(!product){
            throw boom.notFound('product to delete not found')
        }
        product?.destroy()
        return { id }
    }
}

export default productService
