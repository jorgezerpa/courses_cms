import boom from "@hapi/boom"
import { AuthMerchant } from "../database/typeorm/entities"
import AppDataSource from "../database/typeorm"

const authMerchantModel = AppDataSource.getRepository(AuthMerchant)

const authService = {
    findOneByEmail: async function(email: string){
        const auth = await authMerchantModel.find({where: { email:email }, relations:{merchant:true} })        
        if(!auth[0]){
            throw boom.notFound('auth not found')
        }  
        return auth[0]
    },
}

export default authService
