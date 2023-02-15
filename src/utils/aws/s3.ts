import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand, CreateBucketCommand, DeleteObjectCommand  } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import config from '../../config'
import fs from 'fs'

const client = new S3Client({
    region: config.AWS_BUCKET_REGION,
    credentials:{
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey:config.AWS_SECRET_ACCESS_KEY,
    },
})

/* ---------------------------------------------
                HANDLE BUCKETS
   -------------------------------------------- */ 
   //function called when create a new user
// export async function createBucket(user:User){
//     const bucketName = user.s3Identifier as string + "-" + Date.now();
//     const command = new CreateBucketCommand({ Bucket: bucketName })
//     const result = await client.send(command)
//     return { bucketName, result }
// }


/* ---------------------------------------------
                HANDLE BUCKETS' FILES
   -------------------------------------------- */ 
export async function uploadFile(bucketname:string, file:string, extension:string){
    const stream = fs.createReadStream(file)
    const key = bucketname+Math.random()*10000+file+'.'+extension
    const uploadParams = {
        Bucket: bucketname,
        Key: key,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    const result = await client.send(command)
    return { key:key }
}

//TODO --> IMPLEMENT THIS FOR FETCH JUST VIDEOS OR JUST RESOURCES --> USE TAGS?
// export async function getFiles(bucketName:string, fileKey:string){
//     const command = new ListObjectsCommand({
//         Bucket: bucketName,
        
//     })   
//     const result = await client.send(command)
//     return result
// }

export async function getFile(bucketName:string, fileKey:string){
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key:fileKey,
    })   
    const fileMetadata = await client.send(command)
    const url = await getSignedUrl(client, command, { expiresIn: 3600 })
    return { url:url, metadata: fileMetadata.$metadata }
}

export async function deleteFile(bucketName:string, fileKey:string ){
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key:fileKey,
    })   
    const result = await client.send(command)
    return result 
}


