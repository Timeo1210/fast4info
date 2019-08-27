if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Initing_Database = require("./modules/Initing_Database")
const mongoose = require('mongoose')
//bW9uZ29kYjovL2xvY2FsaG9zdC9mYXN0NGluZm8=
const Discord = require('discord.js')
const bot = new Discord.Client()
//TmpBeU9EZzNNVGszTnpRNU5qYzBNRE13LlhUWFlyUS5kV3I2dW9tMmk0OHJqOGpwT2txckozZXFlUjQ=

const Components_Module = require('./modules/Components');
const Components = new Components_Module()

const Ping = require('./commands/ping')
const Disc = require('./commands/disc')
const Info = require('./commands/info')
const fKick = require('./commands/fKick')
const Help = require('./commands/help')
const List = require('./commands/list')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))
Initing_Database()
db.dropDatabase()
//delete the database


bot.on('ready', function() {
    try {
        bot.user.setActivity("4help | Hacking the Internet")
    } catch(e) {
        console.error(e)
    }
})

bot.on('message', function (message) {
    // bot id = 602887197749674030
    if (message.author.id !== Components.BotId) {
        if (message.channel.type !== "dm") {
            var list_Parse = Ping.parse(message) || 
        Disc.parse(message) || 
        Info.parse(message) ||
        fKick.parse(message) ||
        Help.parse(message) ||
        List.parse(message)
        } else {
            message.channel.send("**Impossible de m'utiliser ici**")
        }
    }
    
    
    
})


//login use .env
bot.login(process.env.TOKEN)