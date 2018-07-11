const request = require('request-promise')
const config = require('../configs')

const getTicketColor = status => {
    switch (status) {
        case 'new':
            return '#681FA5'
        case 'open':
            return '#0026F4'
        case 'pending':
            return '#871C19'
        case 'hold':
            return '#EED147'
        case 'closed':
            return '#979797'
        case 'solved':
            return '#59A93D'
        default:
            return '#00e5ff'
    }
}

module.exports = {
    getLatestTickets: _ => {
        const BASE_URL = config('BASE_URL')
        const endpoint = `${BASE_URL}zendesk/tickets/list`
        return request.get(endpoint)
    },

    getTicketsByStatus: status => {
        const BASE_URL = config('BASE_URL')
        const endpoint = `${BASE_URL}zendesk/tickets/search/${status}`
        return request.get(endpoint)
    },

    getTotalUsers: status => {
        const BASE_URL = config('BASE_URL')
        const endpoint = `${BASE_URL}kudobuzz`
        return request.get(endpoint)
    },

    formatResponse: result => {
        return new Promise(resolve => {
            let obj = {}
            let arr = []
            const ZENDESK_AGENT_BASE_URL = config('ZENDESK_AGENT_BASE_URL')
            const BASE_URL = config('BASE_URL')
            const { tickets, count } = result

            for (ticket of tickets) {
                const rating = ticket.satisfaction_rating ? ticket.satisfaction_rating.score : 'Not rated'
                const ticketColor = getTicketColor(ticket.status)

                arr.push({
                    color: ticketColor,
                    title: ticket.subject,
                    title_link: `${ZENDESK_AGENT_BASE_URL}tickets/${ticket.id}`,
                    pretext: `Ticket opened on ${ticket.created_at}`,
                    text: ticket.message,
                    fields: [
                        {
                            title: 'Status',
                            value: ticket.status,
                            short: true
                        },
                        {
                            title: 'Tags',
                            value: ticket.tags.length ? ticket.tags.join(', ') : 'Untagged',
                            short: true
                        }
                    ],
                    footer: 'Kudobuzz',
                    footer_icon: `${BASE_URL}public/logo.png`
                })
            }

            arr.push({
                color: '#000000',
                title: `${tickets.length} tickets of ${count} tickets`,
                title_link: `${ZENDESK_AGENT_BASE_URL}dashboard`
            })

            const response = Object.assign({}, obj, { attachments: arr })
            resolve(response)
        })
    },
    validateText: text => {
        approvedTexts = ['new', 'opened', 'solved', 'pending']

        if (!text || approvedTexts.includes(text)) {
            return true
        }
        return false
    },
    countTickets: _ => {
        const BASE_URL = config('BASE_URL')
        const endpoint = `${BASE_URL}zendesk/tickets/count`
        return request.get(endpoint)
    }
}
