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
    let leader = client.guild.get(guild, "leader")
    if(leader !== message.author.id){
        return message.channel.send(`You do not have the authority to promote someone to leader!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please mention the player you would like to promote!`)
    }
    if(!message.mentions.users.first()){
        return message.channel.send(`This is not a valid player!`)
    }
    let mentioned = message.mentions.users.first().id
    if(!client.profile.has(mentioned)){
        return message.channel.send(`This player has not started Animelee!`)
    }
    let roster = client.guild.get(guild, "members")
    if(!roster.includes(message.mentions.users.first().id)){
        return message.channel.send(`This player is not in your guild!`)
    }
    if(message.mentions.users.first().id == message.author.id){
        return message.channel.send(`You are already guild leader!`)
    }
    const Discord = require(`discord.js`)
    const promotion = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`You are about to promote another player to leader of your guild!`)
    .setDescription(`This action cannot be undone, do not promote players you do not trust! You are responsible for any effects on the guild this may have!`)
    .setFooter(`Confirm the transfer of ownership to new player?`)
    message.channel.send(promotion).then(sentEmbed => {
        sentEmbed.react('✅')
       .then(() => sentEmbed.react('⛔'))

       const filter = (reaction, user) => {
        return ['✅', '⛔'].includes(reaction.emoji.name) && user.id == message.author.id;
    };
    const collector = sentEmbed.createReactionCollector(filter, { time: 1500000 });

        collector.on('collect', (reaction, reactionCollector) => {
        const reacted = reaction.emoji.name
        if(reacted == `✅`) {
            client.guild.set(guild, mentioned, "leader")
            return message.channel.send(`You are now the new guild leader, congratulations!`)
            
        }
        if(reacted == '⛔'){
            message.channel.send(`You have declined the guild promotion!`)
        }
        })

        })


}