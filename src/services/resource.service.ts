import boom from "@hapi/boom"
import AppDataSource from "../database"
import { Section, Lesson, User, Resource } from "../database/entities"
import { uploadFile, deleteFile, getFile } from "../utils/aws/s3"

const userModel = AppDataSource.getRepository(User)
const lessonModel = AppDataSource.getRepository(Lesson)
const sectionModel = AppDataSource.getRepository(Section)
const resourceModel = AppDataSource.getRepository(Resource)

export default {
    async addResource(userId:string, lessonId:number, resourceData:any, resourcePath:string, extension:string){
        const user = await userModel.findOneBy({ id:userId })
        if(!user) throw boom.badRequest('user not found')
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{user:{id:userId}} } } })
        if(!lesson) throw boom.notFound('lesson to add resource not found.')
        const s3result = await uploadFile(user.s3bucketName as string, resourcePath, extension)
        //add resource data -> { label:String, tag:string }
        const newResource = resourceModel.save({ lesson:lesson, key:s3result.key , ...resourceData })
        return newResource
    },
    async getResources(userId:string, lessonId:number){
        const user = await userModel.findOneBy({ id:userId })
        if(!user) throw boom.badRequest('user not found')
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{user:{id:userId}}}}, relations:{resources:true} })
        if(!lesson) throw boom.notFound('lesson not found.')
        if(!lesson.resources) throw boom.notFound('lesson not have resources.')
        const resources = []
        for await (const resource of lesson.resources) {
            const resourceURL = await getFile(user.s3bucketName as string, resource.key as string)
            resources.push({ ...resource, url:resourceURL.url })
            return { resources:resources }
        }
    },
    async updateResource(userId:string, lessonId:number, videoPath:string, extension:string){
        const user = await userModel.findOneBy({ id:userId })
        if(!user) throw boom.badRequest('user not found')
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{user:{id:userId}} } }})
        if(!lesson) throw boom.notFound('lesson to add video not found.')
        if(lesson.video){ // delete from s3 and field
            const s3result = await deleteFile(user.s3bucketName as string, lesson.video)
        }
        const s3result = await uploadFile(user.s3bucketName as string, videoPath, extension)
        lesson.video = s3result.key;
        lessonModel.save(lesson)
        return lesson
    },
    async removeResource(userId:string, lessonId:number){
        const user = await userModel.findOneBy({ id:userId })
        if(!user) throw boom.badRequest('user not found')
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{user:{id:userId}} } }})
        if(!lesson) throw boom.notFound('lesson to add video not found.')
        if(!lesson.video) throw boom.notFound('this lesson do not have a video to delete.')
        const s3result = await deleteFile(user.s3bucketName as string, lesson.video)
        lesson.video = null;
        lessonModel.save(lesson)
        return lesson
    },

}