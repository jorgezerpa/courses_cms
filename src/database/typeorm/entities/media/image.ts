import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, JoinTable, Relation } from "typeorm"
import { Widget } from "../widget"

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ nullable:false })
    path?: string

    @Column()
    identifier?: string

    @Column()
    name?: string

    @OneToMany(()=>Widget, widget=>widget.image)
    widgets?:Widget[]
}

