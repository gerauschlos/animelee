exports.run = (client, message, args) => {

    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "chosen")){
        return message.channel.send(`Please \`${client.config.prefix}choose\` a character!`)
    }
    if(!client.profile.get(message.author.id, "questing") == 0){
        return message.channel.send(`You are already in battle!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please include the number of the quest you are doing! (Story quests are 1.)`)
    }

    let checking = parseInt(args[0])
    if(checking == 2){
        if(!client.holiday.has(message.author.id)){
            return message.channel.send(`You do not have active event quests right now!`)
        }
        else if(!client.holiday.has(message.author.id, "quests")){
            return message.channel.send(`You do not have active event quests right now!`)
        }
        else if(client.holiday.get(message.author.id, "quests").length <= 0){
            return message.channel.send(`You do not have active event quests right now!`)
        }
        let quests = client.holiday.get(message.author.id, "quests")
            let questkey = quests[0];
            let name = client.quests.events[questkey].name
            let desc = client.quests.events[questkey].description
            let img = client.quests.events[questkey].img
            let obj = client.quests.events[questkey].objective
            let r1 = client.quests.events[questkey].rewards.gold
            let r2 = client.quests.events[questkey].rewards.shards
            let r3 = client.quests.events[questkey].rewards.glimmer
            const Discord = require(`discord.js`)
            let embarke = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`You are about to embark on the event ${name}!`)
            .setDescription(`Set out or return?`)
            .addField(`Objective:`, `${obj}`)
            .addField(`Story:`, `${desc}`)
            .addField(`Rewards:`, `*Recieved upon boss completion!*`)
            .addField(`Gold:`, `${r1}`)
            .addField(`Shards:`, `${r2}`)
            .addField(`Glimmer:`, `${r3}`)
            .setImage(img)
            .setTimestamp()
            message.channel.send(embarke).then(sentEmbed => {
                sentEmbed.react('✅')
                .then(() => sentEmbed.react('⛔'))

                const filter = (reaction, user) => {
                    return ['✅', '⛔'].includes(reaction.emoji.name) && user.id == message.author.id;
                };
                const collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                collector.on('collect', (reaction, reactionCollector) => {
                    const reacted = reaction.emoji.name

                if(reacted == '✅'){
                    message.channel.send(`Quest accepted!`)
                    client.profile.set(message.author.id, message.channel.id, "questing")
                    let quester = message.author.id
                    let chosen = client.profile.get(quester, "chosen")
                    client.characters.set(chosen, 100, "Health")
                    const spawned = client.quests.events[questkey].waves[0].enemy
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
            
                client.battles.set(message.channel.id, {hp: health, atk: atk, matk: matk, def: def, mdef: mdef, spd: spd, id: spawned, Turn: 0, quest: questkey, wave: 0, quester: quester, inter: 1, event: 1})
                message.channel.send(spawn)


                }
                })
            })
    }
    if(checking == 1){
    if(client.profile.get(message.author.id, "quests") >= client.quests.quests.length){
        return message.channel.send(`You do not have a quest to embark on here!`)
    }
    let quests = client.profile.get(message.author.id, "quests")
    if (0 < checking && checking <= quests.length){
        let questkey = quests[checking - 1];

        let name = client.quests.quests[questkey].name
        let desc = client.quests.quests[questkey].description 
        let img = client.quests.quests[questkey].img
        let obj = client.quests.quests[questkey].objective
        let r1 = client.quests.quests[questkey].rewards.gold
        let r2 = client.quests.quests[questkey].rewards.shards
        let r3 = client.quests.quests[questkey].rewards.glimmer
        const Discord = require(`discord.js`)
        const embark = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`You are about to embark on the quest ${name}!`)
            .setDescription(`Set out or Return?`)
            .addField(`Objective:`, `${obj}`)
            .addField(`Story:`, `${desc}`)
            .addField(`Rewards:`, `*Received upon boss completion!*`)
            .addField(`Gold:`, `${r1}`)
            .addField(`Shards`, `${r2}`)
            .addField(`Glimmer`, `${r3}`)
            .setImage(img)
            .setTimestamp()
            message.channel.send(embark).then(sentEmbed => {
                sentEmbed.react('✅')
               .then(() => sentEmbed.react('⛔'))
    
               const filter = (reaction, user) => {
                return ['✅', '⛔'].includes(reaction.emoji.name) && user.id == message.author.id;
            };
            const collector = sentEmbed.createReactionCollector(filter, { time: 1500000 });

        collector.on('collect', (reaction, reactionCollector) => {
        const reacted = reaction.emoji.name

        if(reacted == `✅`) {
            if(client.battles.has(message.channel.id)){
            return message.channel.send(`There is an enemy blocking your way, defeat it or exit before continuing`)
            }
            if(!client.battles.has(message.channel.id)){
                message.channel.send(`Quest Accepted!`)
                client.profile.set(message.author.id, message.channel.id, "questing")
                const quester = message.author.id
                const chosen = client.profile.get(message.author.id, "chosen")
                client.characters.set(chosen, 100, "Health")
                const spawned = client.quests.quests[questkey].waves[0].enemy
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
            
                client.battles.set(message.channel.id, {hp: health, atk: atk, matk: matk, def: def, mdef: mdef, spd: spd, id: spawned, Turn: 0, quest: questkey, wave: 0, quester: quester, inter: 1})
                message.channel.send(spawn)
            } 
        }
        if(reacted == `⛔`){
            return message.channel.send(`Embark canceled`)
        }
    })
})
}
}}