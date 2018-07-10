const request = require('request-promise')
const config = require('../configs')

module.exports = {
	getTickets: text => {
		const BASE_URL = config('BASE_URL')
		const status = text ? text : 'open'

		const options = {
			url: `${BASE_URL}zendesk/tickets/list`,
			qs: {
				query: `status=${status}`
			}
		}

		return request(options)
	},

	formatResponse: tickets => {
		return new Promise(resolve => {
			let obj = {}
			let arr = []
			const ZENDESK_AGENT_BASE_URL = config('ZENDESK_AGENT_BASE_URL')

			for (ticket of tickets) {
				const rating = ticket.satisfaction_rating ? ticket.satisfaction_rating.score : 'Not rated'
				const ticketColor = getTicketColor(ticket.status)
				arr.push({
					color: ticketColor,
					pretext: 'Latest tickets from Zendesk',
					title: ticket.subject,
					title_link: `${ZENDESK_AGENT_BASE_URL}tickets/${ticket.id}`,
					text: ticket.message,
					fields: [
						{
							title: 'Status',
							value: ticket.status,
							short: true
						},
						{
							title: 'Tags',
							value: ticket.tags.join(', '),
							short: true
						}
					]
				})
			}

			const response = Object.assign({}, obj, { attachments: arr })
			resolve(response)
		})
	}
}

const getTicketColor = status => {
	switch (status) {
		case 'new':
			return 'purple'
		case 'open':
			return 'blue'
		case 'pending':
			return 'red'
		case 'hold':
			return 'yellow'
		case 'closed':
			return 'grey'
		case 'solved':
			return 'green'
		default:
			return '#00e5ff'
	}
}
