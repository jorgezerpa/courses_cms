import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { Order } from "./order"
import { Category } from "./category"
import { Cart } from "./cart"

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

    @ManyToMany(()=>Cart, (cart)=>cart.products)
    carts?:Cart
}