import boom from "@hapi/boom"
import AppDataSource from "../database/typeorm"
import { Widget } from "../database/typeorm/entities"

const widgetModel = AppDataSource.getRepository(Widget)

const widgetService = {
    find: async function(){
        const widgets = await widgetModel.find()
        if(!widgets) throw boom.notFound('widgets not found')
        return widgets
    },
    findOne: async function(widgetId:number){
        const widget = await widgetModel.findOneBy({ id: widgetId })
        if(!widget) throw boom.notFound('widget not found')
        return widget
    },
    create: async function(widget:Widget){
        const newwidget = await widgetModel.save(widget)
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
