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


//HANDLE BUCKETS
export async function createBucket(userId:string){
    const bucketName = 'aws-' + Math.random()*10000;
    const command = new CreateBucketCommand({ Bucket: bucketName })
    const result = await client.send(command)
    return { bucketName, result }
}


//HANDLE BUCKET ITEMS
export async function uploadFile(bucketname:string, file:string, extension:string){
    const stream = fs.createReadStream(file)
    const key = bucketname+Math.random()*10000+file+'.'+extension
    const uploadParams = {
        // Bucket: config.AWS_BUCKET_NAME,
        Bucket: bucketname,
        Key: key,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    const result = await client.send(command)
    return { key:key }
}

export async function getFiles(){
    const command = new ListObjectsCommand({
        Bucket: config.AWS_BUCKET_NAME
    })   
    const result = await client.send(command)
    return result
}

export async function getFile(bucketName:string, fileKey:string){
    const toReturn = {}
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


