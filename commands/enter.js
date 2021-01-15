exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.battles.has(message.channel.id)){
        return message.channel.send(`There is no structure to enter here!`)
    }
    if(client.battles.has(message.channel.id, "spire")){
        let part = client.battles.get(message.channel.id, "part")
        if(part !== message.author.id){
            return message.channel.send(`The spire has not shown itself to you.`)
        }
        let inv = client.profile.get(message.author.id, "items")
        if(!inv.includes(13)){
            return message.channel.send(`You cannot afford to enter the spire.`)
        }
        if(!inv.includes(17)){
            return message.channel.send(`You cannot afford to enter the spire.`)
        }
        let amountr = inv.reduce((total,x) => (x==13 ? total+1 : total), 0)
        let amountc = inv.reduce((total,x) => (x==17 ? total+1 : total), 0)
        if(amountr < 15){
            return message.channel.send(`You cannot afford to enter the spire.`)
        }
        if(amountc < 25){
            return message.channel.send(`You cannot afford to enter the spire.`)
        }
        if(args.length == 0){
            return message.channel.send(`Please Include a Budget Amount of gold.`)
        }
        if(isNaN(args[0])){
            return message.channel.send(`Please Include a Budget Amount of gold.`)
        }
        let budget = parseInt(args[0])
        let spawned = client.quests.spire[0].boss
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
        let team = client.profile.get(message.author.id, "team")
        let chosen = client.profile.get(message.author.id, "chosen")
        if(!team.includes(chosen)){
            return message.channel.send(`Your chosen character must be a part of your team!`)
        }
        if(team.includes(0)){
            return message.channel.send(`A full team is required for The Unholy Spire.`)
        }
        for(i=0;i<15;i++){
            client.profile.remove(message.author.id, 13, "items")
        }
        for(i=0;i<25;i++){
            client.profile.remove(message.author.id, 17, "items")
        }
        if(client.profile.get(message.author.id, "questing") !== 0){
            return message.channel.send(`You cannot enter the spire while questing.`)
        }
        client.battles.set(message.channel.id, [], "dead")
        client.battles.set(message.channel.id, team, "team")
        client.battles.set(message.channel.id, 0, "spire")
        client.battles.set(message.channel.id, spawned, "id")
        client.battles.set(message.channel.id, 0, "Turn")
        client.battles.set(message.channel.id, health, "hp")
        client.battles.set(message.channel.id, atk, "atk")
        client.battles.set(message.channel.id, matk, "matk")
        client.battles.set(message.channel.id, def, "def")
        client.battles.set(message.channel.id, mdef, "mdef")
        client.battles.set(message.channel.id, spd, "spd")
        client.battles.set(message.channel.id, 0, "effect")
        client.battles.set(message.channel.id, budget, "budget")
        client.battles.set(message.channel.id, 0, "check")
        client.battles.set(message.channel.id, 0, "duration")
        client.profile.set(message.author.id, message.channel.id, "questing")
        message.channel.send(`The spire has accepted you!`)
        let Discord = require(`discord.js`)
        let spire = new Discord.RichEmbed()
        .setTitle(`First Floor Innitiated!`)
        .setAuthor(nme, ig)
        .setDescription(desc)
        .addField(`**Health**`, `\`\`\`${health}\`\`\``)
        .setImage(img)
        .setThumbnail(`https://i.imgur.com/RZDvGkI.png`)
        .setFooter(`To fight it use !fight.`)
        .setTimestamp()
        .setColor(`#000000`)
        message.channel.send(spire)
        
        
    }
}