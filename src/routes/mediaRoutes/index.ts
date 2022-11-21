import express from "express"

import assetsRouter from './media.routes'

const routerMedia = express.Router()
  routerMedia.use('/manage', assetsRouter);

export default routerMedia;