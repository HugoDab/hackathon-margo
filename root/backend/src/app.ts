import express from "express";
import {logger} from "./utils/logger"

const app = express()

// Configure Express App Instance
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

// Swagger Documentation
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../swagger_output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
})

// Assign Routes
app.use('/', require('./routes/router.js'))

// Handle not valid route
app.use('*', (req, res) => {
    res
        .status(404)
        .json({
            status: false,
            message: 'Endpoint Not Found'
        })
})

export {app}