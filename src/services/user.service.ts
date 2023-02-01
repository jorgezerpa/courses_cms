import boom from "@hapi/boom"
import AppDataSource from "../database"
import { User } from "../database/entities"
import { createBucket } from "../utils/aws/s3"

const userModel = AppDataSource.getRepository(User)

export default {
    async create(userData:any){
        //create user
        const newUser = await userModel.save({ ...userData })
        if(!newUser) throw boom.badRequest('can not create user.')
        //create s3 bucket
        const bucketResult = await createBucket(newUser.id)
        //set to user
        newUser.s3bucketName = bucketResult.bucketName
        const newUserWithBucket = await userModel.save(newUser)
        //return data
        return newUserWithBucket
    },
}