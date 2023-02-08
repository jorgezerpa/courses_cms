import express, { Application, Request, Response } from "express"
import { jwtCheck } from '../utils/auth/auth0'

import coursesRouter from './courses.router'
import sectionsRouter from './sections.router'
import lessonsRouter from './lessons.router'
import userRouter from './user.router'
import clientRouter from './client.router'
import resourcesRouter from './resources.router'

function routerApi(app:Application) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.get('/test-webhook', (req:Request, res:Response)=>{
      res.send('hola mundo triggereado con un webhook!')
  })
  router.use('/user', userRouter);
  router.use(jwtCheck);
  router.use('/courses', coursesRouter);
  router.use('/client', clientRouter);
  router.use('/sections', sectionsRouter);
  router.use('/lessons', lessonsRouter);
  router.use('/resources', resourcesRouter);
}


export default routerApi;