import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { Merchant } from "./merchant"

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string
    
    @ManyToMany(() => Merchant, (merchant) => merchant.paymentMethods, {onDelete: 'CASCADE'})
    merchants?: Merchant[]
}