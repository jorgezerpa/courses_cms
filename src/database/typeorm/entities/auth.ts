import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { Client } from "./client"

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    username?: string

    @Column()
    email?: string
    
    @Column()
    password?: string

    @OneToOne(() => Client, (client) => client.auth, { onDelete: 'CASCADE' })
    @JoinColumn() 
    client?: Client

}