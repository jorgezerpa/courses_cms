import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Section } from './section'
import { User } from './user'

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable:false })
    name?: string
    
    @Column()
    description?: string

    // RELATIONS
    @ManyToOne(()=>User, (user)=>user.courses)
    user?: User
    
    @OneToMany(()=>Section, (section)=>section.course, { onDelete:'CASCADE', cascade:true })
    sections?:Section[]

}