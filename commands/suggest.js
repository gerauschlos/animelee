exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    let sugion = args.join(" ")
    let Discord = require(`discord.js`)
    let suggest = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setThumbnail(message.author.avatarURL)
    .setTitle(`New suggestion!`)
    .setDescription(sugion)
    .setFooter(`Suggested by ${message.author.username}`)
    .setTimestamp()
    client.channels.get(`632675371946344474`).send(suggest)
    message.channel.send(`Suggestion taken!`)
}