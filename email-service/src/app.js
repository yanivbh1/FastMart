const { memphisConnect} = require('./services/mqService')

const startServer = () => {
    // Connect to Memphis and consume orders
    memphisConnect();
}

module.exports = {
    startServer: startServer
}

