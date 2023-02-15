import express, { Application, Request, Response } from "express"
import { jwtCheck } from '../utils/auth/auth0'
const { requiredScopes } = require('express-oauth2-jwt-bearer');


import coursesRouter from './courses.router'
import sectionsRouter from './sections.router'
import lessonsRouter from './lessons.router'
import resourcesRouter from './resources.router'

function routerApi(app:Application) {
  const router = express.Router();
  app.use('/api/v1', router);
  // router.use('/user', userRouter);
  router.use(jwtCheck);
  router.use('/courses', requiredScopes('read:courses'), coursesRouter);
  router.use('/sections', sectionsRouter);
  router.use('/lessons', lessonsRouter);
  router.use('/resources', resourcesRouter);
}


export default routerApi;