import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation, OneToMany, ManyToOne } from "typeorm"
import { Program } from "./program"
import { Widget } from './widget'

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable:false })
    name?: string
    
    @Column()
    coverImage?: string
    
    @Column()
    description?: string
    
    @Column()
    widgetsOrder?: string //arr with widgets order (stringyfied)
    
    @Column({ nullable:false })
    type?: string
    
    @OneToMany(()=>Widget, (widget)=>widget.section)
    widgets?:Widget[]

    @ManyToOne(()=>Program, (program)=>program.sections, { onDelete:'CASCADE' })
    program?:Program
}