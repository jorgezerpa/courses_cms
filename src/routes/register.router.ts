import express, { Router, Response, Request, NextFunction } from 'express'
import { handleResponse } from '../responses/response';
import { createBucket } from '../utils/aws/s3'

const router = express.Router();

router.post('/origin', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const { s3VideosBucketName, s3ResourcesBucketName } = req.body
        const videosBucketResult = await createBucket(s3VideosBucketName)
        const resourceBucketResult = await createBucket(s3ResourcesBucketName)
        handleResponse(res, 201, 'Bucket created', { 
                s3VideosBucketName:videosBucketResult.bucketName,  
                s3ResourcesBucketName: resourceBucketResult.bucketName,
            }
        )
    } catch (error) {
        next(error)
    }
})

export default router;
