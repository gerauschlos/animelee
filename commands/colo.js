exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.colo.has(message.author.id)){
        return message.channel.send(`You have not had a battle yet!`)
    }
    if(!client.colo.has(message.author.id, "claimed")){
        client.colo.set(message.author.id, 0, "claimed")
    }
    let held = client.colo.get(message.author.id, "glory")
    let wins = client.colo.get(message.author.id, "wins")
    let loss = client.colo.get(message.author.id, "losses")
    let kd = Math.round(wins/loss * 1000) / 1000
    const Discord = require(`discord.js`)
    const colosseum = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Compete with your peers to accumulate glory in the colosseum!`)
    .setDescription(`Collect 500 glory to claim Asuna Yuuki, or 1000 for Lazengann!`)
    .addField(`Your glory:`, `${held}`)
    .addField(`Wins: ${wins}`, `Losses: ${loss}`)
    .addField(`KD:`, `${kd}`)
    if(client.colo.get(message.author.id, "claimed") < 1){
    colosseum.setThumbnail(`https://i.imgur.com/v0rLYSz.png?1`)
    }
    if(client.colo.get(message.author.id, "claimed") < 2){
    colosseum.setImage(`https://i.imgur.com/gkKcrt5.png`)
    }
    colosseum.setFooter(`Use !claimc to claim the character you are viable for!`)
    message.channel.send(colosseum)
}