import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation } from "typeorm"
import { Client } from "./client"

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    merchantId?: number

    @Column()
    totalAmount?: number
    
    @OneToOne(() => Client, (client)=>client.cart)
    @JoinColumn()
    client?: Relation<Client>
}