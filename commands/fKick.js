const Command = require("./command.js")
const Components_Module = require("../modules/Components")
const Components = new Components_Module()

module.exports = class fKick extends Command {

    static match(message) {
        return message.content.startsWith('4fKick')
    }

    static action(message) {
        const CoolDown = 0 //5 second

        

        const user = message.mentions.users.first()

        Components.canUseCommand(message.member, "fKick")
        .then(handle => {
            if (handle === true) {
                if (!user) {
                    Components.sendDM(message, "**Veuillez spécifier le membre a kick**")
        
                } else if (user.id === Components.BotId) {
                    Components.sendDM(message, "**Impossible de me kick en utiliser une de mes commande**")
        
                } else if (user) {
                    const member = message.guild.member(user)
                    member.createDM().then( DMChannel => {
                        DMChannel.send("https://discord.gg/BugQuWe")
                        .then( () => {
                            member.kick()
                        })
                    })
                    message.delete()
        
                }

            } else {
                Components.sendDM(message, "**Vous n'avez pas la permission d'utiliser cette commande**")
            }
        })

    }

}