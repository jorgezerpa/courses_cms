import express from "express"

import programsRouter from './programs.router'
import sectionsRouter from './sections.router'
import widgetsRouter from './widgets.router'

const routerClient = express.Router()
  routerClient.use('/programs', programsRouter);
  routerClient.use('/sections', sectionsRouter);
  routerClient.use('/widgets', widgetsRouter);

export default routerClient;