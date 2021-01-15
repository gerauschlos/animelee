exports.run = (client, message, args) => {

    const Discord = require('discord.js');
    let amount = client.profile.keyArray().length
    let servers = client.guilds.keyArray().length
    // inside a command, event listener, etc.
    const about = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('About Animelee!')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription('Animelee is a game-like bot, incorperating rpg elements with anime flair! Made by me <@314385179420393472>, hopefully your animelee journey is an enjoyable one!')
        .setThumbnail(client.user.avatarURL)
        .addField('Donations', `Although by no means required, donations help maintain animelee, funding its assets, hosting, improvement and ofc, get you some great loot! To learn more about donating try **${client.config.prefix}donate!**`)
        .setImage('https://i.imgur.com/jyXlYjH.jpg')
        .addField(`To invite animelee to your own server, use the following link!`, `https://discordapp.com/oauth2/authorize?client_id=617362855775305728&permissions=2147483127&scope=bot`)
        .setTimestamp()
        .setFooter(message.author.username)
    
    message.channel.send(about);
}
