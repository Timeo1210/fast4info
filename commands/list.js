const Command = require("./command.js")
const Components_Module = require("../modules/Components")
const Components = new Components_Module()
const Help = require("../models/help")

module.exports = class Ping extends Command {

    static match(message) {
        return message.content.startsWith("4list")
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

        var guildMemberToCheck;

        var mentionedUser = message.mentions.members.first()
        if (typeof mentionedUser !== 'undefined') {
            guildMemberToCheck = mentionedUser
        } else {
            guildMemberToCheck = message.member
        }
        
        Components.canUseCommand(message.member, "list").then(handle => {
            if (handle === true) {
                Components.commandDatabaseCheck(data, () => {

                    Help.find().then(helps => {
        
                        var toCheck = []
                        for (let i = 0; i < helps.length; i++) {
                            toCheck.push(helps[i].name)
                        }
        
                        Components.permissionsFlagsCheck(guildMemberToCheck, toCheck)
                        .then(handles => {
                            
                            if (handles.length === 0) {
                                Components.sendDM(message, `**Il n'y a aucune commande disponible pour ${guildMemberToCheck.user.username}**`)
                                return
                            }
        
                            var textMessage = `__**Liste des commandes disponilble pour ${guildMemberToCheck.user.username}:**__ \n \`\`\`css\n`
                            for (let i = 0; i < handles.length; i++) {
                                var str = `- ${handles[i].commandText}\n`
                                textMessage = textMessage.concat(str)
                            }
                            textMessage = textMessage.concat(`\`\`\``)
        
                            Components.sendDM(message, textMessage)
        
        
        
                        })
        
                    })
        
                })
            } else {
                Components.sendDM(message, "**Vous n'avez pas la permission d'utiliser cette commande**")
            }
        })

    }

}