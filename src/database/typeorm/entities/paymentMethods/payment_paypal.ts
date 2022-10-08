import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class PaymentPaypal {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    userId?: number

    //other columns
}