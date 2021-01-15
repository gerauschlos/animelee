exports.run = (client, message, args) => {
    const Discord = require('discord.js');

    // inside a command, event listener, etc.
    const about = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Animelee Official Server! [BETA]')
        .setURL('https://discord.gg/WhN44mc')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription('Simply click the link above!')
        .setImage('https://i.imgur.com/Yz5WrnU.jpg')
        .setTimestamp()
        .setFooter(message.author.username)
    
    message.channel.send(about);
}