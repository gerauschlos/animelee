exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "guild")){
        return message.channel.send(`You are not in a guild!`)
    }
    let guild = client.profile.get(message.author.id, "guild")
    if(guild == 0){
        return message.channel.send(`You are not in a guild`)
    }
    let lead = client.guild.get(guild, "leader")
    if(lead !== message.author.id){
        return message.channel.send(`You do not have the authority to promote someone to champion!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please mention the member you wish to promote!`)
    }
    if(!message.mentions.users.first().id){
        return message.channel.send(`This is not a valid player!`)
    }
    let men = message.mentions.users.first().id
    if(!client.profile.has(men)){
        return message.channel.send(`This player has not started Animelee!`)
    }
    if(client.profile.get(men, "questing") !== 0){
        return message.channel.send(`You cannot promote a player in battle!`)
    }
    let roster = client.guild.get(guild, "members")
    if(!roster.includes(men)){
        return message.channel.send(`This player is not in your guild!`)
    }
    let Discord = require(`discord.js`)
    let champ = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`You are about to promote ${message.mentions.users.first().username} to champion!`)
    .setDescription(`Confirm the setting of this player as the one to represent the guild in all guild pvp?`)
    .addField(`Note:`, `Champions represent the guild against other guilds, and cannot be changed by anyone except the guild leader!`)
    .setFooter(`It is recommended that champions be assigned after planning, and not simply at random.`)
    message.channel.send(champ).then(sentEmbed => {
        sentEmbed.react('✅')
       .then(() => sentEmbed.react('⛔'))

       const filter = (reaction, user) => {
        return ['✅', '⛔'].includes(reaction.emoji.name) && user.id == message.author.id;
    };
    const collector = sentEmbed.createReactionCollector(filter, { time: 1500000 });

        collector.on('collect', (reaction, reactionCollector) => {
        const reacted = reaction.emoji.name

    if(reacted == `✅`) {
    client.guild.set(guild, men, "champ")
    let guildc = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`You are now the guild champion!`)
    .setDescription(`To view your new guild, please use !guild, to see other guilds try !guilds.`)
    .setThumbnail(message.mentions.users.first().avatarURL)
    .setTimestamp()
    return message.channel.send(guildc)
    }
    if(reacted == `⛔`){
        message.channel.send(`You have canceled promotion!`)
    }
    })
})
}