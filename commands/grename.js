exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "guild")){
        return message.channel.send(`You are not in a guild!`)
    }
    let guild = client.profile.get(message.author.id, "guild")
    if(guild == 0){
        return message.channel.send(`You are not in a guild!`)
    }
    if(client.guild.get(guild, "leader") !== message.author.id){
        return message.channel.send(`You cannot rename a guild that isnt yours!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please include the new name of your guild!`)
    }
    if(args.length > 3){
        return message.channel.send(`Please keep guild names under 3 words!`)
    }
    let name = args.join(" ")
    if(name.length > 20){
        return message.channel.send(`Please keep names to 20 characters.`)
    }
    let Discord = require(`discord.js`)
    let rename = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`You are about to rename your guild to ${name}!`)
    .setDescription(`Proceed? ✅`)
    message.channel.send(rename).then(sentEmbed => {
        sentEmbed.react('✅')
       .then(() => sentEmbed.react('⛔'))

       const filter = (reaction, user) => {
        return ['✅', '⛔'].includes(reaction.emoji.name) && user.id == message.author.id;
    }
    const collector = sentEmbed.createReactionCollector(filter, { time: 1500000 });

        collector.on('collect', (reaction, reactionCollector) => {
        const reacted = reaction.emoji.name
        if(reacted == '✅'){
            client.guild.set(guild, name, "name")
           return message.channel.send(`You have renamed your guild to ${name}!`)
        }
        if(reacted == '⛔'){
            return message.channel.send(`You have declined to rename your guild.`)
        }
    
})
})
}