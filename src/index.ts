import dotenv from 'dotenv'
import express, { Application } from "express";
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import routerApi from './routes';
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler'
import { uploadFile, getFiles, getFile } from './utils/aws/s3'

dotenv.config()

const app:Application = express();
const port = process.env.PORT || 3000;

app.use(cors({credentials:true})) 
app.use(express.json({limit: '50mb'})) 
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(fileUpload({ useTempFiles: true, tempFileDir: './uploads' }))

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/uploadfile', async(req, res)=>{
  await uploadFile('./public/images/navbarIcon')
  res.send('works')
})

app.get('/getFiles', async(req, res)=>{
  const files = await getFiles()
  res.json({result:files})
})

app.get('/getFile', async(req, res)=>{
  const file = await getFile()
  console.log(file)
  // res.send('testing')
  // return
  res.json(file.$metadata)
})

app.listen(port, ():void => {
  console.log('app listen in port ' +  port);
});


