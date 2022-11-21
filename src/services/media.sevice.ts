import boom from "@hapi/boom"
import AppDataSource from "../database/typeorm"
import { Video, Image, File } from "../database/typeorm/entities"

const videoModel = AppDataSource.getRepository(Video)
const imageModel = AppDataSource.getRepository(Image)
const fileModel = AppDataSource.getRepository(File)

const programService = {
    upload: async function(filePath:string, data:Video|Image|File, type:string){
        let newAsset
        if(type==='video') newAsset = videoModel.save({ ...data, path:filePath })
        if(type==='image') newAsset = imageModel.save({ ...data, path:filePath })
        if(type==='file') newAsset = fileModel.save({ ...data, path:filePath })
        if(!newAsset) throw boom.badRequest('can not create asset')
        return newAsset
    },
    findOne: async function(programId:number){

    },
    create: async function(){

    },
    update: async function(programId:number){

    },
    delete: async function(programId:number){

    }
}

export default programService
