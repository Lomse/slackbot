const Joi = require('joi')

const schema = Joi.object().keys({
    ZENDESK_ACCESS_TOKEN: Joi.string().required(),
    ZENDESK_API_BASE_URL: Joi.string().required(),
    ZENDESK_AGENT_BASE_URL: Joi.string().required()
})

const envVars = {
    ZENDESK_ACCESS_TOKEN: process.env.ZENDESK_ACCESS_TOKEN,
    ZENDESK_API_BASE_URL: process.env.ZENDESK_API_BASE_URL,
    ZENDESK_AGENT_BASE_URL: process.env.ZENDESK_AGENT_BASE_URL
}

const { err, value: envs } = Joi.validate(envVars, schema)

if (err) throw new Error(`configuration error: ${err.message}`)

module.exports = envs
