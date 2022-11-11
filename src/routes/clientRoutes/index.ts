import express, { Application } from "express"

import paypalRouter from './paypal.router'
import productsRouter from './products.router'
import categoriesRouter from './categories.router'
import ordersRouter from './orders.router'
import cartRouter from './cart.router'

const routerClient = express.Router()
  routerClient.use('/products', productsRouter);
  routerClient.use('/categories', categoriesRouter);
  routerClient.use('/orders', ordersRouter);
  routerClient.use('/cart', cartRouter);
  routerClient.use('/paypal', paypalRouter);

export default routerClient;