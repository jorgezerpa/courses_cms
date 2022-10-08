import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firtName?: string

    @Column()
    lastName?: string

    @Column()
    email?: string
    
    @Column()
    phone?: number

}