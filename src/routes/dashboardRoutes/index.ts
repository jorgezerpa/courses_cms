import express from "express"
import { checkJwt, adminScopes } from "../../utils/auth/auth0"

import programsRouter from './programs.router'
import sectionsRouter from './sections.router'
import widgetsRouter from './widgets.router'

const routerClient = express.Router()
  routerClient.use(checkJwt, adminScopes)
  routerClient.use('/programs', programsRouter );
  routerClient.use('/sections', sectionsRouter);
  routerClient.use('/widgets', widgetsRouter);

export default routerClient;