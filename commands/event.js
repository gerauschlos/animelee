exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.holiday.has(message.author.id)){
        client.holiday.set(message.author.id, [0], "quests")
    }
    if(!client.holiday.has(message.author.id, "clears")){
        client.holiday.set(message.author.id, 0, "chocolates")
        client.holiday.set(message.author.id, 0, "clears")
        client.holiday.set(message.author.id, message.author.id, "user")
        client.holiday.set(message.author.id, 0, "claimed")
    }
    if(client.active.active[0].event == 0){
        return message.channel.send(`There is no active event at this time.`)
    }
    let Discord = require(`discord.js`)
if(!client.holiday.has(message.author.id, "ekills")){
    client.holiday.set(message.author.id, 0, "clears")
    client.holiday.set(message.author.id, 0, "ekills")
    client.holiday.set(message.author.id, 0, "claimed")
}

let claimed = client.holiday.get(message.author.id, "claimed")
let event = new Discord.RichEmbed()
.setColor(`#0099ff`)
.setTitle(`Seraph of the end Invasion!`)
.setDescription(`Complete event quests and defend from the invading force along with 2 new spawn chatacters!`)
.addField(`Use !claim with 1000 event kills to claim Yuichiro Hyakuya!`, `Use !el at 10 clears to claim Mikaela Hyakuya`)
.addField(`Your kills: ${client.holiday.get(message.author.id, "ekills")}!`, `Clears: ${client.holiday.get(message.author.id, "clears")}!`)
.setThumbnail(`https://i.imgur.com/Nc0clne.png`)
.setImage(`https://i.imgur.com/v7vvcJG.png`)
.setFooter(`Available only for 2 weeks. | The new enemies also spawn through the world!`)
message.channel.send(event)
}
