import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable } from "typeorm"
import { Product } from './product'
import { Merchant } from './merchant'

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({ default: 0 })
    totalAmmount?: number
    
    @ManyToMany(() => Product, { onDelete:'CASCADE'})
    @JoinTable()
    products?: Product[]

    @ManyToOne(()=> Merchant, { nullable:false })
    merchant?: Merchant
}
