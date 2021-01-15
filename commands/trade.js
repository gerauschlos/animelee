exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
     return message.channel.send("You dont have not started animelee!")
     };

     if (args.length == 0) {
         return message.channel.send(`Please mention the user you are attempting to trade with!`)
     };

     if (args.length == 1) {

        if(!message.mentions.users.first()){
            return message.channel.send(`This is not a valid player!`)
        };

        if(!client.profile.has(message.mentions.users.first().id)){
            return message.channel.send(`This player has not started Animelee!`)
        };

        if(message.mentions.users.first() == message.author.id){
            return message.channel.send(`You cannot trade with yourself!`)
        };
        if(!client.profile.get(message.author.id, "questing") == 0){
            return message.channel.send(`You cannot trade while in battle!`)
        }

         const trader = message.author.id
         const tradename = message.author.username
         const traded = message.mentions.users.first().id
         const tradedname = message.mentions.users.first().username

         const tchar = client.profile.get(trader, "chosen")
         const tcharname = client.characters.get(tchar, "Name")
         const tcharlvl = client.characters.get(tchar, "Level")
         const tcharimg = client.characters.get(tchar, "Image")
         const tdchar = client.profile.get(traded, "chosen")
         const tdcharname = client.characters.get(tdchar, "Name")
         const tdcharlvl = client.characters.get(tdchar, "Level")
         const tdcharimg = client.characters.get(tdchar, "Image")

         const prefix = client.config.prefix

         if (client.profile.has(trader, tchar, "fav")) {
             return message.channel.send(`You cannot trade your favorite character!`)
         }

         if (client.profile.has(traded, tdchar, "fav")) {
             return message.channel.send(`You cannot trade your favorite character!`)
         }
         if(client.profile.has(trader, "team")){
            let team = client.profile.get(trader, "team")
            if(team.includes(tchar)){
                return message.channel.send(`You cannot trade a character in your team!`)
            }
        }
        if(client.profile.has(traded, "team")){
            let team = client.profile.get(traded, "team")
            if(team.includes(tdchar)){
                return message.channel.send(`You cannot trade a character in your team!`)
            }
        }

         const Discord = require(`discord.js`)
         const trading = new Discord.RichEmbed()
         .setColor(`#0099ff`)
         .setTitle(`**${tradename}\`s new trade**`)
         .addField(`${tradename} is offering:`, `A level ${tcharlvl} ${tcharname}`)
         .addField(`For:`, `${tradedname}'s level ${tdcharlvl} ${tdcharname}!`)
         .setFooter(`To accept this trade please type \`confirm\``)
         .setThumbnail(tcharimg)
         .setImage(tdcharimg)
         .setTimestamp()

        message.channel.send(trading)
        var comp = 0

         const filter = m => m.content.includes(`confirm`) && m.author.id == traded
         const collector = message.channel.createMessageCollector(filter, { time: 15000 });

         collector.on('collect', m => {
	     message.channel.send(`Trade accepted`)

         client.profile.remove(trader, tchar, "characters")
         client.profile.push(traded, tchar, "characters")
         client.profile.set(traded, tchar, "chosen") 
         client.profile.remove(traded, tdchar, "characters")
         client.profile.push(trader, tdchar, "characters")
         client.profile.set(trader, tdchar, "chosen")
        let tradeoccured = new Discord.RichEmbed()
        .setColor(`#0019a6`)
        .setTitle(`Trade has Occured: ${message.guild.name}`)
        .setDescription(`${message.author.username}#${message.author.discriminator} has traded a ${tcharname} | ID: ${tdchar} for ${tradedname}#${message.mentions.users.first().discriminator} 's ${tdcharname} | ID: ${tdchar}.`)
        .setTimestamp()
        .setFooter(`For Admin use only`)
        client.channels.get(`686237243202994262`).send(tradeoccured)
       return message.channel.send(`Trade completed!`) 
         })
}
}