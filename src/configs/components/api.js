const Joi = require('joi')

const schema = Joi.object().keys({
	PORT: Joi.number()
		.integer()
		.min(0)
		.max(65535)
		.default(5000),
	NODE_ENV: Joi.string()
		.valid(['production', 'development', 'test'])
		.default('development'),
	BASE_URL: Joi.string()
		.default('http://localhost:5000/')
})

const envVars = {
    PORT: process.env.PORT,
	NODE_ENV: process.env.NODE_ENV,
	BASE_URL: process.env.BASE_URL
}

const { err, value: envs } = Joi.validate(envVars, schema)

if (err) throw new Error(`configuration error: ${err.message}`)

module.exports = envs
