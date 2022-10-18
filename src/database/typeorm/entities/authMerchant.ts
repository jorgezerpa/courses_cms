import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, Relation } from "typeorm"
import { Merchant } from "./merchant" 

@Entity()
export class AuthMerchant {
    @PrimaryColumn()
    id?: number

    @Column()
    email?: string

    @Column()   
    recoveryToken?: string
    
    @Column()
    password?: string
    @OneToOne(() => Merchant, (merchant) => merchant.auth, { onDelete:"CASCADE" })
    @JoinColumn() 
    merchant?: Relation<Merchant>

}