import boom from "@hapi/boom"
import AppDataSource from "../database/typeorm"
import { Program } from "../database/typeorm/entities"

const programModel = AppDataSource.getRepository(Program)

const programService = {
    find: async function(){
        const programs = await programModel.find()
        if(!programs) throw boom.notFound('programs not found')
        return programs
    },
    findOne: async function(programId:number){
        const program = await programModel.findOne({ where:{ id: programId }})
        if(!program) throw boom.notFound('program not found')
        return program
    },
    create: async function(program:Program){
        const newProgram = await programModel.save(program)
        if(!newProgram) throw boom.internal('can not create program')
        return newProgram
    },
    update: async function(programId:number, changes:Program){
        const program = await programModel.findOneBy({ id: programId })
        if(!program) throw boom.notFound('program not found')
        const updatedProgram = { ...program, ...changes }
        const result = await programModel.save(updatedProgram)
        if(!result) throw boom.internal('can not update program')
        return result
    },
    delete: async function(programId:number){
        const program = await programModel.findOneBy({ id: programId })
        if(!program) throw boom.notFound('program not found')
        const result = await programModel.remove(program)
        if(!result) throw boom.internal('can not delete program')
        return `program ${programId} deleted`
    }
}

export default programService
