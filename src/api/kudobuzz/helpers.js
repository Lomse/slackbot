const Account = require('./accountModel')

module.exports = _ => {
    const promises = [getTotalPayingUsers(), getTotalUsers()]

    return Promise.all(promises)
}

const getTotalPayingUsers = _ => {
    return new Promise((resolve, reject) => {
        Account.countDocuments({ 'payment_plan.plan': { $gt: 0 } }, (err, data) => {
            resolve(data)
        })
    })
}

const getTotalUsers = _ => {
    return new Promise((resolve, reject) => {
        Account.countDocuments({}, (err, data) => {
            resolve(data)
        })
    })
}
