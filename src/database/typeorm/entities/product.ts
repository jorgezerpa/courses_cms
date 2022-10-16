import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm"
import { Category } from "./category"
import { Merchant } from "./merchant"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string

    @Column()
    description?: string

    @Column()
    price?: number

    @Column()
    quantity?: string

    @ManyToMany(() => Category, (category) => category.products)
    categories?: Category[]

    @ManyToOne(() => Merchant, (merchant) => merchant.products, {cascade:true, onDelete:'CASCADE'})
    merchant?: Merchant
}