exports.run = (client, message, args) => {
    const Discord = require(`discord.js`)
    const invite = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Animelee's Official bot invite link!`)
    .setDescription(`https://discordapp.com/oauth2/authorize?client_id=617362855775305728&permissions=2147483127&scope=bot`)
    .setTimestamp()
    .setImage(`https://i.imgur.com/Yz5WrnU.jpg`)
    message.channel.send(invite)
}