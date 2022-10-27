import express, { Application } from "express"

import paypalRouter from './paypal.router'
import testRouter from './test.router'

const routerClient = express.Router()
  routerClient.use('/paypal', paypalRouter);
  routerClient.use('/test', testRouter);

export default routerClient;