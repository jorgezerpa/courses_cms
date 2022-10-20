import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToMany, JoinTable, Relation } from "typeorm"
import { AuthMerchant } from "./authMerchant"
import { Category } from "./category"
import { PaymentMethod } from "./paypmentMethod"
import { Product } from "./product"

@Entity()
export class Merchant {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firstName?: string

    @Column()
    lastName?: string

    @Column()
    email?: string
    
    @Column()
    phone?: string

    @OneToOne(() => AuthMerchant, (authMerchant) => authMerchant.merchant)
    auth?: Relation<AuthMerchant> 

    @ManyToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.merchants, {cascade:true})
    @JoinTable()
    paymentMethods?: PaymentMethod[]

    @OneToMany(() => Category, (category) => category.merchant)
    categories?: Category[]

    @OneToMany(() => Product, (product) => product.merchant)
    products?: Product[]

}

