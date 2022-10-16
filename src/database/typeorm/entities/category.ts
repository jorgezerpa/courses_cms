import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, Relation } from "typeorm"
import { Merchant } from "./merchant"
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

    @ManyToOne(() => Merchant, (merchant) => merchant.categories, {cascade:true, onDelete:'CASCADE'})
    merchant?:Merchant
}