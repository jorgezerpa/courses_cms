import express, { Application } from "express"

import coursesRouter from './courses.router'
import sectionsRouter from './sections.router'
import lessonsRouter from './lessons.router'
import userRouter from './user.router'
import resourcesRouter from './resources.router'

function routerApi(app:Application) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/user', userRouter);
  router.use('/courses', coursesRouter);
  router.use('/sections', sectionsRouter);
  router.use('/lessons', lessonsRouter);
  router.use('/resources', resourcesRouter);
}


export default routerApi;