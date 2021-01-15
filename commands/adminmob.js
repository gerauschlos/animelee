exports.run = (client, message, args) => {
    let verified = client.profile.get(`617362855775305728`, "authorized")
    if(verified.includes(message.author.id)){
        if(args.length == 0){
            return message.channel.send(`Include mob`)
        }
        if(isNaN(args[0])){
            return message.channel.send(`Invalid Mob`)
        }
        if(args[0] < 0 || args[0] > client.mobs.mobs.length){
            return message.channel.send(`Invalid Mob`)
        }
        let spawned = args[0]
        const name = client.mobs.mobs[spawned].name
        const health = client.mobs.mobs[spawned].hp
        const atk = client.mobs.mobs[spawned].atk
        const matk = client.mobs.mobs[spawned].matk
        const def = client.mobs.mobs[spawned].def
        const mdef = client.mobs.mobs[spawned].mdef
        const spd = client.mobs.mobs[spawned].spd
        const desc = client.mobs.mobs[spawned].description
        const img = client.mobs.mobs[spawned].image
        let clas = client.mobs.mobs[spawned].class
        let nme = client.classes.classes[clas].name
        let ig = client.classes.classes[clas].img
        client.battles.set(message.channel.id, spawned, "id")
        client.battles.set(message.channel.id, 0, "Turn")
        client.battles.set(message.channel.id, health, "hp")
        client.battles.set(message.channel.id, atk, "atk")
        client.battles.set(message.channel.id, matk, "matk")
        client.battles.set(message.channel.id, def, "def")
        client.battles.set(message.channel.id, mdef, "mdef")
        client.battles.set(message.channel.id, spd, "spd")
        let Discord = require(`discord.js`)
        let spire = new Discord.RichEmbed()
        .setTitle(`Spawned!`)
        .setAuthor(nme, ig)
        .setDescription(desc)
        .addField(`**Health**`, `\`\`\`${health}\`\`\``)
        .setImage(img)
        .setFooter(`To fight it use !fight.`)
        .setTimestamp()
        .setColor(`#000000`)
        message.channel.send(spire)
    }
}