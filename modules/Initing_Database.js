const { PartialTextBasedChannel } = require('discord.js')
const Help = require('../models/help')

function Init() {
    //HELP
    function h_help() {
        var help = {
            name: "help",
            coolDown: 100,
            command: "command_help",
            commandText: "4help",
            permission_flags: ["SEND_MESSAGES"]
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
            permission_flags: ["SEND_MESSAGES"]
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
            coolDown: 30000,
            command: "command_disc",
            commandText: "4disc",
            permission_flags: ["SEND_MESSAGES"]
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
            commandText: "4info",
            permission_flags: ["SEND_MESSAGES"]
        }
        info.textDescription = `Lorsque la commande ${info.commandText} est utilisée le bot vous envera l'adresse postal et le numero de téléphone de la personne spécifier (voir les parametres).`

        info.parameters = `La commande doit être utilisée sous cette forme: ${info.commandText} [Prenom] [Nom] ? [Ville] / [Numdero de départements] `
        
        var schema = new Help(info)
        schema.save()
    }
    function h_fKick() {
        //fKick help
        var info = {
            name: "fKick",
            coolDown: 0,
            command: "command_fKick",
            commandText: "4fKick",
            permission_flags: ["SEND_MESSAGES", "KICK_MEMBERS"]
        }
        info.textDescription = `Lorsque la commande ${info.commandText} est utilisée le bot kickera du server la personne designer (voir paramètres) et lui envera un message d'invitation.`

        info.parameters = `La commande doit être utilisée sous cette forme: ${info.commandText} [@User]`
        
        var schema = new Help(info)
        schema.save()
    }

    function h_list() {
        //list help
        var info = {
            name: "list",
            coolDown: 5000,
            command: "command_list",
            commandText: "4list",
            permission_flags: ["SEND_MESSAGES"]
        }

        info.textDescription = `Lorsque la commande ${info.commandText} est utilisée le bot vous donnera la liste de commande disponible pour vous ou de la personne specifier (voir paramètres)`

        info.parameters = `La commande doit être utilisée sous cette forme: ${info.commandText} [@User]`

        var schema = new Help(info)
        schema.save()
    }

    function h_among() {
        var info = {
            name: "among",
            coolDown: 1000,
            command: "command_among",
            commandText: "4among",
            permission_flags: ["MUTE_MEMBERS"]
        }

        info.textDescription = `La command ${info.commandText} vous permet de mute/unmute les gens durant une partie du jeu among us`
        info.parameters = `Quand la partie de among us commence utilisé: ${info.commandText} start \n Quand quelqu'un report un mort ou appuye sur le buzzer utilise (arobaser les jouers morts avec des espace entre les joueur specifier): ${info.commandText} sRound [@UserA] [UserB] \n Quand la fin du temps ou tout le monde peux parler utiliser (arobaser les jouers qui ont été voter): ${info.commandText} fRound [@UserA] [@UserB] \n Quand la partie est terminer utilisé: ${info.commandText} finish`

        var schema = new Help(info)
        schema.save()
    }


    h_help();
    h_ping();
    h_disc();
    h_info();
    h_fKick();
    h_list();
    h_among();
}

module.exports = Init