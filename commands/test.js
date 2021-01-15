exports.run = (client, message, args) => {
    if(message.author.id !== '314385179420393472'){
        return message.channel.send(`Onee-sama says you cant use this command!`)
    }
    let Discord = require(`discord.js`)
    let rimuru = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`You Summoned Rimuru Tempest!`)
    .setDescription(`\> Hidden Stars found: \n \> \`\`\`⭐⭐⭐⭐⭐\`\`\` /\`5\` Hidden Stars \n Reincarned as a slime in another world, and is ready for battle!`)
    .addField(`Anime:`, `That time i got Reincarnated as a Slime`)
    .setFooter(`Summoned on:`)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setImage(`https://static.zerochan.net/Rimuru.Tempest.full.2641307.png`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setFooter(`\> \`\`\`⭐⭐⭐⭐⭐\`\`\``)
    message.channel.send(rimuru)
    }
