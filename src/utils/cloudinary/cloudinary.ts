import { v2 as cloudinary } from 'cloudinary'
import boom from '@hapi/boom'
import config from '../../config'

 cloudinary.config({ 
    cloud_name: config.CLOUDINARY_NAME, 
    api_key: config.CLOUDINARY_API_KEY, 
    api_secret: config.CLOUDINARY_API_SECRET,
    secure: true
  });

export async function uploadFile(img:string, folder:string){  
    try {
      const result = await cloudinary.uploader.upload(img, { folder: folder })
      return result
    } catch (error:any) {
        throw boom.internal(error)
    }
}

export async function deleteFile(imgId:string){
  try {
    const result = await cloudinary.uploader.destroy(imgId)
    return result
  } catch (error:any) {
    throw boom.internal(error)
  }  
}

export default cloudinary

