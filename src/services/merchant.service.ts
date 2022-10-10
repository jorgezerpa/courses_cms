import boom from "@hapi/boom"
import { Merchant } from "../database/typeorm/entities/merchant"
import { AuthMerchant as Auth } from "../database/typeorm/entities"
import AppDataSource from "../database/typeorm"
import { hashPassword } from "../libs/bcrypt/hash-password"

const merchantModel = AppDataSource.getRepository(Merchant)
// const authModel = AppDataSource.getRepository(Auth)

const merchantService = {
    get: async function(){
        const result = await merchantModel.find()
        if(result.length <= 0){
            throw boom.notFound("not merchant created")
        }
        return result
    },
    findOne: async function(merchantId: number){
        const merchant = await merchantModel.findOneBy({id:merchantId})
        if(!merchant){
            throw boom.notFound('merchant not found')
        }
        return merchant    
    },
    create: async function(data: Merchant, password:string){
        const merchant = new Merchant()
        merchant.lastName = data.lastName;
        merchant.firstName = data.firstName;
        merchant.email = data.email;
        merchant.phone = data.phone;
        merchant.username = data.username;
        
        const auth = new Auth()
        auth.password = await hashPassword(password);
        auth.email = data.email;
        auth.username = data.username;

        merchant.auth = auth

        const newMerchant = await merchantModel.save(merchant)
        if(!newMerchant){
            throw boom.badRequest('Can not create the merchant')
        }
        return newMerchant
    },
    update: async function(merchantId:number, changes: any){
        const merchantToUpdate = await merchantModel.findOneBy({id:merchantId})
        if(!merchantToUpdate){
            throw boom.notFound('merchant to update not found')
        }
        const newMerchant = { ...merchantToUpdate, ...changes }
        const result = await merchantModel.save(newMerchant)
        return result 
    },
    delete: async function(merchantId:number){
        const merchant = await merchantModel.findOneBy({id:merchantId})
        if(!merchant){
            throw boom.notFound('merchant to delete not found')
        }
        await merchantModel.remove(merchant)
        return { merchantId }
    }
}

export default merchantService
