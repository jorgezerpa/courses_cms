import boom from "@hapi/boom"
import AppDataSource from "../database/typeorm"
import { Widget, Section, Video, Image, File } from "../database/typeorm/entities"

const widgetModel = AppDataSource.getRepository(Widget)
const sectionModel = AppDataSource.getRepository(Section)
const videoModel = AppDataSource.getRepository(Video)
const imageModel = AppDataSource.getRepository(Image)
const fileModel = AppDataSource.getRepository(File)

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
    create: async function(widget:any, sectionId:number){
        const section = await sectionModel.findOneBy({ id:sectionId })
        if(!section) throw boom.notFound('section not found')
        const widgetToSave = await handleWidgetMediaCreation(widget)
        const newWidget = await widgetModel.save({...widgetToSave, section})
        if(!newWidget) throw boom.internal('can not create widget')
        return newWidget
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


async function handleWidgetMediaCreation(widget:any){
    if(widget.videoId){
        const video = await videoModel.findOneBy({ id:widget.videoId })
        if(!video) throw boom.notFound('video not found')
        widget.video = video
    } 
    if(widget.fileId){
        const file = await fileModel.findOneBy({ id:widget.fileId })
        if(!file) throw boom.notFound('file not found')
        widget.file = file
    } 
    if(widget.imageId){
        const image = await imageModel.findOneBy({ id:widget.imageId })
        if(!image) throw boom.notFound('image not found')
        widget.image = image
    } 
    return widget
}


export default widgetService
