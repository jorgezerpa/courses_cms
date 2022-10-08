import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    userId?: number

    @Column()
    user?: string
    
    @Column()
    password?: string

}