import boom from "@hapi/boom"
import AppDataSource from "../database/typeorm"
import { Section, Program } from "../database/typeorm/entities"

const sectionModel = AppDataSource.getRepository(Section)
const programModel = AppDataSource.getRepository(Program)

const sectionService = {
    find: async function(programId:number){
        const sections = await sectionModel.find({ where: { program: { id:programId } } })
        if(!sections) throw boom.notFound('sections not found')
        return sections
    },
    findOne: async function(sectionId:number){
        const section = await sectionModel.findOneBy({ id: sectionId })
        if(!section) throw boom.notFound('section not found')
        return section
    },
    create: async function(section:Section, programId:number){
        const program = await programModel.findOneBy({ id:programId })
        if(!program) throw boom.notFound('program not found')
        const newSection = await sectionModel.save({...section, program:program})
        if(!newSection) throw boom.internal('can not create section')
        return newSection
    },
    update: async function(sectionId:number, changes:Section){
        const Section = await sectionModel.findOneBy({ id: sectionId })
        if(!Section) throw boom.notFound('Section not found')
        const updatedSection = { ...Section, ...changes }
        const result = await sectionModel.save(updatedSection)
        if(!result) throw boom.internal('can not update Section')
        return result
    },
    delete: async function(sectionId:number){
        const section = await sectionModel.findOneBy({ id: sectionId })
        if(!section) throw boom.notFound('section not found')
        const result = await sectionModel.remove(section)
        if(!result) throw boom.internal('can not delete section')
        return `section ${sectionId} deleted`
    }
}

export default sectionService
