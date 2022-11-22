import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const mimetype = file.mimetype.split('/')[1]
        const basePath = path.join(path.resolve(), 'public')
        const subfolder = req.body.subfolder || ''
        if(mimetype === 'mp4'){
            cb(null, path.join(basePath, 'videos', subfolder))
            req.query.type='video'
        }
        if(mimetype === 'jpg' || mimetype === 'png' || mimetype === 'jpeg'){
            cb(null, path.join(basePath, 'images', subfolder))
            req.query.type='image'
        }
        if(mimetype === 'pdf'){
            cb(null, path.join(basePath, 'files', subfolder))
            req.query.type='file'
        }
    },
    filename: function (req, file, cb) {
        const mimetype = file.mimetype.split('/')[1]
      const uniqueSuffix = Date.now() + '-'
      cb(null, uniqueSuffix+'.'+mimetype)
    }
  })
  

  const upload = multer({ storage: storage })

  export default upload