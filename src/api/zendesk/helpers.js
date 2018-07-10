const request = require('request-promise')
const config = require('../../configs')

module.exports = {
	/**
	 * Search Tickets
	 */
    getTickets: status => {
        const limit = 1
        const ZENDESK_API_BASE_URL = config('ZENDESK_API_BASE_URL')
        const ZENDESK_ACCESS_TOKEN = config('ZENDESK_ACCESS_TOKEN')

        const options = {
            url: `${ZENDESK_API_BASE_URL}tickets.json`,
            qs: {
                per_page: 2
            },
            headers: {
                Authorization: `Bearer ${ZENDESK_ACCESS_TOKEN}`
            },
            json: true
        }

        return request(options)
    },

    transformTickets: tickets => {
        return new Promise(resolve => {
            let result = []
            for (ticket of tickets) {
                result.push({
                    subject: ticket.subject,
                    created_at: ticket.created_at,
                    status: ticket.status,
                    tags: ticket.tags,
                    satisfaction_rating: ticket.satisfaction_rating,
                    url: ticket.url,
                    message: shortenMessage(ticket.description)
                })
            }

            resolve(result)
        })
    },
}


const shortenMessage = message => {
    let response
    const messageArr = message.split(' ')
    const numWords = messageArr.length

    if (numWords > 20) {
        const newMessage = messageArr.splice(0, 20).join(' ') + '...'
        response = newMessage
    } else {
        response = message
    }

    return response
}