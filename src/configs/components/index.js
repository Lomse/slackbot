const api = require('./api')
const zendesk = require('./zendesk')

module.exports = Object.assign({}, api, zendesk)