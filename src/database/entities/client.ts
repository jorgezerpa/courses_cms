import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Course } from "./course"
import { User } from "./user"

@Entity()
export class Client {
    @PrimaryColumn()
    id?: string

    // CLIENT INFO
    @Column()
    firstName?: string

    @Column()
    lastName?: string

    @Column({ unique:true })
    email?: string
    
    @Column()
    phone?: string

    //RELATIONS 
    @OneToMany(()=>User, (client)=>client.clients)
    user?:User
}

