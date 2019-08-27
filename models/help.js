const mongoose = require('mongoose')
const Components_Module = require('../modules/Components')
const Components = new Components_Module()


const helpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coolDown: {
        type: Number,
        required: true
    },
    command: {
        type: String,
        required: true
    },
    commandText: {
        type: String,
        required: true
    },
    textDescription: {
        type: String,
        required: true
    },
    parameters: {
        type: String,
        required: false
    }
})

helpSchema.virtual('description').get(function() {
    console.log(this.coolDown)
    var text = `__**Aide pour ${this.name}:**__\`\`\`DIFF\n
    \n-> CoolDown:
    La commande ${this.commandText} a un cooldown (temp ou l'on ne peut pas utiliser la commande) de ${Components.msToMinAndSec(this.coolDown)}\n
    \n-> Description:
    ${this.textDescription}
    \n-> Paramètres:
    ${this.parameters ? this.parameters : "Cette commande n'a pas de paramètres !"}\`\`\``
    return text;
})

module.exports = mongoose.model('Help', helpSchema)