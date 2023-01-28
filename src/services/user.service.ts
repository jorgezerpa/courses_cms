import boom from "@hapi/boom"
import AppDataSource from "../database"
import { User } from "../database/entities"

const userModel = AppDataSource.getRepository(User)

export default {
    async create(userData:any){
        const newUser = await userModel.save({ ...userData })
        if(!newUser) throw boom.badRequest('can not create user.')
        return newUser
    },
}