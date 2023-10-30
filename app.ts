require('dotenv').config()
import express from 'express'

import apiRoutes from './src/routes/api.routes'
import connectDB from './src/config/db.connection'
import errorHandler from './src/middlewares/error.handler.middleware'
import logger from './src/logger'
import { httpLogger } from './src/middlewares/logger.middlewares'
import { validatePath } from './src/middlewares/validators'

const port = process.env.NODE_PORT || 3000

const app = express()

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// logging each request
app.use(httpLogger)

// routes

app.use('/api', apiRoutes)


// error handlers
app.use('*', validatePath)
app.use(errorHandler)


// server

const runApp = async () => {
    await connectDB()
    app.listen(port, () => {
        logger.info(`Server started listening on port ${port}`)
    })
}

export default runApp

