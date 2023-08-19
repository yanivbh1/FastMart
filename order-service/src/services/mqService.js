const memphis = require("memphis-dev");
const { logger } = require('./loggerService')
const MEMPHIS_HOST = process.env.MEMPHIS_HOST || 'localhost'; // create MQ connection string using environment variable
const MEMPHIS_USERNAME = process.env.MEMPHIS_USERNAME || 'fastmart';
const MEMPHIS_PASSWORD = process.env.MEMPHIS_PASSWORD || 'memphis';
const MEMPHIS_ACCOUNTID = process.env.MEMPHIS_ACCOUNTID || '212111111';
let ordersStation_producer = null;

const memphisConnect = async () => {
    try {
        logger.info(`Memphis - trying to connect`)
        await memphis.connect({
            host: MEMPHIS_HOST,
            username: MEMPHIS_USERNAME,
            password: MEMPHIS_PASSWORD,
            accountId: MEMPHIS_ACCOUNTID
        });
        logger.info(`Memphis - connection established`)

        ordersStation_producer = await memphis.producer({
            stationName: "orders",
            producerName: "order_service",
        });
        logger.info(`ordersStation_producer created`)
    } catch(ex) {
        logger.log('fatal',`Memphis - ${ex}`);
        memphis.close();
        process.exit();
    }
}

/**
 * Publish order to station
 * @param {Object} order - order object containing order details
 */
const publishOrderToStation = (order) => {
    ordersStation_producer.produce({message: Buffer.from(JSON.stringify(order))});
    logger.info(`Memphis - order ${order._id} placed`);
}

/**
 * An express middleware for injecting queue services into the request object.
 * @param {Object} req - express request object.
 * @param {Object} res - express response object.
 * @param {Function} next - express next() function.
 */

 const injectPublishService = (req, res, next) => {
    // add all exchange operations here
    const stationServices = {
        publishOrderToStation: publishOrderToStation
    }
    // inject exchangeServices in request object
    req.stationServices = stationServices;
    next();
}

module.exports = {
    injectPublishService: injectPublishService,
    memphisConnect: memphisConnect,
}
