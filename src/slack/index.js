const router = require('express').Router()
const httpStatus = require('http-status')
const { getLatestTickets, getTicketsByStatus, formatResponse, validateText, countTickets } = require('./helpers')
const config = require('../configs')
router.post('/list/tickets', async (req, res) => {
	const { text } = req.body

	if (!validateText(text)) {
		return res.status(httpStatus.OK).send({
			text:
				'Your are doing it wrong :unamused: Use `/list-tickets` with optional `status:new`, `status:opened`, `status:pending`, `status:solved`'
		})
	}

	try {
		const response =
			text == 'recent' ? JSON.parse(await getLatestTickets()) : JSON.parse(await getTicketsByStatus(text))

		const formattedResponse = await formatResponse(response)
		res.status(httpStatus.OK).send(formattedResponse)
	} catch (err) {
		res.status(httpStatus.BAD_REQUEST).send(err.stack)
	}
})

router.post('/count/tickets', async (req, res) => {
	const { text } = req.body
    const BASE_URL = config('BASE_URL')
	try {
		const response = JSON.parse(await countTickets())

		const result = {
			attachments: [
				{
					color: '#17bcd6',
					title: 'New Tickets this week',
					text: `Total new tickets this week: ${response.totalNewTickets}`,
					footer: 'Kudobuzz',
					footer_icon: `${BASE_URL}public/logo.png`
                },
                {
					color: '#59a93d',
					title: 'New Tickets this week',
					text: `Total solved tickets this week: ${response.totalSolvedTickets}`,
					footer: 'Kudobuzz',
					footer_icon: `${BASE_URL}public/logo.png`
				}
			]
		}

		res.status(httpStatus.OK).send(result)
	} catch (err) {
		res.status(httpStatus.BAD_REQUEST).send(err.message)
	}
})

module.exports = router
