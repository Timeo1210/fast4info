const mongoose = require('mongoose')


const usersSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    command_ping: {
        type: Date,
        required: false
    },
    command_disc: {
        type: Date,
        required: false
    },
    command_help: {
        type: Date,
        required: false
    },
})

module.exports = mongoose.model('User', usersSchema)