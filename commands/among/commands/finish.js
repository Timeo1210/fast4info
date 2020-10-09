const Command = require('../../command');

const API = require('../API');

module.exports = class Finish extends Command {

    static match(message) {
        const [, subCommand ] = message.content.split(" ");
        return subCommand === "finish" || subCommand === "f"
    }

    static action(message) {
        const voiceChannel = message.member.voiceChannel
        if (voiceChannel === undefined) return false

        const guildId = voiceChannel.guild.id

        API.handleFinishGame(guildId)

        const members = voiceChannel.members.array();
        for (let i in members) {
            const member = members[i];
            member.setMute(false);
        }

    }

}