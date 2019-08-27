const Help = require('../models/help')

function Init() {
    //HELP
    function h_help() {
        var help = {
            name: "help",
            coolDown: 100,
            command: "command_help",
            commandText: "4help",
        }
        help.textDescription = `Lorsque la commande ${help.commandText} est utilisée le bot vous explique comment utiliser la fonction specifier (voir les paramètres)  \n Pour la liste des commande : 4list`

        help.parameters = `La commande doit être utilisée sous cette forme: ${help.commandText} [nom de la commande souhaiter (sans le 4)]`

        var schema = new Help(help)
        schema.save()
    }
    function h_ping() {
        //Ping help
        var ping = {
            name: "ping",
            coolDown: 2000,
            command: "command_ping",
            commandText: "4ping",
        }
        ping.textDescription =  `Lorsque la commande ${ping.commandText} est utilisée le bot renvoie 'ping' automatiquement.`

        ping.parameters = null

        var schema = new Help(ping)
        schema.save()
    }
    function h_disc() {
        //Disc help
        var disc = {
            name: "disc",
            coolDown: 20 * 60 * 1000,
            command: "command_disc",
            commandText: "4disc"
        }
        disc.textDescription = `Lorsque la commande ${disc.commandText} est utilisée le bot va rentrée dans le channel vocal ou vous vous situez, jouer une musique est vous aurez 50% de chance de vous faire expluser du channel vocal, sinon il explusera quelqu'un d'autre au hasard`

        disc.parameters = null
        
        var schema = new Help(disc)
        schema.save()
    }
    function h_info() {
        //Info help
        var info = {
            name: "info",
            coolDown: 15000,
            command: "command_info",
            commandText: "4info"
        }
        info.textDescription = `Lorsque la commande ${info.commandText} est utilisée le bot vous envera l'adresse postal et le numero de téléphone de la personne spécifier (voir les parametres).`

        info.parameters = `La commande doit être utilisée sous cette forme: ${info.commandText} [Prenom] [Nom] ? [Ville] / [Numdero de départements] `
        
        var schema = new Help(info)
        schema.save()
    }


    h_help();
    h_ping();
    h_disc();
    h_info();
}

module.exports = Init