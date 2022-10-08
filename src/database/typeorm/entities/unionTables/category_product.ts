import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class CategoryProduct {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    categoryId?: number
    
    @Column()
    productId?: number

}