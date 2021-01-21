exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.battles.has(message.channel.id)){
        return message.channel.send(`You are not in a quest!`)
    }
    if(!client.battles.has(message.channel.id, "quest")){
        return message.channel.send(`You are not in a quest!`)
    }
    if(!client.battles.get(message.channel.id, "quester") == message.channel.id){
        return message.channel.send(`You are not in this quest!`)
    }
    if(client.battles.get(message.channel.id, "wave") == 0){
        return message.channel.send(`You have not cleared the first wave!`)
    }
    if(client.battles.get(message.channel.id, "inter") == 1){
        return message.channel.send(`You have not cleared the wave!`)
    }
    if(client.battles.has(message.channel.id, "quest")){
        if(!client.colo.has(message.channel.id)){
        if(client.battles.get(message.channel.id, "quester") !== message.author.id){
            return message.channel.send(`This is not your quest!`)
        }
    }}
    if(client.battles.has(message.channel.id, "event")){
        message.channel.send(`Next wave!`)
        let quester = message.author.id
        let chosen = client.profile.get(message.author.id, "chosen")
        let characters = client.profile.get(message.author.id, "characters")
        let wave = client.battles.get(message.channel.id, "wave")
        let questw = client.battles.get(message.channel.id, "quest")
        let spawned = client.quests.events[questw].waves[wave].enemy
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
                const prefix = client.config.prefix
                message.channel.send(`${message.author} has encountered a ${name}!`)
                const Discord = require(`discord.js`)
                let spawn = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setAuthor(nme, ig)
                .setTitle(`**A ${name} blocks your path!**`)
                .setDescription(`${desc}`)
                .addField(`Health`, `\`\`\`${health}\`\`\``)
                .setImage(img)
                .setFooter(`To fight it use the ${prefix}attack command!`)
                .setTimestamp()
                client.battles.set(message.channel.id, {hp: health, atk: atk, matk: matk, def: def, mdef: mdef, spd: spd, id: spawned, Turn: 0, wave: wave, quester: message.author.id, quest: questw, inter: 1, event: 1})
                return message.channel.send(spawn)
    }
                message.channel.send(`Next wave!`)
                const quester = message.author.id
                const chosen = client.profile.get(message.author.id, "chosen")
                client.characters.set(chosen, 100, "Health")
                const wave = client.battles.get(message.channel.id, "wave")
                const questw = client.battles.get(message.channel.id, "quest")
                const spawned = client.quests.quests[questw].waves[wave].enemy
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
                const prefix = client.config.prefix
                message.channel.send(`${message.author} has encountered a ${name}!`)
                const Discord = require(`discord.js`)
                const spawn = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setAuthor(nme, ig)
                .setTitle(`**A ${name} blocks your path!**`)
                .setDescription(`${desc}`)
                .addField(`Health`, `\`\`\`${health}\`\`\``)
                .setImage(img)
                .setFooter(`To fight it use the ${prefix}attack command!`)
                .setTimestamp()
            
                client.battles.set(message.channel.id, {hp: health, atk: atk, matk: matk, def: def, mdef: mdef, spd: spd, id: spawned, Turn: 0, wave: wave, quester: message.author.id, quest: questw, inter: 1})
                message.channel.send(spawn)
}