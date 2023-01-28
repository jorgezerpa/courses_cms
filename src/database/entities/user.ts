import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Course } from "./course"

@Entity()
export class User {
    @PrimaryColumn()
    id?: string

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
    @OneToMany(()=>Course, (course)=>course.user, { onDelete:"CASCADE", cascade:true })
    courses?: Course[]
}

