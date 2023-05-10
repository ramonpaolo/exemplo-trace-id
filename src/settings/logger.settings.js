const winston = require('winston')
const { hostname } = require('os')

const serviceName = 'exemplo-artigo-medium'

const { DATADOG_API_KEY } = process.env

// Enable send logs to DataDog
const httpOptions = {
    host: 'http-intake.logs.datadoghq.com',
    path: `/api/v2/logs?dd-api-key=${DATADOG_API_KEY}&ddsource=nodejs&service=${serviceName}&hostname=${hostname()}`,
    ssl: true
}

const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.Http(httpOptions)
    ]
})

module.exports = logger