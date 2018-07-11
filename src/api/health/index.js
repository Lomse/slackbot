const router = require('express').Router()
const status = require('http-status')

router.get('/', (req, res) => {
    res.status(status.OK).json({
        status: 'up and running'
    })
})
module.exports = router
