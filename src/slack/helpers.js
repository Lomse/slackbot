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

			for (ticket of tickets) {
                console.log('ticket: ', ticket);
                const rating = ticket.satisfaction_rating ? ticket.satisfaction_rating.score : 'Not rated'
				arr.push({
					color: '#36a64f',
					pretext: 'Latest tickets from Zendesk',
					title: ticket.subject,
					title_link: ticket.url,
					text: ticket.message,
					fields: [
						{
							title: 'Status',
							value: ticket.status,
							short: true
						},
						{
							title: 'Rating',
							value: rating,
							short: true
						}
					]
				})
            } 

            const response = Object.assign({}, obj, {attachments: arr})
			resolve(response)
		})
	}
}
