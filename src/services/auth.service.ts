import boom from "@hapi/boom"
import { Auth } from "../database/typeorm/entities/auth"
import AppDataSource from "../database/typeorm"

const authModel = AppDataSource.getRepository(Auth)

const authService = {
    get: async function(){
        const result = await authModel.find()
        if(result.length <= 0){
            throw boom.notFound("not auth created")
        }
        return result
    },
    findOne: async function(authId: number){
        const auth = await authModel.findOneBy({id:authId})
        if(!auth){
            throw boom.notFound('auth not found')
        }
        return auth    
    },
    create: async function(data: Auth){
        const newAuth = await authModel.save(data)
        if(!newAuth){
            throw boom.badRequest('Can not create the auth')
        }
        return newAuth
    },
    update: async function(authId:number, changes: any){
        const authToUpdate = await authModel.findOneBy({id:authId})
        if(!authToUpdate){
            throw boom.notFound('auth to update not found')
        }
        const newAuth = { ...authToUpdate, ...changes }
        const result = await authModel.save(newAuth)
        return result 
    },
    delete: async function(authId:number){
        const auth = await authModel.findOneBy({id:authId})
        if(!auth){
            throw boom.notFound('auth to delete not found')
        }
        await authModel.remove(auth)
        return { authId }
    }
}

export default authService
