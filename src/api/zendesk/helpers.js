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
                per_page: 5
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
                    message: shortenMessage(ticket.description)
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