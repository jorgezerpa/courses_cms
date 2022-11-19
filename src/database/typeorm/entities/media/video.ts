import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, JoinTable, Relation } from "typeorm"
import { Widget } from "../widget"

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable:false })
    path?: string

    @Column()
    identifier?: string

    @OneToMany(()=>Widget, widget=>widget.video)
    widgets?:Widget[]
}

