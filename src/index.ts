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
app.use(fileUpload({ useTempFiles: true, tempFileDir: './public/uploads' }))

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/test', async(req, res)=>{
  const result = await getFiles()
  console.log(result)
  res.send('im here')
})

app.listen(port, ():void => {
  console.log('app listen in port ' +  port);
});


