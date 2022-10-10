import express, { Application } from "express"

import productsRouter from './products.router'
import categoriesRouter from './categories.router'
import merchantsRouter from './merchants.router'
import clientsRouter from './clients.router'
import authRouter from './auth.router'

function routerApi(app:Application) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/merchants', merchantsRouter);
  router.use('/clients', clientsRouter);
  router.use('/auth', authRouter);
}

export default routerApi;