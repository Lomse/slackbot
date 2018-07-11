const mongoose = require('mongoose')
const accountSchema = require('../../database/accountSchema')
const db = require('../../database/db')

const Account = mongoose.model('Account', accountSchema, 'account')

module.exports = Account
