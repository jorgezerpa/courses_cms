import { resourceGone } from "@hapi/boom"
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Lesson } from './lesson'

// a resource will be an url or key to an -> image, video, file or link to another page

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable:true })
    label?: string

    @Column()
    key?: string

    @Column()
    tag?: string

    @ManyToOne(()=>Lesson, lesson=>lesson.resources, { onDelete:'CASCADE' })
    lesson?:Lesson   
}
