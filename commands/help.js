const Command = require("./command.js")
const Components_Module = require("../modules/Components")
const Components = new Components_Module()
const Help = require("../models/help")

module.exports = class Ping extends Command {

    static match(message) {
        return message.content.startsWith('4help')
    }

    static action(message) {
        function foundParameters() {
            for (let i = 0; i < textMessage.length; i++) {
                if (textMessage[i][0] === '-') {
                    messageParameters.push(textMessage[i])
                    textMessage.splice(i, 1)
                }
            }
        }

        const CoolDown = 5000 //5 second
        var data = {
            author_id: message.author.id,
            cooldown: CoolDown,
            message: message,
            command: "command_help",
            commandText: "4help",
        }
        /*
        Components.commandDatabaseCheck(data, () => {
            message.channel.send("pong")
        })
        */
        var textMessage = message.content.split(' ')
        var messageParameters = []
        foundParameters()
        textMessage.shift()

        if (textMessage.length === 0) {
            Help.find({
                name: "help"
            }).then( help => {
                Components.sendDM(message, help[0].description);
            })


            return
        } else {
            try {
                Help.find({
                    name: textMessage[0]
                }).then( help => {
                    if (help.length === 0) {
                        Components.sendDM(message, "**Commande non-trouvés**")
                        return
                    }
    
                    Components.sendDM(message, help[0].description)
                })
            } catch (e) {
    
            }
        }

    }

}