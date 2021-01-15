exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "guild")){
        return message.channel.send(`You are not in a guild!`)
    }
    if(client.profile.get(message.author.id, "guild") == 0){
        return message.channel.send(`You are not in a guild!`)
    }
    let guild = client.profile.get(message.author.id, "guild")
    if(client.guild.get(guild, "leader") !== message.author.id){
        return message.channel.send(`You cannot disband a guild that isnt yours!`)
    }
    if(client.battles.has(guild)){
        return message.channel.send(`You cannot disband a guild while its in a battle!`)
    }
    let name = client.guild.get(guild, "name")
    let Discord = require(`discord.js`)
    let disband = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`You are about to disband the guild ${name}!`)
    .setDescription(`Are you sure you want to permanently disband this guild? This action cannot be undone!`)
    message.channel.send(disband).then(sentEmbed => {
        sentEmbed.react('✅')
       .then(() => sentEmbed.react('⛔'))

       const filter = (reaction, user) => {
        return ['✅', '⛔'].includes(reaction.emoji.name) && user.id == message.author.id;
    };
    const collector = sentEmbed.createReactionCollector(filter, { time: 1500000 });

        collector.on('collect', (reaction, reactionCollector) => {
        const reacted = reaction.emoji.name
        if(reacted == `✅`) {
            let roster = client.guild.get(guild, "members")
            for (i = 0; i < roster.length; i++) {
                const member = roster[i]
                client.profile.set(member, 0, "guild")
            }
            client.guild.delete(`${guild}`)
            let disbanded = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`Your guild has been disbanded`)
            .setDescription(`And so, ${name} is etched into the bowels of history, forevermore.`)
            .setTimestamp()
            return message.channel.send(disbanded)
            
        }
        if(reacted == '⛔'){
           return message.channel.send(`You have declined to disband your guild!`)
        }
        })

        })
}