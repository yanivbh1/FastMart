const { startServer } = require('./src/app')
const { logger } = require('./src/services/loggerService')
const SLEEP_TIME = process.env.SLEEP_TIME || 300;

// Sleep till MongoDB and Memphis services start.
logger.info(`Sleeping for ${SLEEP_TIME}ms before connecting to MongoDB and Memphis.`)
setTimeout(() => {
    startServer();
    logger.info(`restaurant-service started.`)
}, SLEEP_TIME)




