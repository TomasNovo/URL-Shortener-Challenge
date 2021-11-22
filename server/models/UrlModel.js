const mongoose = require('mongoose')

const URLSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    count_short: Number,
    count_access: Number,
    date: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('Url', URLSchema)