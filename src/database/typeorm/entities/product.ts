import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { Order } from "./order"
import { Category } from "./category"

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
    
    @Column()
    merchantId?: number

    @ManyToMany(() => Order, (order) => order.products)
    orders?: Order[]

    @ManyToMany(() => Category, (category) => category.products)
    categories?: Category[]
}