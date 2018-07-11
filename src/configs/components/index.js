const api = require('./api')
const zendesk = require('./zendesk')
const db = require('./db')

module.exports = Object.assign({}, api, zendesk, db)