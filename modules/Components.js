const mongoose = require("mongoose")

const fs = require('fs')
const getMP3Duration = require('get-mp3-duration')
const User = require("../models/user")

module.exports = class Components {

    constructor() {
        //BOT
        this.BotInUse = false
        this.BotId = "602887197749674030"

        //Sounds
        this.Sounds = {
            Drum_Rolls: {
                path: "sounds/Drum_Rolls.mp3",
                duration: ""
            }
        }
        this.soundsInit()

        this.TimeoutCheck = new Promise(function(resolve, reject) {

        })
    }

    

    sendChannel(message, text) {
        message.channel.send(text)
        message.delete()
    }

    sendDM(message, text, member = null) {
        function sendMessage(DMChannel) {
            DMChannel.send(text)
        }

        if (member === null) {
            message.member.createDM().then( DMChannel => {
                sendMessage(DMChannel)
            })
            message.delete()
        } else {
            member.createDM().then( DMChannel => {
                sendMessage(DMChannel)
            })
        }
        /*
        message.member.createDM()
        .then(DMChannel => {
            DMChannel.send(text)
        })
        */
    }

    sendError(message) {
        this.sendDM(message, "Une erreur est surevenu lors de l'execution de cette commande !")
    }

    soundsInit() {
        //Initing the sounds class
        for (var key in this.Sounds) {
            let buffer = fs.readFileSync(this.Sounds[key].path)
            this.Sounds[key].duration = getMP3Duration(buffer) + 200
        }
    }


    //Random
    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }

    msToMinAndSec(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + " minutes et " + (seconds < 10 ? '0' : '') + seconds + " secondes";
    }

    commandDatabaseCheck(data, callback) {
        /*
        data.author_id
        data.cooldown
        data.message
        data.command
        data.commandText
        */
        if (this.BotInUse === true) {
            this.sendDM(data.message, "Le bot est déja en cours d'utilisation")
            return
        }

        try {
            User.find({
                user_id: data.author_id //data.author_id
            }).then ( user => {
                user = user[0]
                //check if already a account
                if (typeof user === 'undefined') {
                    //no account
                    let userData = {
                        user_id: data.author_id,
                    }
                    userData[data.command] = new Date()
                    user = new User(userData)
                    user.save()

                    callback()
                    return true
                } else {
                    //check if cooldown of command_kick exist
                    if (typeof user[data.command] === 'undefined') {
                        user[data.command] = new Date()
                        user.save()

                        callback()
                        return true
                    } else {
                        //check cooldown
                        var userCoolDown = (new Date()) - user[data.command]
                        if (userCoolDown > data.cooldown) {
                            //can execute
                            user[data.command] = new Date()
                            user.save()

                            callback()
                            return true
                        } else {
                            let remainingTime = this.msToMinAndSec(data.cooldown - userCoolDown)
                            let text = `Impossible d'utiliser la commande ${data.commandText} pendant encore ${remainingTime}`
                            this.sendDM(data.message, text)
                            return false
                        }
                    }
                }
            })
        } catch (e) {
            this.sendError(data.message)
            console.error(e)
        }
    }

    permissionsFlagsCheck(guildMember, commandsName) {

        //https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS

        //console.log(Help.find())
        const Help = require('../models/help.js');


        if (typeof commandsName === "string") {
            commandsName = [commandsName]
        }


        return new Promise((resolve, reject) => {
        
            Help.find().then(commands => {
                var searchCommands = []
                for (let i = 0; i < commands.length; i++) {
                    if (commandsName.some(elem => elem === commands[i].name)) {
                        searchCommands.push(commands[i])
                    }
                }

                var hasPermCommands = []

                for (let i = 0; i < searchCommands.length; i++) {

                    if (searchCommands[i].permission_flags.every(elem => guildMember.hasPermission(elem))) {
                        hasPermCommands.push(searchCommands[i])
                    }

                }

                resolve(hasPermCommands)
                
            })

        })


    }

    canUseCommand(guildMember, commandsName) {
        return new Promise((resolve, reject) => {
            this.permissionsFlagsCheck(guildMember, commandsName)
            .then(handle => {
                try {
                    if (commandsName === handle[0].name) {
                        resolve(true)
                    }
                } catch (e) {
                    resolve(false)
                }
            }).catch(e => {
                console.log(e)
                reject()
            })
        })
    }



}