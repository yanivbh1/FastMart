const { startServer } = require('./src/app');
const { logger } = require('./src/services/loggerService')
const SLEEP_TIME = process.env.SLEEP_TIME || 300;

// sleep till MongoDB and Memphis services start
logger.info(`Sleeping for ${SLEEP_TIME}ms before connecting to MongoDB and Memphis.`)
setTimeout(() => {
    startServer();
    logger.info(`order-service started`)
}, SLEEP_TIME)