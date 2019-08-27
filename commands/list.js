const Command = require("./command.js")
const Components_Module = require("../modules/Components")
const Components = new Components_Module()

module.exports = class Ping extends Command {

    static match(message) {
        return message.content === "4list"
    }

    static action(message) {
        const CoolDown = 5000 //5 second
        var data = {
            author_id: message.author.id,
            cooldown: CoolDown,
            message: message,
            command: "command_list",
            commandText: "4list",
        }
        console.log('tfe')

        Components.commandDatabaseCheck(data, () => {
            console.log("test")
        })

    }

}