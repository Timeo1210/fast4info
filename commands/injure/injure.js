const Command = require("../command");

module.exports = class Injure extends Command {

  static match(message) {
    return message.content.startsWith("4injure")
  }

  static action(message) {
    message.channel.send("hello")
  }

}