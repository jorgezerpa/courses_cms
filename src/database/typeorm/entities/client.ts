import { Entity, Column, PrimaryGeneratedColumn, OneToOne, Relation } from "typeorm"
import { Cart } from "./cart"


@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firstName?: string

    @Column()
    lastName?: string

    @Column()
    email?: string
    
    @Column()
    phone?: number

    @OneToOne(() => Cart, (cart) => cart.client)
    cart?: Relation<Cart>
}