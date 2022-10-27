import express, { Application } from "express"

import clientRouter from './clientRoutes'
import dashboardRouter from './dashboardRoutes'

function routerApi(app:Application) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/client', clientRouter);
  router.use('/dashboard', dashboardRouter);
}


export default routerApi;