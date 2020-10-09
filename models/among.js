const mongoose = require('mongoose')

const amongSchema = new mongoose.Schema({
    usersDead: [{
        type: String,
    }],
    guildId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Among', amongSchema)