if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose')
//bW9uZ29kYjovL2xvY2FsaG9zdC9mYXN0NGluZm8=
const Discord = require('discord.js')
const bot = new Discord.Client()
//TmpBeU9EZzNNVGszTnpRNU5qYzBNRE13LlhUWFlyUS5kV3I2dW9tMmk0OHJqOGpwT2txckozZXFlUjQ=

const Ping = require('./commands/ping')
const Kick = require('./commands/kick')
const Info = require('./commands/info')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))
//db.dropDatabase()
//delete the database


bot.on('ready', function() {
    try {
        bot.user.setActivity("Hacking the Internet")
    } catch(e) {
        console.error(e)
    }
})

bot.on('message', function (message) {
    if (message.content === "4test") {
        test(message)
    }

    

    var list_Parse = Ping.parse(message) || 
    Kick.parse(message) || 
    Info.parse(message)
    
    
})


//login use .env
bot.login(process.env.TOKEN)