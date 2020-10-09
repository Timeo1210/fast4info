const Command = require('../command');
const Components_Module = require("../../modules/Components")
const Components = new Components_Module();

const Create = require('./commands/create');
const Round = require('./commands/round');
const Finish = require('./commands/finish');

module.exports = class Among extends Command {

    static match(message) {
        return message.content.startsWith('4among') || message.content.startsWith('4ag')
    }

    static action(message) {
        const [, subCommand, ...params] = message.content.split(" ")
        const permission_flags = ["MUTE_MEMBERS"]

        //check if author as perms
        const senderGuildMember = message.member;
        if (permission_flags.every((perm_flag) => senderGuildMember.hasPermission(perm_flag))) {
            const checkSubCommand = Create.parse(message) ||
            Round.parse(message) ||
            Finish.parse(message)

        }

        message.delete()

    }

}