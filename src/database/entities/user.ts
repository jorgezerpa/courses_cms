import { Entity, Column, PrimaryColumn, OneToMany, Generated } from "typeorm"
import { Client } from "./client"
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
    
    //this goes at the start of each s3 bucket name. Make easy to find the user´s buckets by name in lost case
    @Column({nullable:false})
    s3Identifier?: string
    
    @Column({ nullable:true })
    s3VideosBucketName?: string

    @Column({ nullable:true })
    s3ResourcesBucketName?: string
    
    @Column({ nullable:true })
    s3UserBucketName?: string

    //RELATIONS 
    @OneToMany(()=>Course, (course)=>course.user, { onDelete:"CASCADE", cascade:true })
    courses?: Course[]

    @OneToMany(()=>Client, (client)=>client.user)
    clients?:Client
}

