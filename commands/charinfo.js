exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send("You have not started Animelee!")
     };
     

    let checking = args[0];
    let characters = client.profile.get(message.author.id, "characters")
    if (0 < checking && checking <= characters.length){
        let charkey = characters[checking - 1];

        const name = client.characters.get(charkey, "Name")
        const Hp = client.characters.get(charkey, "Health")
        const Atk = client.characters.get(charkey, "Atk")
        const Matk = client.characters.get(charkey, "Matk")
        const Def = client.characters.get(charkey, "Def")
        const Mdef = client.characters.get(charkey, "Mdef")
        const Spd = client.characters.get(charkey, "Spd")
        const ID = client.characters.get(charkey, "ID")
        const lvl = client.characters.get(charkey, "Level")
        const lib = client.characters.get(charkey, "Lib")
        const auth = message.author.username
        var cimg = ''
        var color = '#0099ff'
        var img = client.characters.get(charkey, "Image")
        if(client.characters.has(charkey, "rarity")){
            let r = client.characters.get(charkey, "rarity")
            var cimg = client.levels.rares[r].img
            var color = client.levels.rares[r].color
        }

        const Discord = require('discord.js');
        const exampleEmbed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(`⚔️${name}⚔️`)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(client.characters.get(charkey, "Desc"))
        .setImage(img)
        .setThumbnail(cimg)
        .addField(`Series origin:`, client.characters.get(charkey, "Series"))
        .addField(`**Stats:**`, `*Summon Position: ${ID}*`)
        .addField(`Level:`, `\`${lvl}\``)
        .addField(`Health:`, `\`\`\`${Hp}\`\`\``, true)
        .addField(`Speed:`, `\`\`\`${Spd}\`\`\``, true)
        .addField(`Attack:`, `\`\`\`${Atk}\`\`\``, true)
        .addField(`Magic Attack:`, `\`\`\`${Matk}\`\`\``, true )
        .addField(`Defense:`, `\`\`\`${Def}\`\`\``, true)
        .addField(`Magic Defense:`, `\`\`\`${Mdef}\`\`\``, true)
  
        .setTimestamp()
        .setFooter(`Collection number: ${lib}. Owned by ${auth}`);
      
      message.channel.send(exampleEmbed);
    } else {
        message.channel.send(`You do not have this character!`)
    }
}
