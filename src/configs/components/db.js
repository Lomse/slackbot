const Joi = require('joi')

const schema = Joi.object().keys({
    MONGO_DB_URI: Joi.string()
        .uri({ scheme: ['mongodb'] })
        .required()
})

const envVars = {
    MONGO_DB_URI: process.env.MONGO_DB_URI
}

const { err, value: envs } = Joi.validate(envVars, schema)

if (err) throw new Error(`configuration error: ${err.message}`)

module.exports = envs
