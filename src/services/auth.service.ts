import boom from "@hapi/boom"
import { Auth } from "../database/typeorm/entities/auth"
import { AuthMerchant } from "../database/typeorm/entities"
import AppDataSource from "../database/typeorm"

const authClientModel = AppDataSource.getRepository(Auth)
const authMerchantModel = AppDataSource.getRepository(AuthMerchant)

const authService = {
    findOneByEmail: async function(email: string, userType:string){
        let auth:any
        if(userType === 'client') auth = await authClientModel.findOneBy({email:email})
        if(userType === 'merchant') auth = await authMerchantModel.findOneBy({email:email})
        
        if(!auth){
            throw boom.notFound('auth not found')
        }
        return auth    
    },
}

export default authService
