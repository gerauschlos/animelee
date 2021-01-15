exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "horns")){
        client.profile.set(message.author.id, 0, "horns")
        client.profile.set(message.author.id, 0, "souls")
        client.profile.set(message.author.id, 0, "lances")
        client.profile.set(message.author.id, 0, "nightmares")
        client.profile.set(message.author.id, 0, "tridents")
        client.profile.set(message.author.id, 0, "souldust")
        client.profile.set(message.author.id, 0, "wings")
        client.profile.set(message.author.id, 0, "souldew")
        client.profile.set(message.author.id, 0, "diamonds")
    }
        let horns = client.profile.get(message.author.id, "horns")
        let souls = client.profile.get(message.author.id, "souls")
        let lances = client.profile.get(message.author.id, "lances")
        let nightmares = client.profile.get(message.author.id, "nightmares")
        let tridents = client.profile.get(message.author.id, "tridents")
        let souldust = client.profile.get(message.author.id, "souldust")
        let wings = client.profile.get(message.author.id, "wings")
        let souldew = client.profile.get(message.author.id, "souldew")
        let diamonds = client.profile.get(message.author.id, "diamonds")
        let Discord = require(`discord.js`)
        let materials = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`Your materials:`)
        .setAuthor(message.author.username, message.author.avatarURL)
        .addField(`Held:`,`Horn of the Demon: ${horns} \n Flame of the Soul: ${souls} \n Lance of the Heavens: ${lances} \n Devil's Nightmares: ${nightmares} \n Poseidon's Trident: ${tridents} \n Scorched Souldust: ${souldust} \n Angel's Wings: ${wings} \n Soaring Souldew: ${souldew} \n Demonic Diamond: ${diamonds}`)
        message.channel.send(materials)

}