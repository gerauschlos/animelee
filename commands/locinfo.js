exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please include the location you would like to see!`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid location!`)
    }
    let locs = client.locs.locs
    let loc = parseInt(args[0]) -1
    if(loc > locs.length - 1){
        return message.channel.send(`This is not a valid location!`)
    }
    if(loc < 0){
        return message.channel.send(`This is not a valid location!`)
    }
    let Discord = require(`discord.js`)
    let name = client.locs.locs[loc].name
    let desc = client.locs.locs[loc].description
    let spawns = client.locs.locs[loc].spawnlist
    let list = client.locs.locs[loc].spawnlisttxt
    let req = client.locs.locs[loc].req
    let check = client.profile.get(message.author.id, "rank")
    let locem = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`${name}`)
    .setDescription(`${desc}`)
    .setImage(`${client.locs.locs[loc].img}`)
    if(req > check){
        locem.addField(`Status: \`Locked\``, `Unlocked by completing: ${client.quests.quests[req].name}.`)
    }
    if(req <= check){
        locem.addField(`Status: \`Unlocked\``, `Unlocked by completing: ${client.quests.quests[req].name}`)
    }
    locem.addField(`Spawnable enemies:`,`${list}`)
    locem.setFooter(`To set out on an expedition use !explore.`)
    message.channel.send(locem)
    
}