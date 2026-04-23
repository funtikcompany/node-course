import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cookieParser from 'cookie-parser'
import sessionConfig from '../config/session.js'
import loggerConfig from '../config/loggerConfig.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const middleware = (app) => {
    app.set('views', path.join(__dirname, '../views'))
    app.set('view engine', 'ejs')

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())

    app.use(express.static(path.join(__dirname, '../public'), { extensions: ['html'] }))

    app.use(sessionConfig)
    app.use(loggerConfig)
}

export default middleware