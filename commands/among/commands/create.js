const Command = require('../../command');

const API = require('../API');

module.exports = class Create extends Command {
    
    static match(message) {
        const [, subCommand ] = message.content.split(" ");
        return subCommand === "create" || subCommand === "start" || subCommand === "c" || subCommand === "s";
    }

    static action(message) {
        const voiceChannel = message.member.voiceChannel
        if (voiceChannel === undefined) return false

        const guildId = voiceChannel.guild.id

        API.handleCreateGame(guildId)

        const members = voiceChannel.members.array();
        for (let i in members) {
            const member = members[i];
            member.setMute(true);
        }

    }

}