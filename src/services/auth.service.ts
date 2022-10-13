import boom from "@hapi/boom"
import { Auth } from "../database/typeorm/entities/auth"
import { AuthMerchant } from "../database/typeorm/entities"
import AppDataSource from "../database/typeorm"

const authClientModel = AppDataSource.getRepository(Auth)
const authMerchantModel = AppDataSource.getRepository(AuthMerchant)

const authService = {
    findOneByEmail: async function(email: string, userType:string){
        let auth:any
        if(userType === 'client') auth = await authClientModel.find({where: { email:email }, relations:{client:true} })
        if(userType === 'merchant') auth = await authMerchantModel.find({where: { email:email }, relations:{merchant:true} })
        
        if(!auth[0]){
            throw boom.notFound('auth not found')
        }  
        return auth[0]
    },
}

export default authService
