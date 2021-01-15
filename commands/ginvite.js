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
        return message.channel.send(`You do not have the authority to add a member!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please mention the player you wish to add to your guild!`)
    }
    if(!message.mentions.users.first().id){
        return message.channel.send(`This is not a valid player!`)
    }
    if(!client.profile.has(message.mentions.users.first().id)){
        return message.channel.send(`This player has not started Animelee!`)
    }
    if(client.profile.get(message.mentions.users.first().id, "guild") == guild){
        return message.channel.send(`This player is already in your guild!`)
    }
    if(client.profile.has(message.mentions.users.first().id, "guild")){
        if(!client.profile.get(message.mentions.users.first().id, "guild") == 0){
            return message.channel.send(`This player is already in a guild!`)
        }
    }
    if(client.profile.has(message.mentions.users.first().id, "guild")){
        if(!client.profile.get(message.mentions.users.first().id, "guild") == 0){
            return message.channel.send(`This player is already in a guild!`)
        }
    }
    let name = client.guild.get(guild, "name")
    let roster = client.guild.get(guild, "members")
    let members = roster.length
    if(members == 5){
        return message.channel.send(`Your guild already has 5 members!`)
    }
    let Discord = require(`discord.js`)
    let guildinvite = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`You have been invited to join ${name}!`)
    .setDescription(`To accept the invitation into this guild react to the checkmark!`)
    .addField(`Current Members:`, `${members}/5`)
    .setThumbnail(message.author.avatarURL)
    .setFooter(`To view the guild use !guild @member`)
    message.channel.send(guildinvite).then(sentEmbed => {
        sentEmbed.react('✅')
       .then(() => sentEmbed.react('⛔'))

       const filter = (reaction, user) => {
        return ['✅', '⛔'].includes(reaction.emoji.name) && user.id == message.mentions.users.first().id;
    };
    const collector = sentEmbed.createReactionCollector(filter, { time: 1500000 });

        collector.on('collect', (reaction, reactionCollector) => {
        const reacted = reaction.emoji.name
        if(reacted == `✅`) {
            client.guild.push(guild, message.mentions.users.first().id, "members")
            client.profile.set(message.mentions.users.first().id, guild, "guild")
            return message.channel.send(`Welcome to your new guild! To see your new guild, use the !guild command.`)
            
        }
        if(reacted == '⛔'){
            message.channel.send(`You have declined the guild invitation!`)
        }
        })

        })
    

}