import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation, OneToMany, ManyToOne } from "typeorm"
import { Course } from "./course"
import { Lesson } from './lesson'

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable:false })
    name?: string
    
    @Column()
    description?: string
    
    @Column({ nullable:false })
    type?: string
    
    //RELATIONS
    @ManyToOne(()=>Course, (course)=>course.sections, { onDelete:'CASCADE' })
    course?:Course

    @OneToMany(()=>Lesson, (lesson)=>lesson.section, { onDelete:'CASCADE' })
    lessons?:Lesson[]

}