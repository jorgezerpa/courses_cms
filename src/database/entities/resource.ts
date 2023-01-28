import { resourceGone } from "@hapi/boom"
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Lesson } from './lesson'

// a resource will be an url to an -> image, video, file or link to another page

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    label?: string

    @Column()
    url?: string

    @Column({ nullable:true })
    downloadUrl?: string

    @ManyToOne(()=>Lesson, lesson=>lesson.resources, { onDelete:'CASCADE' })
    lesson?:Lesson   
}
