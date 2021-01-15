exports.run = (client, message, args) => {
    if(message.author.id !== '314385179420393472'){
        return message.channel.send(`Onee-sama says you cant use this command!`)
    }
    let check = args[0]
    let Discord = require(`discord.js`)
    let content = new Discord.RichEmbed()
    .setColor(`#fc0000`)
    .setTitle(`Animelee Warning`)
    .setDescription(`This message is to inform you that Animelee staff have discovered evidence of suspicious activity on your account.`)
    .addField(`Reason:`, `\`Possible Alt Banking\``)
    .addField(`Evidence: Unusual Trade-log Payments between account and \`Nyaaaaa♡#1610\``, `Note: \`\`\`Alot of money transfer without any characters being exchanged, none of us here want to think its something bad though, just pm kawai to sort it out.\`\`\``)
    .setFooter(`Please contact @Kawaisoup#1001 with explanation, confirmation, or if you believe this to be a mistake.`)
    .setThumbnail(client.user.avatarURL)
    const user = client.users.find(user =>user.id === check)
    user.send(content)
    message.channel.send(`Warning sent.`)
}