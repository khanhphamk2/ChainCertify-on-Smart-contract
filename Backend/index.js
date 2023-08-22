const http = require('http');
const { start, apiRoute } = require('./app');
const config = require('./config/config');

let server;

async function startAgenda(io) {
    agenda.io = io;
    await agenda.start();

    /** For testing
     *  every 5 minutes: cronTime.every(5).minutes()
     *  every 5 seconds: cronTime.everyMinute()
     *  every sunday at 00:00 : cronTime.everySundayAt(0, 0)
     * */

    await agenda.every('1 day', 'statisticsDaily');
}


try {
    const app = start();
    const httpServer = http.createServer(app);

    apiRoute(app, io);
    await startAgenda(io);

    server = httpServer.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
    });
} catch (error) {
    logger.error(error.message);
}

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});