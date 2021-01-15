exports.run = (client, message, args) => {
    let Discord = require(`discord.js`)
    let status = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Animelee Technical Status`)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`*Created by: <@314385179420393472>*`)
    .addField(`ONLINE`, `Created: \`‎Saturday, ‎September ‎14, ‎2019, ‏‎10:59:09 PM\` \nSpeed: \`${client.ping}ms\` \nPlayers: \`${client.profile.keyArray().length}\` \nCurrent Servers: \`${client.guilds.keyArray().length}\` \nCurrent Hosting: \`OVH VPS | Ubuntu 18.04 | 1vCore 4gib RAM | 40Gib Storage\` \nDatabase: \`Enmap 5.2.4\``)
    .setFooter(`Feel free to use !invite and use the support channels to ask any questions.`)
    message.channel.send(status)
}