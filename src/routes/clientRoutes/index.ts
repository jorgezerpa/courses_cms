import express, { Application } from "express"

import paypalRouter from './paypal.router'
import testRouter from './orders.router'

const routerClient = express.Router()
  routerClient.use('/paypal', paypalRouter);
  routerClient.use('/orders', testRouter);

export default routerClient;