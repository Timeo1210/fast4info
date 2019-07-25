const Command = require("./command.js")
const User = require("../models/user")
const Components_Module = require("../modules/Components")
const Components = new Components_Module()

module.exports = class Kick extends Command {

    static match(message) {
        return message.content === "4kick"
    }

    static action(message) {
        const CoolDown = 20 * 60 * 1000 //5
        var data = {
            author_id: message.author.id,
            cooldown: CoolDown,
            message: message,
            command: "command_kick",
            commandText: "4kick",
        }
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
                    dispatcher.setBitrate(32)
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
                    console.error
                    Components.BotInUse = false
                });
            } else {
                message.member.createDM()
                .then(DMChannel => {
                    DMChannel.send("Impossible de 4kick si vous n'êtes pas dans un channel vocal.")
                })
            }
        })

        /*
        try {
            User.find({
                user_id: message.author.id
            }).then ( user => {
                if (user.length > 1) {
                    Components.sendError(message)
                    return
                }
                user = user[0]
                //check if already a account
                if (typeof user === 'undefined') {
                    //no account
                    user = new User({
                        user_id: message.author.id,
                        command_kick: new Date()
                    })
                    user.save()
                    execute()
                } else {
                    //check if cooldown of command_kick exist
                    if (typeof user.command_kick === 'undefined') {
                        user.command_kick = new Date()
                        user.save()
                        execute()
                    } else {
                        //check cooldown
                        var userCoolDown = (new Date()) - user.command_kick
                        if (userCoolDown > CoolDown) {
                            //can execute
                            user.command_kick = new Date()
                            user.save()
                            execute()
                        } else {
                            let text = "Impossible d'utiliser la commande 4kick pendant encore " + Components.msToMinAndSec(CoolDown - userCoolDown)
                            Components.sendDM(message, text)
                        }
                    }
                }
            })
        } catch (e) {
            Components.sendError(message)
            console.error(e)
        }
        */
    }

}