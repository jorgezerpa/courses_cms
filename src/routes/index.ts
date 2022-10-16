import express, { Application } from "express"

import productsRouter from './products.router'
import categoriesRouter from './categories.router'
import merchantsRouter from './merchants.router'
import authRouter from './auth.router'

function routerApi(app:Application) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/product', productsRouter);
  router.use('/category', categoriesRouter);
  router.use('/merchant', merchantsRouter);
  router.use('/auth', authRouter);
}

export default routerApi;