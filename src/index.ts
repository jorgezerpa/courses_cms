import dotenv from "dotenv"
import express, { Application } from "express";
import routerApi from './routes';
import authInit from "./utils/auth";

dotenv.config()

// const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
import { logErrors, errorHandler } from './middlewares/error.handler'

const app:Application = express();
const port:number = 3000;

app.use(express.json()); 
app.use(express.urlencoded({extended:false}))

authInit()
routerApi(app);

app.use(logErrors);
// app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ():void => {
  console.log('app listen in port ' +  port);
});


