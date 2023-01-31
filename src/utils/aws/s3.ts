import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand,  } from '@aws-sdk/client-s3'
import config from '../../config'
import fs from 'fs'
console.log(config.AWS_BUCKET_REGION)

const client = new S3Client({
    region: config.AWS_BUCKET_REGION,
    credentials:{
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey:config.AWS_SECRET_ACCESS_KEY,
    }
})


export async function uploadFile(file:any){
    const stream = fs.createReadStream(file)
    const uploadParams = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: 'holis.png',
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    const result = await client.send(command)
    console.log(result)
}

export async function getFiles(){
    const command = new ListObjectsCommand({
        Bucket: config.AWS_BUCKET_NAME
    })   
    const result = await client.send(command)
    return result
}

export async function getFile(){
    const command = new GetObjectCommand({
        Bucket: config.AWS_BUCKET_NAME,
        Key:'holis.png'
    })   
    const result = await client.send(command)
    return result 
}

export async function downloadFile(){
    const command = new GetObjectCommand({
        Bucket: config.AWS_BUCKET_NAME,
        Key:'holis.png'
    })   
    const result = await client.send(command)
    if(result.Body){
        // result.Body.transformToWebStream().pipeTo(fs.createWritStream('./downloads/image.png'))
    }
}
