const Command = require("./command.js")
const Components_Module = require("../modules/Components")
const Components = new Components_Module()
const request = require('request')
const JSSoup = require('jssoup').default
const fs = require('fs')

module.exports = class Info extends Command {

    static match(message) {
        var tempMessage = message.content
        tempMessage = tempMessage.split(" ")

        return tempMessage[0] === "4info"
    }

    static action(message) {
        const CoolDown = 15000 //5 second
        var data = {
            author_id: message.author.id,
            cooldown: CoolDown,
            message: message,
            command: "command_info",
            commandText: "4info",
        }
        var options = {
            NOM: "",
            CITY: ""
        }

        function processMessage() {
            var textMessage = message.content
            textMessage = textMessage.split(' ')
            textMessage.shift()
            var cuttingIndex = textMessage.indexOf('?')

            if (cuttingIndex === -1) {
                Components.sendDM(message, "Utiliser le caractère '?' pour séparer le Nom de la Ville !")
                return
            }

            options = {
                NOM: textMessage.splice(0, cuttingIndex),
                CITY: textMessage.splice(cuttingIndex - 1, textMessage.length - 1)
            }
            for (let option in options) {
                var text = ""
                options[option].forEach(data => {
                    text = text.concat(data + " ")
                })
                options[option] = text.trim()
            }
        }
        processMessage()

        
        Components.commandDatabaseCheck(data, () => {
            message.delete()
            searchPersonne(message, options)
        })

        function searchPersonne(message, data) {
            var NOM = data.NOM
            var CITY = data.CITY
            options = {
                url: `https://www.pagesjaunes.fr/pagesblanches/recherche?quoiqui=${NOM}&ou=${CITY}`,
                headers: {
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
                    'referrer': 'https://google.com',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Pragma': 'no-cache'
                }
            }
            
            request(options, (err, res, body) => {
                /*
                fs.writeFile("./modules/test.html", body, (err) => {
                    console.log(err)
                })
                */
                searchPJ(body, message)
            })
        
            function searchPJ(request, message) {
                var soup = new JSSoup(request)
                var noResponse = soup.findAll("p")
                
                if (typeof noResponse !== 'undefined' && noResponse.length === 2) {
                    if (noResponse[0].attrs.class.split(' ')[0] === "wording-no-responses") {
                        message.channel.send("**Pas de résultat pour cette recherche !**")
                        return
                    }
                }
                
                
        
                var nameList = []
                var adresseList = []
                var numList = []
        
                var tempNameList = soup.findAll('a', 'denomination-links')
                var tempAdresseList = soup.findAll('a', 'adresse')
                var tempNumList = soup.findAll('strong', 'num')
                
                
                for (let i = 0; i < tempNameList.length; i++) {
                    nameList.push(tempNameList[i].contents[0]._text.trim())
                }
        
                for (let i = 0; i < tempAdresseList.length; i++) {
                    adresseList.push(tempAdresseList[i].contents[0]._text.trim().replace("\n", " "))
                }
        
                for (let i = 0; i < tempNumList.length; i++) {
                    numList.push(tempNumList[i].contents[0]._text.trim().replace(/&nbsp;/g, ''))
                }

                sendMessage()

                function sendMessage() {
                    var textMessage = `__**Résultats pour la recherche de ${NOM} :**__ \`\`\`DIFF\n`
        
                    for (let i = 0; i < nameList.length; i++) {
                        var str = `-> Résultat n°${i + 1}: 
        Nom: ${nameList[i]}
        Adresse: ${adresseList[i]}
        Numéro: ${numList[i]} \n\n`
                        textMessage = textMessage.concat(str)
                    }
                    textMessage = textMessage.concat(`\`\`\``)
            
                    message.channel.send(textMessage)
                }
            }
            
           /*
           request("http://allmygames.alwaysdata.net/", (err, res, body) => {
               console.log(body)
           })
           */
            /*
            request('http://www.google.com', function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the HTML for the Google homepage.
            });
            */
        }
        

    }

}