import { Entity, Column, PrimaryGeneratedColumn, Relation, ManyToOne } from "typeorm"
import { AuthMerchant } from "./authMerchant"
import { Merchant } from "./merchant"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id?: number

    @ManyToOne(() => Merchant, (merchant) => merchant.orders)
    merchant?: Relation<AuthMerchant> 

    @Column()
    state?:string

    @Column({ type:'text' })
    order?: string
}

