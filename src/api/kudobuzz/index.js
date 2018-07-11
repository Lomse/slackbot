const router = require('express').Router()
const httpStatus = require('http-status')
const getTotalUsers = require('./helpers')

router.get('/', async (req, res) => {
    try {
        const response = await getTotalUsers()
        res.status(httpStatus.OK).json({
            totalUsers: response[1],
            totalPayingUsers: response[0]
        })
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err.message)
    }
})

module.exports = router
