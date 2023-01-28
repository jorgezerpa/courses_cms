import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Section } from './section'
import { Resource } from './resource'

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title?: string

    @Column({ nullable:true })
    video?: string

    @Column({ nullable:true })
    description?: string

    @OneToMany(()=>Resource, (resource)=>resource.lesson, { onDelete:'CASCADE' } )
    resources?: string

    @ManyToOne(()=>Section, section=>section.lessons, { onDelete:'CASCADE' })
    section?:Section   
}
