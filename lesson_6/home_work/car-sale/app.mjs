import express from 'express'
import path from 'path'
import { errorHandler } from './middleware/errorHandler.mjs'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { fileURLToPath } from 'url'
import indexRouter from './routes/index.mjs'
import usersRouter from './routes/users.mjs'
import carRouter from './routes/carRoute.mjs'
import { __dirname } from './settings.mjs'
import { connectDB } from './db/db.mjs'
const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
connectDB();
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/cars', carRouter)
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
    })
// error handler
app.use(errorHandler)
export default app