import boom from "@hapi/boom"
import AppDataSource from "../database/typeorm"
import { Widget, Section } from "../database/typeorm/entities"

const widgetModel = AppDataSource.getRepository(Widget)
const sectionModel = AppDataSource.getRepository(Section)

const widgetService = {
    find: async function(sectionId:number){
        const widgets = await widgetModel.find({ where: { section: { id: sectionId } } })
        if(!widgets) throw boom.notFound('widgets not found')
        return widgets
    },
    findOne: async function(widgetId:number){
        const widget = await widgetModel.findOneBy({ id: widgetId })
        if(!widget) throw boom.notFound('widget not found')
        return widget
    },
    create: async function(widget:Widget, sectionId:number){
        const section = await sectionModel.findOneBy({ id:sectionId })
        if(!section) throw boom.notFound('section not found')
        const newwidget = await widgetModel.save({...widget, section})
        if(!newwidget) throw boom.internal('can not create widget')
        return newwidget
    },
    update: async function(widgetId:number, changes:Widget){
        const widget = await widgetModel.findOneBy({ id: widgetId })
        if(!widget) throw boom.notFound('widget not found')
        const updatedwidget = { ...widget, ...changes }
        const result = await widgetModel.save(updatedwidget)
        if(!result) throw boom.internal('can not update widget')
        return result
    },
    delete: async function(widgetId:number){
        const widget = await widgetModel.findOneBy({ id: widgetId })
        if(!widget) throw boom.notFound('widget not found')
        const result = await widgetModel.remove(widget)
        if(!result) throw boom.internal('can not delete widget')
        return `widget ${widgetId} deleted`
    }
}

export default widgetService
