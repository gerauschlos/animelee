exports.run = (client, message, args) => {

    if(!client.profile.has(message.author.id)){
        return message.channel.send("You dont have a profile because you havent started!")
     };

     const gold = client.profile.get(message.author.id, "gold");

     const shards = client.profile.get(message.author.id, "shards");

     const glimmer = client.profile.get(message.author.id, "glimmer")

     const Discord = require('discord.js');
     if(!client.profile.has(message.author.id, "sakura")){
         client.profile.set(message.author.id, 0, "sakura")
     }
     let sakura = client.profile.get(message.author.id, "sakura")
     // inside a command, event listener, etc.
     const about = new Discord.RichEmbed()
         .setColor('#0099ff')
         .setTitle('Your Currencies')
         .setAuthor(message.author.username, message.author.avatarURL)
         .setDescription('')
         .setThumbnail('https://i.imgur.com/3v1Pone.gif')
         .addField('Held Gold⚖️ ', `\`\`\`${gold}\`\`\``, true)
         .addField('Held Crystal Shards💎', `\`\`\`${shards}\`\`\``, true)
         .addField('Held Glimmer✨',`\`\`\`${glimmer}\`\`\``, true)
         .addField('Held Sakura💮', `\`\`\`${sakura}\`\`\``, true)
         .setTimestamp()
         .setFooter(message.author.username)
     
     message.channel.send(about);
 }