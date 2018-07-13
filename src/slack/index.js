const router = require('express').Router()

const httpStatus = require('http-status')
const {
	getLatestTickets,
	getTicketsByStatus,
	formatResponse,
	validateText,
	countTickets,
	getTotalUsers,
	getTicketsByTags
} = require('./helpers')

const config = require('../configs')

router.post('/list/tickets', async (req, res) => {
	const { text } = req.body

	if (!validateText(text)) {
		return res.status(httpStatus.OK).send({
			text:
				'Your are doing it wrong :unamused: Use `/list-tickets` with optional `recent`, `new`, `open`, `pending`, `solved`'
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

router.post('/list/by_tags', async (req, res)=> {

	const { text } = req.body

	if(!text){
		return res.status(httpStatus.OK).send({
			text:
				'Your are doing it wrong :unamused: Use `/list-tickets-by-tags` with a tag. For example `/list-tickets-by-tags shopify`'
		})
	}

	try {
		const response = JSON.parse(await getTicketsByTags(text))

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

router.post('/count/users', async (req, res) => {
	const BASE_URL = config('BASE_URL')

	try {
		const response = JSON.parse(await getTotalUsers())

		const result = {
			attachments: [
				{
					color: '#17bcd6',
					title: 'Total Users',
					text: `Total Kudobuzz Users: ${response.totalUsers}`,
					footer: 'Kudobuzz',
					footer_icon: `${BASE_URL}public/logo.png`
				},
				{
					color: '#59a93d',
					title: 'Total Paying Users',
					text: `Total users who are on a paying plan: ${response.totalPayingUsers}`,
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
