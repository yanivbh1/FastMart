const memphis = require("memphis-dev");
const { processOrder } = require('../controllers/orderController');
const { logger } = require('./loggerService');
const MEMPHIS_HOST = process.env.MEMPHIS_HOST || 'localhost'; // create MQ connection string using environment variable
const MEMPHIS_USERNAME = process.env.MEMPHIS_USERNAME;
const MEMPHIS_TOKEN = process.env.MEMPHIS_TOKEN;

/**
 * Connect to Memphis and consumer orders
 */
const memphisConnect = async () => {
    try {
        logger.info(`Memphis - trying to connect`)
        await memphis.connect({
            host: MEMPHIS_HOST,
            username: MEMPHIS_USERNAME,
            connectionToken: MEMPHIS_TOKEN
        });
        logger.info(`Memphis - connection established`)
        
        ordersStation_consumer = await memphis.consumer({
            stationName: "orders",
            consumerName: "resturant_service",
        });
        logger.info(`ordersStation_consumer created`)

        ordersStation_consumer.on("message", order => {
            // processing
            logger.info("New order received")
            logger.info(order.getData().toString())
            processOrder(order);
        });
    }
    catch (ex) {
        logger.log('fatal',`Memphis - ${ex}`);
        memphis.close();
        process.exit();
    }
}

module.exports = {
    memphisConnect: memphisConnect
}
