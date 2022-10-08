import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ClientPayment {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    clientId?: number
    
    @Column()
    paymentId?: number

}