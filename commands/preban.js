const Command = require("./command.js")



module.exports = class Preban extends Command {

    static match(message) {
        return true
    }

    static action(message) {
        console.log(message.author.tag)
    }

}