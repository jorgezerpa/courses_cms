import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Course } from "./course"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number

    // USER INFO
    @Column()
    firstName?: string

    @Column()
    lastName?: string

    @Column({ unique:true })
    email?: string
    
    @Column()
    phone?: string

    //RELATIONS 
    @OneToMany(()=>Course, (course)=>course.user, { onDelete:"CASCADE" })
    courses?: Course[]
}

