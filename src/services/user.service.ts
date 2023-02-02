import boom from "@hapi/boom"
import AppDataSource from "../database"
import { User } from "../database/entities"
import { createBucket } from "../utils/aws/s3"
import random from 'randomstring'

const userModel = AppDataSource.getRepository(User)

export default {
    async create(userData:any){
        //create user
        const randomString = random.generate({charset:'alphanumeric', length:20, capitalization:"lowercase"});
        const newUser = await userModel.save({ s3Identifier:randomString, ...userData })
        if(!newUser) throw boom.badRequest('can not create user.')
        //create s3 buckets
        const bucketVideos = await createBucket(newUser)
        const bucketResources = await createBucket(newUser)
        const bucketUser = await createBucket(newUser)
        //set to user
        newUser.s3VideosBucketName = bucketVideos.bucketName
        newUser.s3ResourcesBucketName = bucketResources.bucketName
        newUser.s3UserBucketName = bucketUser.bucketName
        const newUserWithBucket = await userModel.save(newUser)
        //return data
        return newUserWithBucket
    },
}