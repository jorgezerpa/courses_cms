import boom from "@hapi/boom"
import AppDataSource from "../database/typeorm"
import fs from 'fs'
import { Video, Image, File } from "../database/typeorm/entities"

const videoModel = AppDataSource.getRepository(Video)
const imageModel = AppDataSource.getRepository(Image)
const fileModel = AppDataSource.getRepository(File)

const mediaModel = { 'video': videoModel, 'image':imageModel, 'file':fileModel }

const programService = {
    upload: async function(filePath:string, data:Video|Image|File, type:'video'|'image'|'file'){
        const asset = await mediaModel[type].save({ ...data, path:filePath })
        if(!asset) throw boom.badRequest('can not create'+ type + '.')
        return asset
    },
    find: async function(filter:string|null){
        let media: { files?:File[], videos?:Video[], images?:Image[] } = { } 
        if(filter){
            if(filter.includes('files'))  media.files = await fileModel.find()
            if(filter.includes('images')) media.images = await imageModel.find()
            if(filter.includes('videos')) media.videos = await videoModel.find()
            return media
        }
        media.files = await fileModel.find()
        media.images = await imageModel.find()
        media.videos = await videoModel.find()
        return media
    },
    update: async function(assetId:number, type:'video'|'image'|'file', changes:Video|Image|File){
        const asset = await mediaModel[type].findOneBy({ id:assetId })
        if(!asset) throw boom.notFound(type + 'not found')
        const updatedAsset = { ...asset, ...changes }
        const result = mediaModel[type].save(updatedAsset)
        if(changes.path && asset.path) fs.unlink(asset.path, ()=>{})
        return result
    },
    delete: async function(assetId:number, type:'video'|'image'|'file'){
        const asset = await mediaModel[type].findOneBy({ id:assetId })
        //delete file
        if(!asset) throw boom.notFound(type + 'not found')
        if(!asset.path) throw boom.internal('can not delete file. Not path provided')
        fs.unlink(asset.path, ()=>{})
        const result = mediaModel[type].remove(asset)
        if(!result) throw boom.internal('can not delete asset')
        return `${type} ${assetId} deleted`
    }
}

export default programService
