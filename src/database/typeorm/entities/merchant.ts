import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, JoinTable, Relation } from "typeorm"
import { AuthMerchant } from "./authMerchant"
import { Category } from "./category"
import { PaymentMethod } from "./paypmentMethod"
import { Product } from "./product"
import { Order } from "./order"

@Entity()
export class Merchant {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firstName?: string

    @Column()
    lastName?: string

    @Column({ unique:true })
    email?: string
    
    @Column()
    phone?: string

    @OneToOne(() => AuthMerchant, (authMerchant) => authMerchant.merchant, {cascade:true})
    auth?: Relation<AuthMerchant> 
    
    @OneToMany(() => Order, (order) => order.merchant)
    orders?: Relation<Order[]>

    @ManyToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.merchants, {cascade:true})
    @JoinTable()
    paymentMethods?: PaymentMethod[]

    @OneToMany(() => Category, (category) => category.merchant)
    categories?: Category[]

    @OneToMany(() => Product, (product) => product.merchant)
    products?: Product[]

}

