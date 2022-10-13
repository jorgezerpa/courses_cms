import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, JoinTable, Relation } from "typeorm"
import { AuthMerchant } from "./authMerchant"
import { Order } from "./order"
import { PaymentMethod } from "./paypmentMethod"

@Entity()
export class Merchant {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firstName?: string

    @Column()
    lastName?: string

    @Column({unique:true})
    username?: string

    @Column({unique:true})
    email?: string
    
    @Column()
    phone?: string

    @OneToOne(() => AuthMerchant, (authMerchant) => authMerchant.merchant,  { cascade: true })
    auth?: Relation<AuthMerchant> 

    @OneToMany(() => Order, (order) => order.merchant, { cascade: true }) 
    order?: Order[]

    @ManyToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.merchants, {cascade:true})
    @JoinTable()
    paymentMethods?: PaymentMethod[]
}