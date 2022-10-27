import express, { Application } from "express"

import productsRouter from './products.router'
import categoriesRouter from './categories.router'
import merchantsRouter from './merchants.router'
import authRouter from './auth.router'

const routerDashboard = express.Router()
  routerDashboard.use('/product', productsRouter);
  routerDashboard.use('/category', categoriesRouter);
  routerDashboard.use('/merchant', merchantsRouter);
  routerDashboard.use('/auth', authRouter);

export default routerDashboard;