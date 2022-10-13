import boom from "@hapi/boom"
import { Client } from "../database/typeorm/entities/client"
import { Auth } from "../database/typeorm/entities"
import AppDataSource from "../database/typeorm"
import encrypt from "../utils/bcrypt"

const clientModel = AppDataSource.getRepository(Client)


const clientService = {
    get: async function(){
        const result = await clientModel.find()
        if(result.length <= 0){
            throw boom.notFound("not client created")
        }
        return result
    },
    findOne: async function(clientId: number){
        const client = await clientModel.findOneBy({id:clientId})
        if(!client){
            throw boom.notFound('client not found')
        }
        return client    
    },
    create: async function(data: Client, password:string){
        const client = new Client()
        client.lastName = data.lastName;
        client.firstName = data.firstName;
        client.email = data.email;
        client.phone = data.phone;
        client.username = data.username;
        
        const auth = new Auth()
        auth.password = await encrypt.hashPassword(password);
        auth.email = data.email;
        auth.username = data.username;

        client.auth = auth

        const newClient = await clientModel.save(client)
        if(!newClient){
            throw boom.badRequest('Can not create the client')
        }
        delete newClient.auth
        return newClient
    },
    update: async function(clientId:number, changes: any){
        const clientToUpdate = await clientModel.findOneBy({id:clientId})
        if(!clientToUpdate){
            throw boom.notFound('client to update not found')
        }
        const newClient = { ...clientToUpdate, ...changes }
        const result = await clientModel.save(newClient)
        return result 
    },
    delete: async function(clientId:number){
        const client = await clientModel.findOneBy({id:clientId})
        if(!client){
            throw boom.notFound('client to delete not found')
        }
        await clientModel.remove(client)
        return { clientId }
    }
}

export default clientService
