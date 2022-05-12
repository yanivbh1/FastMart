const { mongoConnect } = require('./services/mongoService');
const { memphisConnect} = require('./services/mqService');
const { logger } = require('./services/loggerService')
const SLEEP_TIME = process.env.SLEEP_TIME || 300;

startServer = () => {
    // Connect to MongoDB
    mongoConnect();
    // Connect to RabbmitMQ and consume orders
    memphisConnect();
}

module.exports = {
    startServer: startServer
}




