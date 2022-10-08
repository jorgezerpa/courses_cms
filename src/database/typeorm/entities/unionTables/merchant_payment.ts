import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class MerchantPayment {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    merchantId?: number
    
    @Column()
    paymentId?: number

}