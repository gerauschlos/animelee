exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    let gold = client.profile.get(message.author.id, "gold")
    if(gold < 1000){
        return message.channel.send(`You do not have the gold required to start a guild!`)
    }
    if(!client.colo.has(message.author.id)){
        return message.channel.send(`You do not have enough glory in the colosseum to start a guild!`)
    }
    let glory = client.colo.get(message.author.id, "glory")
    if(glory < 1000){
        return message.channel.send(`You do not have enough glory in the colosseum to start a guild!`)
    }
    if(args.length > 3){
        return message.channel.send(`Please keep guild names to 3 words max.`)
    }
    if(args.length > 1){
        return message.channel.send(`Guild names must be one word!`)
    }
    if(client.profile.has(message.author.id, "guild")){
        if(client.profile.get(message.author.id, "guild") !== 0){
        return message.channel.send(`You are already in a guild!`)
        }
    }
    if(args.length == 0){
        return message.channel.send(`Please include the name of the guild you would like to create!`)
    }
    const Discord = require(`discord.js`)
    let check = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Are you sure you want to spend 1000 gold to create the guild ${args[0]}?`)
    .setDescription(`React with ✅ to confirm!`)
    .addField(`Once a guild is created you will not be permited to leave it as its leader without promoting another player to leader!`, `*You can also disband the guild at any time*.`)
    message.channel.send(check).then(sentEmbed => {
        sentEmbed.react('✅')
       .then(() => sentEmbed.react('⛔'))

       const filter = (reaction, user) => {
        return ['✅', '⛔'].includes(reaction.emoji.name) && user.id == message.author.id;
    };
    const collector = sentEmbed.createReactionCollector(filter, { time: 1500000 });

        collector.on('collect', (reaction, reactionCollector) => {
        const reacted = reaction.emoji.name

    if(reacted == `✅`) {
    let newguild = client.guild.autonum
    let name = args.join(" ")
    if(name.length > 20){
        return message.channel.send(`Please keep guild names to 20 characters`)
    }
    client.guild.set(newguild, name, "name")
    client.guild.set(newguild, message.author.id, "leader")
    client.guild.set(newguild, 0, "gold")
    client.guild.set(newguild, [message.author.id], "members")
    client.guild.set(newguild, [], "subs")
    client.guild.set(newguild, 0, "wins")
    client.guild.set(newguild, 0, "losses")
    client.guild.set(newguild, [], "medals")
    client.profile.set(message.author.id, newguild, "guild")
    client.profile.math(message.author.id, "-", 1000, "gold")
    client.guild.set(newguild, 0, "level")
    let guildc = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`You have created the guild: ${name}!`)
    .setDescription(`To view your new guild, please use !guild, to see other guilds try !guilds.`)
    .setThumbnail(message.author.avatarURL)
    .addField(`If you have any questions about guilds, look in the !help command!`, `Members: 1/5`)
    .setTimestamp()
    return message.channel.send(guildc)
    }
    if(reacted == `⛔`){
        message.channel.send(`You have canceled guild creation!`)
    }
    })
})
}