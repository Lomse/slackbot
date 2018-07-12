const request = require('request-promise')
const moment = require('moment')
const config = require('../../configs')

module.exports = {
	/**
	 * Search Tickets
	 */
	getTickets: status => {
		const limit = 5
		const ZENDESK_API_BASE_URL = config('ZENDESK_API_BASE_URL')
		const ZENDESK_ACCESS_TOKEN = config('ZENDESK_ACCESS_TOKEN')

		const options = {
			url: `${ZENDESK_API_BASE_URL}tickets.json`,
			qs: {
				per_page: limit
			},
			headers: {
				Authorization: `Bearer ${ZENDESK_ACCESS_TOKEN}`
			},
			json: true
		}

		return request(options)
	},

	transformTickets: (tickets, count) => {
		return new Promise(resolve => {
			let result = []
			for (ticket of tickets) {
				result.push({
					id: ticket.id,
					subject: ticket.subject,
					created_at: ticket.created_at,
					status: ticket.status,
					tags: ticket.tags,
					satisfaction_rating: ticket.satisfaction_rating,
					message: shortenMessage(ticket.description),
					created_at: moment(ticket.created_at).format('MMMM Do YYYY')
				})
			}

			resolve({
				count: count,
				tickets: result
			})
		})
	},
	searchTickets: status => {
		const ZENDESK_API_BASE_URL = config('ZENDESK_API_BASE_URL')
		const ZENDESK_ACCESS_TOKEN = config('ZENDESK_ACCESS_TOKEN')

		const options = {
			url: `${ZENDESK_API_BASE_URL}search.json`,
			qs: {
				per_page: 5,
				query: `status:${status} type:ticket`
			},
			headers: {
				Authorization: `Bearer ${ZENDESK_ACCESS_TOKEN}`
			},
			json: true
		}

		return request(options)
	},
	searchTicketsByTags: tag=> {
		const ZENDESK_API_BASE_URL = config('ZENDESK_API_BASE_URL')
		const ZENDESK_ACCESS_TOKEN = config('ZENDESK_ACCESS_TOKEN')

		const options = {
			url: `${ZENDESK_API_BASE_URL}search.json`,
			qs: {
				per_page: 5,
				query: `tags:${tag} type:ticket`
			},
			headers: {
				Authorization: `Bearer ${ZENDESK_ACCESS_TOKEN}`
			},
			json: true
		}

		return request(options)
	},
	countTickets: (duration, status='new') => {
        let query
		const ZENDESK_API_BASE_URL = config('ZENDESK_API_BASE_URL')
        const ZENDESK_ACCESS_TOKEN = config('ZENDESK_ACCESS_TOKEN')
        const weekStart = getWeekDate().start
        const weekEnd = getWeekDate().end

        if( status === 'new' ){
            query = `type:ticket status:${status} created>=${weekStart} created<=${weekEnd}`
        }else {
            query = `type:ticket status:${status} updated>=${weekStart} updated<=${weekEnd}`
        }

		const options = {
			url: `${ZENDESK_API_BASE_URL}search.json`,
			qs: {
				per_page: 1,
				query: query
			},
			headers: {
				Authorization: `Bearer ${ZENDESK_ACCESS_TOKEN}`
			},
			json: true
        }

		return request(options)
	}
}

const getWeekDate = _ => {
	const m = moment()

	const start = m.startOf('week').format('DD')
	const end = m.endOf('week').format('DD')
	const month = m.endOf('week').format('MM')
	const afterMonth = start > end ? m.startOf('week').format('MM') : ''
	const year = m.startOf('week').format('YYYY')

	const startWeek = start > end ? `${year} ${afterMonth} ${start}` : `${year}-${month}-${start}`
	const endWeek = `${year}-${month}-${end}`

	return {
		start: startWeek,
		end: endWeek
	}
}

const shortenMessage = message => {
	let response
	const messageArr = message.split(' ')
	const numWords = messageArr.length
	const wordLimit = 50

	if (numWords > wordLimit) {
		const newMessage = messageArr.splice(0, wordLimit).join(' ')
		response = newMessage
	} else {
		response = message
	}

	return response
}
