exports.run = (client, message, args) => {
  if(client.battles.has(message.author.id)){
    if(!client.battles.has(message.author.id, "dungeon")){
    return message.channel.send("You are in a battle! Please \`!exit\` before changing characters.")
  }}
  if(client.colo.has(message.channel.id)){
      return message.channel.send(`You cannot change characters in the colosseum!`)
  }
  if(!client.profile.has(message.author.id)){
    return message.channel.send("You have not started Animelee!")
 };
        let checking = args[0];
        let characters = client.profile.get(message.author.id, "characters")
        if (0 < checking && checking <= characters.length){
            let charkey = characters[checking - 1];
            if(client.battles.has(message.channel.id)){
            if(client.battles.has(message.channel.id, "spire") && client.battles.has(message.channel.id, "team")){
              let team = client.battles.get(message.channel.id, "team")
              if(!team.includes(charkey)){
                return message.channel.send(`This character is not in your team!`)
              }
              let dead = client.battles.get(message.channel.id, "dead")
              if(dead.includes(charkey)){
                return message.channel.send(`This character has already died!`)
              }
            }}
            if(client.profile.get(message.author.id, "questing") !== 0){
              let chan = client.profile.get(message.author.id, "questing")
              if(client.battles.has(chan)){
                if(client.battles.has(chan, "spir")){
                  let team = client.battles.get(chan, "team")
                  if(!team.includes(charkey)){
                    return message.channel.send(`This character is not in your team.`)
                  }
                }
              }
            }
            if(client.battles.has(message.author.id)){
            if(client.battles.has(message.author.id, "dungeon")){
              let team = client.profile.get(message.author.id, "team")
              if(!team.includes(charkey)){
                return message.channel.send(`This character is not in your team!`)
              }
            }}
        client.profile.set(message.author.id, charkey, "chosen" )
        const name = client.characters.get(charkey, "Name") 
        const img = client.characters.get(charkey, "Image")
        const lvl = client.characters.get(charkey, "Level")
        const auth = message.author.username
        const prefix = client.config.prefix
        const Discord = require('discord.js');
        // inside a command, event listener, etc.
        const exampleEmbed = new Discord.RichEmbed()
          .setColor('#0099ff')
          .setTitle(`**You have chosen level \`${lvl}\` ${name}**`)
          .setAuthor(message.author.username, message.author.avatarURL)
          .addField(`*To check the stats of your currently held character use:*`, `\`${prefix}info\``)
          .setThumbnail(img)
        
        message.channel.send(exampleEmbed);
          } 
          else{
            return message.channel.send(`You do not have this character!`)
          }
    }