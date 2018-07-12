const router = require('express').Router()
const httpStatus = require('http-status')
const { getTickets, transformTickets, searchTickets, countTickets, searchTicketsByTags } = require('./helpers')

router.get('/tickets/list', async (req, res) => {
	try {
		const { status } = req.query
		const response = await getTickets(status)
		const { count, tickets } = response
		const transformedTickets = await transformTickets(tickets, count)

		res.status(httpStatus.OK).json(transformedTickets)
	} catch (err) {
		res.status(httpStatus.BAD_REQUEST).send(err.message)
	}
})

router.get('/tickets/search/:status', async (req, res) => {
	try {
		const { status } = req.params
		const response = await searchTickets(status)
		const { count, results } = response
		const transformedTickets = await transformTickets(results, count)

		res.status(httpStatus.OK).json(transformedTickets)
	} catch (err) {
		res.status(httpStatus.BAD_REQUEST).send(err.message)
	}
})

router.get('/tickets/search_tags/:tag', async (req, res) => {
	try {
		const { tag } = req.params
		const response = await searchTicketsByTags(tag)
		const { count, results } = response
		const transformedTickets = await transformTickets(results, count)

		res.status(httpStatus.OK).json(transformedTickets)
	} catch (err) {
		res.status(httpStatus.BAD_REQUEST).send(err.message)
	}
})

router.get('/tickets/count', async (req, res) => {
	try {
		const { duration } = req.params
		const newTickets = await countTickets('')
		const resolvedTickets = await countTickets('', 'solved')

		res.send({
			totalNewTickets: newTickets.count,
			totalSolvedTickets: resolvedTickets.count
		})
	} catch (err) {
		res.status(httpStatus.BAD_REQUEST).send(err.message)
	}
})

router.get('/', (req, res) => {
	res.send('This is the zendesk api')
})

router.get('/redirect', (req, res) => {
	code = req.query.code
	res.send(`the code is ${code}`)
})

module.exports = router
