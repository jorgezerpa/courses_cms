import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Section } from './section'

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable:false })
    name?: string
    
    @Column()
    description?: string
    
    @Column()
    userId?: string //owner id | this is the id that user has on auth0

    // RELATIONS
    
    @OneToMany(()=>Section, (section)=>section.course, { onDelete:'CASCADE', cascade:true })
    sections?:Section[]

}