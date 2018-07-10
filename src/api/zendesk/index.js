const router = require('express').Router()
const httpStatus = require('http-status')
const { getTickets, transformTickets, searchTickets } = require('./helpers')

router.get('/tickets/list', async (req, res) => {
	try {
        const { status } = req.query
        const response = await getTickets(status)
        const transformedTickets = await transformTickets(response.tickets)

		res.status(httpStatus.OK).json(transformedTickets)
	} catch (err) {
		res.status(httpStatus.BAD_REQUEST).send(err.stack)
	}
})

router.get('/tickets/search/:status', async (req, res)=> {
    try {
        const { status } = req.params
        const response = await searchTickets(status)
        const transformedTickets = await transformTickets(response.results)

		res.status(httpStatus.OK).json(transformedTickets)
	} catch (err) {
		res.status(httpStatus.BAD_REQUEST).send(err.stack)
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
