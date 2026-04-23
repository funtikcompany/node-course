import express from 'express'

import middleware from './middleware/index.mjs'
import errorHandler from './middleware/errorHandler.mjs'    
import initRouters from './routes/routers.mjs'
import { connectDB } from './db/db.mjs'

const app = express()

connectDB()

middleware(app)

initRouters(app)

app.use(errorHandler)

export default app