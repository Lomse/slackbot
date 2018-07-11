const mongoose = require('mongoose')
const config = require('../configs')

const MONGO_DB_URI = config('MONGO_DB_URI')

mongoose.connect(MONGO_DB_URI, {useNewUrlParser: true})

mongoose.connection.on('connected', function () {
	console.log('Mongoose default connection open to ' + MONGO_DB_URI)
})

mongoose.connection.on('error', function () {
	console.log('Mongoose default connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
	console.log('Mongoose default connection disconnected')
})

mongoose.connection.on('open', function () {
	console.log('Mongoose default connection is open')
})

process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose default connection disconnected through app termination')
		process.exit(0)
	})
})

module.exports = mongoose