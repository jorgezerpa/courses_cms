import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm"
import { Product } from "./product"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?:string

    @Column()
    description?: string

    @ManyToMany(() => Product, (product) => product.categories)
    @JoinTable()
    products?: Product[]
}