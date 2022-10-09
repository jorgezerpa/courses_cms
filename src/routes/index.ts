import express, { Application } from "express"

import productsRouter from './products.router'
import categoriesRouter from './categories.router'
import merchantsRouter from './merchants.router'

function routerApi(app:Application) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/merchants', merchantsRouter);
}

export default routerApi;