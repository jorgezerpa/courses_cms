import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation, OneToMany } from "typeorm"
import { Section } from './section'

@Entity()
export class Program {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable:false })
    name?: string
    
    @Column()
    description?: string

    @OneToMany(()=>Section, (section)=>section.program)
    sections?:Section[]
}