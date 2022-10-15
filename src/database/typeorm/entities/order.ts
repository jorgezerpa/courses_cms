import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm"
import { Client } from "./client"
import { Merchant } from "./merchant"
import { Product } from "./product"
import { Shipping } from './shipping'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id?: number
    
    @Column()
    paymentMethodId?: string

    @Column()
    totalAmount?: number

    @OneToOne(()=>Shipping, {cascade:true})
    @JoinColumn()
    shipping?:Shipping

    @ManyToOne(() => Client, (client) => client.order)
    client?: Client 

    @ManyToOne(() => Client, (client) => client.order, { onDelete: 'CASCADE' })
    merchant?: Merchant 

    @ManyToMany(() => Product, (product) => product.orders)
    @JoinTable()
    products?: Product[]
}