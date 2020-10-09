const Command = require('../../command');

const API = require('../API');

module.exports = class Round extends Command {

    static match(message) {
        const [, subCommand ] = message.content.split(" ");
        return subCommand === "sRound" || subCommand === "fRound" || subCommand.toUpperCase() === "SR" || subCommand.toUpperCase() === "FR"
    }

    static action(message) {
        const [, subCommand ] = message.content.split(" ")
        const voiceChannel = message.member.voiceChannel
        if (voiceChannel === undefined) return false

        const guildId = voiceChannel.guild.id
        
        const addMentionnedUsersToUsersDead = async () => {
            //add user to usersDead
            const membersMentionned = message.mentions.members.array()
            for (let i in membersMentionned) {
                await API.addUserToUsersDead(guildId, membersMentionned[i].id)
            }
        }
        const unMuteAllExceptUsersDead = async () => {
            //unMute all excepts usersDead
            const members = voiceChannel.members.array();
            const usersDeadId = await API.getAllUsersDeadOfGuild(guildId);
            // if it is the start of pause -> unmute
            // if it is the end of pause -> mute
            const nextMuteState = subCommand[0] === "s" ? false : true

            for (let i in members) {
                const member = members[i];
                if (nextMuteState === true || usersDeadId.length === 0 || !usersDeadId.some((elem) => elem === member.id)) {
                    member.setMute(nextMuteState)
                }
            }
        }

        addMentionnedUsersToUsersDead().then(() => {
            unMuteAllExceptUsersDead();
        })

    }

}