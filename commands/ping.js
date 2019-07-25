const Command = require("./command.js")
const User = require("../models/user")
const Components_Module = require("../modules/Components")
const Components = new Components_Module()

module.exports = class Ping extends Command {

    static match(message) {
        return message.content === "4ping"
    }

    static action(message) {
        const CoolDown = 5000 //5 second
        var data = {
            author_id: message.author.id,
            cooldown: CoolDown,
            message: message,
            command: "command_ping",
            commandText: "4ping",
        }

        Components.commandDatabaseCheck(data, () => {
            message.channel.send("pong")
        })

    }

}