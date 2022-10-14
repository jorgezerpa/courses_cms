import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinTable, JoinColumn, Relation, ManyToMany } from "typeorm"
import { Client } from "./client"
import { Merchant } from "./merchant"
import { Product } from "./product"

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    totalAmount?: number
    
    @OneToOne(() => Client, (client)=>client.cart, { nullable: false, cascade:true })
    @JoinColumn()
    client?: Relation<Client>
    
    @OneToOne(() => Merchant, { nullable: false, cascade:true })
    @JoinColumn()
    merchant?: Relation<Merchant>

    @ManyToMany(()=>Product, (product)=>product.carts, {cascade:true})
    @JoinTable()
    products?:Product[]
}