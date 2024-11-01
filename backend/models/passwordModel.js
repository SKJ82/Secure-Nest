const mongoose = require('mongoose')

const Schema = mongoose.Schema

const passwordSchema = new Schema({
    site: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Password', passwordSchema)