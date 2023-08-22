/* eslint-disable no-console */
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const routes = require('./routes/v1');

const start = function () {
    const app = express();

    if (config.env !== 'test') {
        app.use(morgan.successHandler);
        app.use(morgan.errorHandler);
    }

    // set security HTTP headers
    app.use(helmet());

    // parse json request body
    app.use(express.json({ limit: '50mb' }));

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));

    // sanitize request data
    app.use(xss());
    app.use(mongoSanitize());

    // gzip compression
    app.use(compression());

    // enable cors
    app.use(cors());
    app.options('*', cors());

    // limit repeated failed requests to auth endpoints
    if (config.env === 'production') {
        app.use('/v1/auth', authLimiter);
    }

    app.use((req, res, next) => {
        // For example, a GET request to `/test` will print "GET /test"
        console.log(`${req.method} ${req.url}`);

        next();
    });

    return app;
};

const apiRoute = function (app, io) {
    app.use((_, res, next) => {
        res.io = io;
        next();
    });

    // v1 api routes
    app.use('/v1', routes);

    // send back a 404 error for any unknown api request
    app.use((req, res, next) => {
        next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    });

    // convert error to ApiError, if needed
    app.use(errorConverter);

    // handle error
    app.use(errorHandler);
};

module.exports = {
    start,
    apiRoute,
};