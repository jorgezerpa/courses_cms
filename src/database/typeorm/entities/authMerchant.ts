import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Relation } from "typeorm"
import { Merchant } from "./merchant" 

@Entity()
export class AuthMerchant {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    username?: string

    @Column()
    email?: string
    
    @Column()
    password?: string

    @OneToOne(() => Merchant, (merchant) => merchant.auth)
    @JoinColumn() 
    merchant?: Relation<Merchant>

}