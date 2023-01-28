import boom from "@hapi/boom"
import AppDataSource from "../database"
import { Section, Lesson } from "../database/entities"

const lessonModel = AppDataSource.getRepository(Lesson)
const sectionModel = AppDataSource.getRepository(Section)

export default {
    async create(userId:string, sectionId:number, lessonData:any){
        const section = sectionModel.findOne({ where:{ course:{user:{id:userId}}, id: sectionId } })
        if(!section) throw boom.badRequest('section to add lesson not found.')
        const result = await lessonModel.create({ section:section, ...lessonData })
        if(!result) throw boom.badRequest('can not create lesson.')
        return result
    },
    async list(userId:string, sectionId:number){
        const result = await lessonModel.find({ 
            where: { 
                section:{ 
                    id:sectionId, 
                    course:{user:{id:userId}} 
                } 
            }
        })
        if(!result) throw boom.internal('can not list lessons.')
        return result
    },
    async listOne(userId:string, lessonId:number){
        const lesson = await lessonModel.findOne({ where: { id:lessonId, section:{ course:{user:{id:userId}} } } })
        if(!lesson) throw boom.notFound('lesson not found.')
        return lesson
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
}