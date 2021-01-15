exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please mention the player you would like to trade pets with!`)
    }
    if(!message.mentions.users.first()){
        return message.channel.send(`This is not a valid player.`)
    }
    let men = message.mentions.users.first()
    if(!client.profile.has(men.id)){
        return message.channel.send(`This player has not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "chosenp")){
        return message.channel.send(`You do not have a chosen pet to trade! Please use !choosep to select one.`)
    }
    if(!client.profile.has(men.id, "chosenp")){
        return message.channel.send(`This player does not have a chosen pet to trade! Please use !choosep to select one.`)
    }
    let p1 = client.profile.get(message.author.id, "chosenp")
    let p2 = client.profile.get(men.id, "chosenp")
    
    let Discord = require(`discord.js`)
    let tradep = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`${message.author.username} is request to trade their ${client.pets.get(p1, "name")} for your ${client.pets.get(p2, "name")}!`)
    .setDescription(`Accept trade or deny trade?`)
    .addField(`${client.pets.get(p1, "name")} | Level \`${client.pets.get(p1, "level")}\``, `For a ${client.pets.get(p2, "name")} | Level ${client.pets.get(p2, "level")}.`)
    .setFooter(`Type \`confirm\` to accept this trade!`)
    message.channel.send(tradep)
    const filter = m => m.content.includes(`confirm`) && m.author.id == men.id
    const collector = message.channel.createMessageCollector(filter, { time: 15000 });

    collector.on('collect', m => {
    message.channel.send(`Trade accepted`)
    client.profile.set(message.author.id, p2, "chosenp")
    client.profile.remove(message.author.id, p1, "pets")
    client.profile.push(men.id, p1, "pets")
    client.profile.set(men.id, p1, "chosenp")
    client.profile.remove(men.id, p2, "pets")
    client.profile.push(message.author.id, p2, "pets")
  return message.channel.send(`Trade completed!`) 
    })
}