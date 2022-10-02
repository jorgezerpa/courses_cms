import express, { Application } from "express";
import routerApi from './routes';

// const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app:Application = express();
const port:number = 3000;

app.use(express.json());


routerApi(app);

// app.use(logErrors);
// app.use(boomErrorHandler);
// app.use(errorHandler);

app.listen(port, ():void => {
  console.log('app listen in port' +  port);
});