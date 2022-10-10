import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, Relation, ManyToMany, JoinTable } from "typeorm"
import { Cart } from "./cart"
import { Order } from "./order"
import { Auth } from "./auth"
import { PaymentMethod } from "./paypmentMethod"

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    username?: string

    @Column()
    firstName?: string

    @Column()
    lastName?: string

    @Column()
    email?: string
    
    @Column()
    phone?: string

    @OneToOne(() => Cart, (cart) => cart.client)
    cart?: Relation<Cart>

    @OneToMany(() => Order, (order) => order.client) 
    order?: Order[]

    @OneToOne(() => Auth, (auth) => auth.client, { cascade:true})
    auth?: Auth 

    @ManyToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.clients)
    @JoinTable()
    paymentMethods?: PaymentMethod[]
}