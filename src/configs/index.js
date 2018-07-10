module.exports = env => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        require('dotenv').config()
    }

    const components = require('./components')

    if (!components[env]) throw new Error(`${env} is not defined`)
    return components[env]
}