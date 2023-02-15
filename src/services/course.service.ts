import boom from "@hapi/boom"
import AppDataSource from "../database"
import { Course } from "../database/entities"

const courseModel = AppDataSource.getRepository(Course)

export default {
    async create(userId:string, courseData:any){
        const result = await courseModel.save({...courseData, userId:userId })
        if(!result) throw boom.badRequest('can not create course.')
        return result
    },
    async list(userId:string, filter:any){
        const result = await courseModel.find({ where: {userId:userId, ...filter } })
        if(!result) throw boom.internal('can not list courses.')
        return result
    },
    async listOne(userId:string, courseId:number){
        const result = await courseModel.findOne({ where: { userId:userId, id:courseId } })
        if(!result) throw boom.notFound('course not found.')
        return result
    },
    async updateOne(userId:string, courseId:number, data:any){
        const course = await courseModel.findOne({ where: { userId:userId, id:courseId } })
        if(!course) throw boom.notFound('course to update not found.')
        const result = await courseModel.save({ ...course, ...data })
        if(!result) throw boom.badRequest('can not update course.')
        return result
    },
    async deleteOne(userId:string, courseId:number){
        const course = await courseModel.findOne({ where: { userId:userId, id:courseId } })
        if(!course) throw boom.badRequest('course to delete not found.')
        const result = await courseModel.remove(course)
        return { deletedCourseId: courseId }
    },
}