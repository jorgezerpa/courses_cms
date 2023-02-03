import boom from "@hapi/boom"
import AppDataSource from "../database"
import { Client } from "../database/entities"

const clientModel = AppDataSource.getRepository(Client)

export default {
    async create(clientData:any){
        const newClient = await clientModel.save({ ...clientData })
        if(!newClient) throw boom.badRequest('can not create client.')
        return newClient
    },
}