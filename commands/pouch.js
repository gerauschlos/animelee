exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started animelee!`)
    }
    if(!client.profile.has(message.author.id, "pouch")){
        client.profile.set(message.author.id, [], "pouch")
    }
    let pouchs = client.profile.get(message.author.id, "pouch")
    let Discord = require(`discord.js`)
    let pouch = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`${message.author.username}'s Pouch`)
    .setDescription(`The pouch is where passive items go from dismantled characters!`)
    for(i = 0; i < pouchs.length; i++){
        let pass = pouchs[i]
        let name = client.items.passives[pass].name
        let desc = client.items.passives[pass].description
        pouch.addField(`${i+1}. ${name}`, `${desc}`)
    }
    pouch.setFooter(`To equip a passive onto a character please use !equip.`)
    message.channel.send(pouch)
}