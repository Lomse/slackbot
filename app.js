const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const zendeskRouter = require('./src/api/zendesk')
const slackRouter = require('./src/slack')
const healthRouter = require('./src/api/health')

const port = 5000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', healthRouter)
app.use('/zendesk', zendeskRouter)
app.use('/slack', slackRouter)

module.exports = app