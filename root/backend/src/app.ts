import express from "express";
import {logger} from "./utils/logger"
import {router} from "./routes/router";
import cors from "cors"

// @ts-ignore
import {inject, errorHandler} from 'express-custom-error';

inject()

const app: express.Application = express();

// Configure Express App Instance
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
    extended: true,
    limit: '10mb'
}));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);
app.use(cors())

// This middleware adds the json header to every response
app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
})

// Assign Routes
app.use('/', router)

// Handle error
app.use(errorHandler())

// Handle not valid route
app.use('*', (req, res) => {
    res.status(404)
        .json({
            status: false,
            message: 'Endpoint Not Found'
        })
})

export {app}