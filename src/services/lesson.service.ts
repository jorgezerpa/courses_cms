import boom from "@hapi/boom"
import AppDataSource from "../database"
import { Section, Lesson, Resource } from "../database/entities"
import { getUserInfo } from "../utils/auth/auth0"
import { uploadFile, deleteFile, getFile } from "../utils/aws/s3"

const lessonModel = AppDataSource.getRepository(Lesson)
const sectionModel = AppDataSource.getRepository(Section)
const resourceModel = AppDataSource.getRepository(Resource)

export default {
    async create(userId:string, sectionId:number, lessonData:any){
        const section = await sectionModel.findOne({ where:{ course:{userId:userId}, id: sectionId } })
        if(!section) throw boom.badRequest('section to add lesson not found.')
        const result = await lessonModel.save({ section:section, ...lessonData })
        if(!result) throw boom.badRequest('can not create lesson.')
        return result
    },
    async list(userId:string, sectionId:number){
        const section = await sectionModel.findOneBy({id:sectionId, course:{userId:userId}})
        if(!section) throw boom.badRequest('section to fetch lesson does not exists.')
        const result = await lessonModel.find({ 
            where: { 
                section:{ 
                    id:sectionId, 
                    course:{userId:userId} 
                },
            },
        })
        if(!result) throw boom.internal('can not list lessons.')
        return result
    },
    async listOne(userId:string, lessonId:number, token:string){
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{userId:userId} } } })
        if(!lesson) throw boom.notFound('lesson not found.')
        const lessonToReturn:any = lesson
        if(lesson.video) {
            const user = await getUserInfo(token)
            const result = await getFile(user.s3VideosBucketName as string, lesson.video)
            lessonToReturn.videoURL = result.url
        }
        return lessonToReturn
    },
    async updateOne(userId:string, lessonId:number, data:any){
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{userId:userId} } } })
        if(!lesson) throw boom.notFound('lesson to update not found.')
        const result = await lessonModel.save({ ...lesson, ...data })
        if(!result) throw boom.badRequest('can not update lesson.')
        return result
    },
    async deleteOne(userId:string, lessonId:number){
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{userId:userId} } } })
        if(!lesson) throw boom.badRequest('lesson to delete not found.')
        const result = await lessonModel.remove(lesson)
        return { deletedSectionId: lessonId }
    },
    
    //VIDEOS
    async getVideo(userId:string, lessonId:number, token:string){
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{userId:userId} } }})
        if(!lesson) throw boom.notFound('lesson not found.')
        if(!lesson.video) throw boom.notFound('this lesson do not have a video.')
        const user = await getUserInfo(token)
        const result = await getFile(user.s3VideosBucketName as string, lesson.video)
        return { video:lesson }
    },
    async addVideo(userId:string, lessonId:number, videoPath:string, extension:string, token:string){
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{userId:userId} } } })
        if(!lesson) throw boom.notFound('lesson to add video not found.')
        const user = await getUserInfo(token)
        const s3result = await uploadFile(user.s3VideosBucketName as string, videoPath, extension)
        lesson.video = s3result.key;
        lessonModel.save(lesson)
        return { lesson:lesson }
    },
    async updateVideo(userId:string, lessonId:number, videoPath:string, extension:string, token:string){
        const user = await getUserInfo(token)
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{userId:userId} } }})
        if(!lesson) throw boom.notFound('lesson not found.')
        if(lesson.video){ // delete from s3 and field
            const s3result = await deleteFile(user.s3VideosBucketName as string, lesson.video)
        }
        const s3result = await uploadFile(user.s3VideosBucketName as string, videoPath, extension)
        lesson.video = s3result.key;
        lessonModel.save(lesson)
        return { lesson:lesson }
    },
    async removeVideo(userId:string, lessonId:number, token:string){
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{userId:userId} } }})
        if(!lesson) throw boom.notFound('lesson to delete video not found.')
        if(!lesson.video) throw boom.notFound('this lesson do not have a video to delete.')
        const user = await getUserInfo(token)
        const s3result = await deleteFile(user.s3VideosBucketName as string, lesson.video)
        lesson.video = null;
        lessonModel.save(lesson)
        return { lesson:lesson }
    },
}