const router = require('express').Router()
const httpStatus = require('http-status')
const { getLatestTickets, getTicketsByStatus, formatResponse, validateText } = require('./helpers')

router.post('/', async (req, res) => {

    const { text } = req.body

    if (!validateText(text)) {
        return res.status(httpStatus.OK).send({
            attachments: {
                text: 'Use `/list-tickets` with `new`, `opened`, `pending`, `solved`'
            }
        })
    }

    try {
        const response = !text
            ? JSON.parse(await getLatestTickets())
            : JSON.parse(await getTicketsByStatus(text))

        const formattedResponse = await formatResponse(response)
        res.status(httpStatus.OK).send(formattedResponse)
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err.stack)
    }
})

module.exports = router
