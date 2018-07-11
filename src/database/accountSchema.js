const mongoose = require('mongoose')

module.exports =  mongoose.Schema({
    user_id: Number,
    name: String,
    id: Number,
    instagram_accounts: Array,
    twitter_accounts: Array,
    facebook_accounts: Array,
    help_desk_review_request_settings: {
        blacklist: Array
    },
    after_purchase_mail_settings: {
        blacklist: Array
    },
    platform: String,
    auto_publish_rating_above: Number,
    auto_publish_posts: Boolean,
    created_on: Date
})