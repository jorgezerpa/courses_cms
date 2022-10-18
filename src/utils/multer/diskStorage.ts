import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const name = 'image-'+ uniqueSuffix + getMimeType(file.mimetype)
      req.imagePath = name; 
      cb(null, name)
    }
  })

function getMimeType(dirtMime:string){
    if(dirtMime.includes('jpeg')) return '.jpeg'
    if(dirtMime.includes('jpg')) return '.jpg'
    if(dirtMime.includes('png')) return '.png'
    return 'notAllowed'
}
  
export const upload = multer({ storage: storage })
