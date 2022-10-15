import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne } from "typeorm"

@Entity()
export class Shipping {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    country?:string

    @Column()
    state?:string

    @Column()
    city?:string

    @Column()
    street?:string

    @Column()
    references?:string

    @Column()
    coordinates?:string
}