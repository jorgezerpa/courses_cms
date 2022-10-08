import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    merchantId?: number

    @Column()
    clientId?: number

    @Column()
    totalAmount?: number

}