import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    merchantId?: number

    @Column()
    clientId?: number

    @Column()
    paymentMethodId?: number

    @Column()
    totalAmount?: number

}