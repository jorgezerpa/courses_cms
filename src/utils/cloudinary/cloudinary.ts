import { v2 as cloudinary } from 'cloudinary'

 cloudinary.config({ 
    cloud_name: 'zerpacode', 
    api_key: '841628442169587', 
    api_secret: 'DKPpwy8f5seLqL_hFHxWv7962ho',
    secure: true
  });

export async function uploadFile(img:string){  
    const result = await cloudinary.uploader.upload(img, { folder: 'products' })
    return result
}

export async function deleteFile(imgId:string){  
    const result = await cloudinary.uploader.destroy(imgId)
    return result
}

export default cloudinary

