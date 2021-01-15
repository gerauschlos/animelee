exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "team")){
        client.profile.set(message.author.id, [0,0,0], "team")
    }
    var status = " "
    let team = client.profile.get(message.author.id, "team")
    var flnme = `Unassigned`
    var b1nme = `Unassigned`
    var b2nme = `Unassigned`
    let characters = client.profile.get(message.author.id, "characters")
    for(i = 0; i < characters.length; i++){
        let char = characters[i]
        if(team[0] == char){
            let fl = team[0]
            var emote = ''
            if(client.characters.has(char, "rarity")){
                var r = client.characters.get(char, "rarity")
                var lib = client.characters.get(char, "Lib")
                if(r == 3){
                    var emote = client.emojis.get('682724871913865223')
                }
                else if(r == 2){
                var emote = client.emojis.get('682724871343440044')
                }
                else if(r == 1){
               var emote = client.emojis.get('682724871737835581')
                }
                else if(r == 0){
                    var emote = client.emojis.get('682724871352221714')
                }
            }
            if(client.battles.has(message.channel.id)){
                if(client.battles.has(message.channel.id, "dead")){
                    let dead = client.battles.get(message.channel.id, "dead")
                    if(dead.includes(fl)){
                        var status = "💀"
                    }
                }
            }
            var flnme = `${client.characters.get(fl, "Name")} Lvl. \`${client.characters.get(fl, "Level")}\` Hp: \`${client.characters.get(fl, "Health")}\` | \`${i+1}\` | ${emote} ${status}`
        }
        var status = " "
        if(team[1] == char){
            let b1 = team[1]
            var emote = ''
            if(client.characters.has(char, "rarity")){
                var r = client.characters.get(char, "rarity")
                var lib = client.characters.get(char, "Lib")
                if(r == 3){
                    var emote = client.emojis.get('682724871913865223')
                }
                else if(r == 2){
                var emote = client.emojis.get('682724871343440044')
                }
                else if(r == 1){
               var emote = client.emojis.get('682724871737835581')
                }
                else if(r == 0){
                    var emote = client.emojis.get('682724871352221714')
                }
            }
            if(client.battles.has(message.channel.id)){
                if(client.battles.has(message.channel.id, "dead")){
                    let dead = client.battles.get(message.channel.id, "dead")
                    if(dead.includes(b1)){
                        var status = "💀"
                    }
                }
            }
            var b1nme = `${client.characters.get(b1, "Name")} Lvl. \`${client.characters.get(b1, "Level")}\` Hp: \`${client.characters.get(b1, "Health")}\` | \`${i+1}\` | ${emote} ${status}`
        }
        var status = " "
        if(team[2] == char){
            let b2 = team[2]
            var emote = ''
            if(client.characters.has(char, "rarity")){
                var r = client.characters.get(char, "rarity")
                var lib = client.characters.get(char, "Lib")
                if(r == 3){
                    var emote = client.emojis.get('682724871913865223')
                }
                else if(r == 2){
                var emote = client.emojis.get('682724871343440044')
                }
                else if(r == 1){
               var emote = client.emojis.get('682724871737835581')
                }
                else if(r == 0){
                    var emote = client.emojis.get('682724871352221714')
                }
            }
            if(client.battles.has(message.channel.id)){
                if(client.battles.has(message.channel.id, "dead")){
                    let dead = client.battles.get(message.channel.id, "dead")
                    if(dead.includes(b2)){
                        var status = "💀"
                    }
                }
            }
            var b2nme = `${client.characters.get(b2, "Name")} Lvl. \`${client.characters.get(b2, "Level")}\` Hp: \`${client.characters.get(b2, "Health")}\` | \`${i+1}\` | ${emote} ${status}`
        }
    }
    let Discord = require(`discord.js`)
    let teame = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setThumbnail(message.author.avatarURL)
    .setTitle(`🛡Your Team`)
    .setDescription(`Teams are used for PvP, rifts, and dungeons! To set your team of 3 use !teamset.`)
    .addField(`(slots 1 is frontline, 2/3 are backline)`, `**Frontline:** \n1. ${flnme} \n**Backline:** \n1. ${b1nme} \n2. ${b2nme}`)
    .setFooter(`Enemies attack the frontline more often, be sure to structure your team with this in mind!`)
    message.channel.send(teame)  
}