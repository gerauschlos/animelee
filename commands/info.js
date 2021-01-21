exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send("You have not started animelee!")
     };
     if(!client.profile.has(message.author.id, "chosen")){
         return message.channel.send("You do not have a chosen character!")
     }
     
    const chosen = client.profile.get(message.author.id, "chosen")

    const name = client.characters.get(chosen, "Name")
    const Hp = client.characters.get(chosen, "Health")
    const Atk = client.characters.get(chosen, "Atk")
    const Matk = client.characters.get(chosen, "Matk")
    const Def = client.characters.get(chosen, "Def")
    const Mdef = client.characters.get(chosen, "Mdef")
    const Spd = client.characters.get(chosen, "Spd")
    const ID = client.characters.get(chosen, "ID")
    const lvl = client.characters.get(chosen, "Level")
    const lib = client.characters.get(chosen, "Lib")
    var img = client.characters.get(chosen, "Image")
    const remaining = client.characters.get(chosen, "Exp")
    let cclass = client.units.units[lib].class
    let em = client.classes.classes[cclass].emote
    let cname = client.classes.classes[cclass].name
    const tonext = client.levels.levels[lvl].next
    const auth = message.author.username
    let rein = client.characters.get(chosen, "Reinforced")
    let total = Atk + Matk + Def + Mdef + Spd
    var cimg = message.author.avatarURL
    var color = '#0099ff'

    const Discord = require('discord.js');
    var emote = ''
     if(client.characters.has(chosen, "rarity")){
         let r = client.characters.get(chosen, "rarity")
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
         var color = client.levels.rares[r].color
     }
    // inside a command, event listener, etc.
    const about = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(`⚔️Your Chosen ${name}⚔️`)
        .setAuthor(message.author.username, cimg)
        .setDescription(` ${emote} Level: \`${lvl}\`/${client.levels.levels.length-1} | Battle Power: \`${total}\``)
        if(rein == 0){
            about.addField(`Reinforcement:`, `✧✧✧◈◈`, true)
        }
        if(rein == 1){
            about.addField(`Reinforcement:`, `✦✧✧◈◈`, true)
        }
        if(rein == 2){
            about.addField(`Reinforcemenet:`, `✦✦✧◈◈`, true)
        }
        if(rein == 3){
            about.addField(`Reinforcement:`, `✦✦✦◈◈`, true)
        }
        if(rein == 4){
            about.addField(`Reinforcement:`, `✦✦✦◆◈`, true)
        }
        if(rein == 5){
            about.addField(`Reinforcement:`, `✦✦✦◆◆`, true)
        }
        about.addField(`Class:`, `${client.emojis.get(em)} ${cname}`, true)
        about.addField(`Passive Awakened:`, `\`✥✥\``)
        about.setThumbnail(img)
        about.addField('Remaining Health:', `\`\`\`${Hp}\`\`\``)
        about.addField('Spd', `\`\`\`${Spd}\`\`\``, true)
        about.addField(`Atk:`, `\`\`\`${Atk}\`\`\``, true)
        about.addField('Matk:', `\`\`\`${Matk}\`\`\``, true)
        about.addField('Def:', `\`\`\`${Def}\`\`\``, true)
        about.addField('Mdef:', `\`\`\`${Mdef}\`\`\``, true)
        about.addField(`Abilities:`, `${client.units.units[lib].abilities[0].name}, ${client.units.units[lib].abilities[1].name}, ${client.units.units[lib].abilities[2].name} `)
        about.setTimestamp()
        about.setFooter(`Collection number: ${lib}, Universal ID: ${ID}`)
        if(lvl< client.levels.levels.length - 1){
            about.addField(`Exp:`, `\`${remaining}\`/\`${tonext}\` till next level.`)
        }
        if(lvl == client.levels.levels.length - 1){
            about.addField(`Exp:`, `\`Max Level\``)
        }
    
    message.channel.send(about);
}