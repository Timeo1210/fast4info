const Command = require("./command.js")
const User = require("../models/user")
const Components_Module = require("../modules/Components")
const Components = new Components_Module()

module.exports = class Disc extends Command {

    static match(message) {
        return message.content === "4disc"
    }

    static action(message) {
        const CoolDown = 20 * 60 * 1000 //5
        var data = {
            author_id: message.author.id,
            cooldown: CoolDown,
            message: message,
            command: "command_disc",
            commandText: "4disc",
        }
        Components.canUseCommand(message.member, "disc")
        .then (handle => {
            if (handle === true) {
                Components.commandDatabaseCheck(data, () => {
                    if (message.member.voiceChannel !== undefined) {
                        let voiceChannels = message.member.voiceChannel
                        message.delete()
        
                        Components.BotInUse = true
                        voiceChannels.join()
                        .then(connection => {
                            let dispatcher = connection.playFile(Components.Sounds.Drum_Rolls.path, {
                                bitrate: 32
                            });
                            dispatcher.setBitrate(64)
                            dispatcher.on('speaking', (speaking) => {
                                if (speaking === true) {
                                    setTimeout(() => {
                                        //voiceChannels is for members use voiceChannels.members.user for users
                                        var members = voiceChannels.members
                                        var keys= []
                                        function getKeys() {
                                            keys = []
                                            for (var key of members.keys()) {
                                                keys.push(key)
                                            }
                                        }
                    
                                        for (let i = 0; i < members.size; i++) {
                                            getKeys()
                                            if (members.get(keys[i]).user.bot === true) {
                                                members.delete(keys[i])
                                                i--
                                            }
                                        }
                                        
                                        
                                        
                                        
                                        if (Components.getRandom(0, 1) === 1) {
                                            //remove the author message form the list
                                            getKeys()
                                            for (let i = 0; i < members.size; i++) {
                                                try {
                                                    if (members.get(keys[i]).user.username === message.author.username) {
                                                        members.delete(keys[i])
                                                        break
                                                    }
                                                } catch (e) {
                                                    console.log(e)
                                                }
                                            }
                                            getKeys()
                                            members.get(keys[Components.getRandom(0, members.size - 1)]).setVoiceChannel(null)
                    
                                        } else {
                                            message.member.setVoiceChannel(null)
                                        }
                                        
                                        //use setVoiceChannel(null) for disconnect the member  
                    
                                        setTimeout(() => {
                                            voiceChannels.leave()
                                            Components.BotInUse = false
                                        }, 1400)
                                    }, Components.Sounds.Drum_Rolls.duration - 1300)
                                }
                            })
                        })
                        .catch((e) => {
                            console.error(e);
                            Components.BotInUse = false
                        });
                    } else {
                        message.member.createDM()
                        .then(DMChannel => {
                            DMChannel.send(`**Impossible de ${data.commandText} si vous n'êtes pas dans un channel vocal.**`)
                        })
                    }
                })
            } else {
                Components.sendDM(message, "**Vous n'avez pas la permission d'utiliser cette commande**")
            }
        })
    }

}