import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { Client } from "./client"
import { Merchant } from "./merchant"

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string

    @ManyToMany(() => Client, (client) => client.paymentMethods)
    clients?: Client[]
    
    @ManyToMany(() => Merchant, (merchant) => merchant.paymentMethods, {onDelete: 'CASCADE'})
    merchants?: Merchant[]
}