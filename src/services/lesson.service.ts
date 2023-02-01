import boom from "@hapi/boom"
import AppDataSource from "../database"
import { Section, Lesson, User, Resource } from "../database/entities"
import { uploadFile, deleteFile, getFile } from "../utils/aws/s3"

const userModel = AppDataSource.getRepository(User)
const lessonModel = AppDataSource.getRepository(Lesson)
const sectionModel = AppDataSource.getRepository(Section)
const resourceModel = AppDataSource.getRepository(Resource)

export default {
    async create(userId:string, sectionId:number, lessonData:any){
        const section = await sectionModel.findOne({ where:{ course:{user:{id:userId}}, id: sectionId } })
        if(!section) throw boom.badRequest('section to add lesson not found.')
        const result = await lessonModel.save({ section:section, ...lessonData })
        if(!result) throw boom.badRequest('can not create lesson.')
        return result
    },
    async list(userId:string, sectionId:number){
        const result = await lessonModel.find({ 
            where: { 
                section:{ 
                    id:sectionId, 
                    course:{user:{id:userId}} 
                },
            },
        })
        if(!result) throw boom.internal('can not list lessons.')
        return result
    },
    async listOne(userId:string, lessonId:number){
        const user = await userModel.findOneBy({ id:userId })
        if(!user) throw boom.badRequest('user not found')
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{user:{id:userId}} } } })
        if(!lesson) throw boom.notFound('lesson not found.')
        const lessonToReturn:any = lesson
        if(lesson.video) {
            const result = await getFile(user.s3bucketName as string, lesson.video)
            lessonToReturn.videoURL = result.url
        }
        return lessonToReturn
    },
    async updateOne(userId:string, lessonId:number, data:any){
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{user:{id:userId}} } } })
        if(!lesson) throw boom.notFound('lesson to update not found.')
        const result = await lessonModel.save({ ...lesson, ...data })
        if(!result) throw boom.badRequest('can not update lesson.')
        return result
    },
    async deleteOne(userId:string, lessonId:number){
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{user:{id:userId}} } } })
        if(!lesson) throw boom.badRequest('lesson to delete not found.')
        const result = await lessonModel.remove(lesson)
        return { deletedSectionId: lessonId }
    },
    
    //VIDEOS
    async getVideo(userId:string, lessonId:number){
        const user = await userModel.findOneBy({ id:userId })
        if(!user) throw boom.badRequest('user not found')
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{user:{id:userId}} } }})
        if(!lesson) throw boom.notFound('lesson not found.')
        if(!lesson.video) throw boom.notFound('this lesson do not have a video.')
        const result = await getFile(user.s3bucketName as string, lesson.video)
        return result
    },
    async addVideo(userId:string, lessonId:number, videoPath:string, extension:string){
        const user = await userModel.findOneBy({ id:userId })
        if(!user) throw boom.badRequest('user not found')
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{user:{id:userId}} } } })
        if(!lesson) throw boom.notFound('lesson to add video not found.')
        const s3result = await uploadFile(user.s3bucketName as string, videoPath, extension)
        lesson.video = s3result.key;
        lessonModel.save(lesson)
        return lesson
    },
    async updateVideo(userId:string, lessonId:number, videoPath:string, extension:string){
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
    async removeVideo(userId:string, lessonId:number){
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

    //RESOURCES
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
            return resources
        }
    },
    async addResource(userId:string, lessonId:number, resourcePath:string, extension:string){
        const user = await userModel.findOneBy({ id:userId })
        if(!user) throw boom.badRequest('user not found')
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{user:{id:userId}} } } })
        if(!lesson) throw boom.notFound('lesson to add video not found.')
        const s3result = await uploadFile(user.s3bucketName as string, resourcePath, extension)
        lesson.video = s3result.key;
        lessonModel.save(lesson)
        return lesson
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