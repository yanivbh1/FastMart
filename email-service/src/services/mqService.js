const memphis = require("memphis-dev");
const { sendConfirmation, sendNotificationViaEmail } = require('../controllers/emailController')
const { logger } = require('./loggerService')
const MEMPHIS_HOST = process.env.MEMPHIS_HOST || 'localhost'; // create MQ connection string using environment variable
const MEMPHIS_USERNAME = process.env.MEMPHIS_USERNAME || 'fastmart';
const MEMPHIS_PASSWORD = process.env.MEMPHIS_PASSWORD || 'memphis';
const MEMPHIS_ACCOUNTID = process.env.MEMPHIS_ACCOUNTID || '212111111';

/**
 * Connect to Memphis and consumer orders
 */
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
        
        ordersStation_consumer = await memphis.consumer({
            stationName: "orders",
            consumerName: "email_service",
        });
        logger.info(`ordersStation_consumer created`)

        notificationsStation_consumer = await memphis.consumer({
            stationName: "notifications",
            consumerName: "email_service",
        });
        logger.info(`notificationsStation_consumer created`)

        ordersStation_consumer.on("message", order => {
            // processing
            logger.info("New order received")
            logger.info(order.getData().toString())
            sendConfirmation(order);
        });

        notificationsStation_consumer.on("message", notification => {
            // processing
            logger.info("New notification requested")
            logger.info(notification.getData().toString())
            sendNotificationViaEmail(notification);
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
