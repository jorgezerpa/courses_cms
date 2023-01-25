import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Section } from './section'

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable:false })
    title?: string

    @Column()
    video?: string

    @Column()
    description?: string

    @Column()
    resources?: string

    @ManyToOne(()=>Section, section=>section.lessons, { onDelete:'CASCADE' })
    section?:Section   
}
