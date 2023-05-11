const express = require('express')
const crypto = require('crypto')

// Settings
const logger = require('./settings/logger.settings')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())

app.use((req, _, next) => {
    req.headers['x-request-id'] = crypto.randomUUID()
    next()
})

app.post('/register', (req, res, next) => {
    const { name, email } = req.body

    if (name === undefined || email === undefined) {
        logger.error({
            message: 'name or email is undefined',
            data: {
                name,
                email,
            }
        })

        return res.status(404).json({
            status: 'failed',
            message: 'name or email is undefined',
        })
    }

    if (!String(name).length >= 8 && !String(email).length >= 14) {
        logger.error({
            message: 'name or email is wrong',
            data: {
                name,
                email,
            }
        })

        return res.status(404).json({
            status: 'failed',
            message: 'name or email is wrong',
        })
    }

    logger.info({
        message: 'email and name was validate with success',
        data: {
            name,
            email,
        },
        trace_id: req.header('x-request-id'),
    })

    return next()
},
    (req, res) => {
        logger.info({
            message: 'user registered with success',
            trace_id: req.header('x-request-id'),
        })

        return res.status(200).json({
            status: 'success',
            message: 'user registered with success'
        })
    })

app.listen(PORT)