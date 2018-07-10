const router = require('express').Router()
const httpStatus = require('http-status')
const { getTickets, formatResponse } = require('./helpers')

router.post('/', async (req, res) => {
    const { text } = req.body

    try {
        const response = !text
            ? JSON.parse(await getLatestTickets(text))
            : JSON.parse(await getTicketsByStatus(text))

        const formattedResponse = await formatResponse(response)
        res.status(httpStatus.OK).send(formattedResponse)
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err.stack)
    }
})

module.exports = router
