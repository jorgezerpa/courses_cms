import express from "express"
import assetsRouter from './media.routes'
import { checkJwt, adminScopes } from "../../utils/auth/auth0"

const routerMedia = express.Router()
  routerMedia.use(checkJwt, adminScopes)
  routerMedia.use('/manage', assetsRouter);

export default routerMedia;