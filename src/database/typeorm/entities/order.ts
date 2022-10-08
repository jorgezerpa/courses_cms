import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Client } from "./client"
import { Merchant } from "./merchant"
import { Product } from "./product"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id?: number
    
    @Column()
    paymentMethodId?: number

    @Column()
    totalAmount?: number

    @ManyToOne(() => Client, (client) => client.order)
    client?: Client 

    @ManyToOne(() => Client, (client) => client.order)
    merchant?: Merchant 

    @ManyToMany(() => Product, (product) => product.orders)
    @JoinTable()
    products?: Product[]
}