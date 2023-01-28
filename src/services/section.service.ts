import boom from "@hapi/boom"
import AppDataSource from "../database"
import { Section, Course } from "../database/entities"

const courseModel = AppDataSource.getRepository(Course)
const sectionModel = AppDataSource.getRepository(Section)

export default {
    async create(userId:string, courseId:number, sectionData:any){
        //get course and set is a as prop on course cretion. This is to maintain relation 
        const course = courseModel.findOne({ where:{ user:{id:userId}, id: courseId } })
        if(!course) throw boom.badRequest('course to add section not found.')
        const result = await sectionModel.create({ course:course, ...sectionData })
        if(!result) throw boom.badRequest('can not create section.')
        return result
    },
    async list(userId:string, courseId:number){
        const result = await sectionModel.find({ where: { course: { id:courseId }  }})
        if(!result) throw boom.internal('can not list sections.')
        return result
    },
    async listOne(userId:string, sectionId:number){
        const result = await sectionModel.findOne({ where: { id:sectionId, course:{ user: { id:userId } } } })
        if(!result) throw boom.notFound('section not found.')
        return result
    },
    async updateOne(userId:string, sectionId:number, data:any){
        const section = await sectionModel.findOne({ where: { id:sectionId, course:{ user: { id:userId } } } })
        if(!section) throw boom.notFound('section to update not found.')
        const result = await sectionModel.save({ ...section, ...data })
        if(!result) throw boom.badRequest('can not update section.')
        return result
    },
    async deleteOne(userId:string, sectionId:number){
        const section = await sectionModel.findOne({ where: { id:sectionId, course:{ user: { id:userId } } } })
        if(!section) throw boom.badRequest('section to delete not found.')
        const result = await sectionModel.remove(section)
        return { deletedSectionId: sectionId }
    },
}