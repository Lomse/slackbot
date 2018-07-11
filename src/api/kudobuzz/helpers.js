const Account = require('./accountModel')

module.exports = _ => {
    const promises = [
        new Promise((resolve, reject) => {
            Account.countDocuments({ 'payment_plan.plan': { $gt: 0 } }, (err, data) => {
                resolve(data)
            })
        }),
        new Promise((resolve, reject) => {
            Account.countDocuments({}, (err, data) => {
                resolve(data)
            })
        })
    ]

    return Promise.all(promises)
}
