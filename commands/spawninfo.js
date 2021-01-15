exports.run = (client, message, args) => {


    if (args[0] == "beginner" || args[0] == "b") {

        const Discord = require('discord.js');
        const beg = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle("Beginner Spawn Information!")
        .setAuthor(message.author.username)
        .setImage(`https://i.imgur.com/k8mdsJe.gif`)
        .addField(`Cost:`, `100 Shards`)
        .addField(`About:`, `\`\`\`The beginner spawn is meant to be done only once, however is fully available to anyone wishing to keep using it for cheap! \nSpawnlist: Characters 0 - 21. \nSpawnable with !spawn b/beginner.\`\`\``)
        .setFooter(`Spawn results are random from the given spawn pool! There is no garantee you will spawn the character you want, please stay up to date with what characters appear in what spawns.`)
            beg.addField(`Chances:`, `\`\`\`Shadow: 50% \nPhantom: 35% \nReflection: 12% \nGlitch: 3%\`\`\``)
        message.channel.send(beg)
    }

    else if (args[0] == "heroic" || args[0] == "h") {

        const Discord = require(`discord.js`);
        const her = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle("Heroic Spawn Information!")
        .setAuthor(message.author.username)
        .setImage(`https://i.imgur.com/yKGPPbZ.gif`)
        .addField(`Cost:`, `500 shards`)
        .addField(`About:`, `\`\`\`The standard spawn, featuring some more specefic characters. \nSpawnlist: All (Non-event) Characters! (For more information see the collection command). \nSpawnable with !spawn h/heroic.\`\`\``)
        .setFooter(`Spawn results are random from the given spawn pool! There is no garantee you will spawn the character you want, please stay up to date with what characters appear in what spawns.`)
        her.addField(`Chances:`, `\`\`\`Shadow: 35% \nPhantom: 30% \nReflection: 25% \nGlitch: 10%\`\`\``)
        message.channel.send(her)
    }

    else if (args[0] == "selecion" || args[0] == "s"){
        const Discord = require(`discord.js`)
        const sel = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`Selection spawn Information!`)
        .setImage(`https://i.imgur.com/nsit4Nn.gif`)
        .addField(`Cost`, `10 glimmer`)
        .addField(`About:`, `\`\`\`A spawn for the glimmer you obtain for completing all quests, features all original characters! Include the collection ID after selection/s for that character. \nSpawnlist: All base characters (0 - 21). \nSpawnable with !spawn s [ID of character you wish to spawn.]\`\`\``)
            sel.addField(`Chances:`, `\`\`\`Shadow: 33% \nPhantom: 37% \nReflection: 26% \nGlitch: 4%\`\`\``)
        message.channel.send(sel)
    }

    else if (args[0] == "event" || args[0] == "e") {

        const activespawn = client.profile.get('617362855775305728', "spawns")
        const name = client.spawns.spawns[activespawn].name
        const cost = client.spawns.spawns[activespawn].cost
        const desc = client.spawns.spawns[activespawn].description
        const pewl = client.spawns.spawns[activespawn].pool
        const last = client.spawns.spawns[activespawn].duration
        const img = client.spawns.spawns[activespawn].image
        const feat = client.spawns.spawns[activespawn].featured
        var featured = feat[Math.floor(Math.random() * feat.length)];
        const featimg = client.units.units[featured].image
        var featname = []
        for(i=0;i<feat.length;i++){
            let fet = feat[i]
            let fname = client.units.units[fet].name
            featname.push(`${fname}`)
        }
        let showf = featname.join(", ")
        let array = []

        for(i=0;i<pewl.length;i++){
            let char = pewl[i]
            let namep = client.units.units[char].name
            array.push(`${namep}`)
        }
        let show = array.join(", ")

        const Discord = require(`discord.js`);
        const ev = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle("Event Spawn Information!")
        .setImage(img)
        .setThumbnail(featimg)
        .addField(`${name}`, `Featured characters: \n \`${featname}\``)
        .addField(`Cost:`, `${cost} shards`)
        .addField(`About:`, `\`\`\`${desc}\`\`\` \`\`\`Spawnlist: ${show}.\`\`\` \`\`\`Spawnable with !spawn e/event. \`\`\``)
        .setFooter(`Spawn results are random from the given spawn pool! There is no garantee you will spawn the character you want, please stay up to date with what characters appear in what spawns.`)
            ev.addField(`Chances:`, `\`\`\`Shadow: 25% \nPhantom: 30% \nReflection: 35% \nGlitch: 10%\`\`\``)
        message.channel.send(ev)
    }
    else if (args[0] == "duplicate" || args[0] == "d"){
        let Discord = require(`discord.js`)
        let dupe = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`Duplicate Spawn Information!`)
        .addField(`Cost:`, `2000 shards`)
        .addField(`About:`, `\`\`\`A spawn that summons another of any character you have chosen! \nSpawnlist: Any held character. \nSpawnable with !spawn d/duplicate\`\`\``)
        .setFooter(`Spawn results are random from the given spawn pool! There is no garantee you will spawn the character you want, please stay up to date with what characters appear in what spawns.`)
        .addField(`Chances:`, `\`\`\`Shadow: 25% \nPhantom: 20% \nReflection: 35% \nGlitch: 10%\`\`\``)
        .setImage(`https://i.imgur.com/NkcgBUd.gif`)
        message.channel.send(dupe)
    }
    else {
        message.channel.send("This is not a valid spawn!")
    }
}