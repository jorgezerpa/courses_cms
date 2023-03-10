import boom from "@hapi/boom"
import AppDataSource from "../database"
import { Section, Lesson, Resource } from "../database/entities"
import { getUserInfo } from "../utils/auth/auth0"
import { uploadFile, deleteFile, getFile } from "../utils/aws/s3"

const lessonModel = AppDataSource.getRepository(Lesson)
const sectionModel = AppDataSource.getRepository(Section)
const resourceModel = AppDataSource.getRepository(Resource)

export default {
    async addResource(userId:string, lessonId:number, resourceData:any, resourcePath:string, extension:string, token:string){
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{userId:userId} } } })
        if(!lesson) throw boom.notFound('lesson to add resource not found.')
        const user = await getUserInfo(token)
        const s3result = await uploadFile(user.s3ResourcesBucketName as string, resourcePath, extension)
        //add resource data -> { label:String, tag:string }
        const newResource = resourceModel.save({ lesson:lesson, key:s3result.key , ...resourceData })
        return newResource
    },
    async getResources(userId:string, lessonId:number, token:string){
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{userId:userId}}}, relations:{resources:true} })
        if(!lesson) throw boom.notFound('lesson not found.')
        if(!lesson.resources) throw boom.notFound('lesson not have resources.')
        const resources = []
        const user = await getUserInfo(token)
        for await (const resource of lesson.resources) {
            const resourceURL = await getFile(user.s3ResourcesBucketName as string, resource.key as string)
            resources.push({ ...resource, url:resourceURL.url })
        }
        return { resources:resources }
    },
    async updateResource(userId:string, resourceId:number, resourceData:any, resourcePath:string|null, extension:string, token:string){
        const resource = await resourceModel.findOne({ where: { id:resourceId, lesson: {section:{ course:{userId:userId}}}}})
        if(!resource) throw boom.notFound('lesson to add resource not found.')
        if(resourcePath){
            const user = await getUserInfo(token)
            const addToS3Result = await uploadFile(user.s3ResourcesBucketName as string, resourcePath, extension ) 
            await deleteFile(user.s3ResourcesBucketName as string, resource.key as string) 
            resource.key = addToS3Result.key
        }
        const result = resourceModel.save({ ...resource, ...resourceData })
        return result
    },
    async removeResource(userId:string, resourceId:number, token:string){
        const resource = await resourceModel.findOne({ where: { id:resourceId, lesson: {section:{ course:{userId:userId}}}}})
        if(!resource) throw boom.notFound('resource to delete not found.')
        if(!resource.key) throw boom.notFound('this resource do not have any asset.')
        const user = await getUserInfo(token)
        const s3result = await deleteFile(user.s3ResourcesBucketName as string, resource.key)
        resourceModel.remove(resource)
        return { message:'resource '+resource.id+' deleted' }
    },

}