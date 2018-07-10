const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const zendeskRouter = require('./src/api/zendesk')
const slackRouter = require('./src/slack')
const healthRouter = require('./src/api/health')

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/', healthRouter)
app.use('/zendesk', zendeskRouter)
app.use('/slack', slackRouter)

module.exports = app