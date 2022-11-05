import { v2 as cloudinary } from 'cloudinary'
import boom from '@hapi/boom'

 cloudinary.config({ 
    cloud_name: 'zerpacode', 
    api_key: '841628442169587', 
    api_secret: 'DKPpwy8f5seLqL_hFHxWv7962ho',
    secure: true
  });

export async function uploadFile(img:string){  
    try {
      const result = await cloudinary.uploader.upload(img, { folder: 'products' })
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

