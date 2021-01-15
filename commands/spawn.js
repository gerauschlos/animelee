exports.run = (client, message, args) => {


    if(!client.profile.has(message.author.id)){
        return message.channel.send("You havent started!")
     };

    const gold = client.profile.get(message.author.id, "gold");
    const shards = client.profile.get(message.author.id, "shards");
    const characters = client.profile.get(message.author.id, "characters")
    const prefix = client.config.prefix
    const Discord = require('discord.js');

    if (!client.profile.has(message.author.id)){
        return message.channel.send("You cannot spawn because you have not started!")
     }

    else if (args.length == 0) {
        message.channel.send("Please include the name of the spawn you would like to do!");
        return; }

    else if (characters.length == 50) {
       return message.channel.send(`You have reached your character limit! To continue spawning please clear one from your inventory with \`${prefix}dis\``)
    }
    var donated = 0
    if(client.profile.has(message.author.id, "donated")){
        var donated = client.profile.get(message.author.id, "donated")
    }
    if(client.profile.has(message.author.id, "daily")){
        let dailies = client.profile.get(message.author.id, "daily")
        if(dailies.includes[7]){
            client.profile.remove(message.author.id, 7, "daily")
            let Discord = require(`discord.js`)
            let accomplished = new Discord.RichEmbed()
            .setColor(`#ffff00`)
            .setTitle(`Daily Mission Accomplished!`)
            .setDescription(`You have completed a daily mission and recieved the following rewards.`)
            .setThumbnail(message.author.avatarURL)
            .addField(`Rewards:`, `Shards: \`${client.missions.daily[7].shards}\` \nGold: \`${client.missions.daily[7].gold}\` \nGlimmer: \`${client.missions.daily[7].glimmer}\``)
            .setFooter(`This mission has been removed from your !missions.`)
            .setTimestamp()
            message.channel.send(accomplished)
            client.profile.math(message.author.id, "+", client.missions.daily[7].shards, "shards")
            client.profile.math(message.author.id, "+", client.missions.daily[7].gold, "gold")
            client.profile.math(message.author.id, "+", client.missions.daily[7].glimmer, "glimmer")
        }
    }
    if (args[0] == "beginner" || args[0] == "b") {
        if (shards < 100) {
            message.channel.send(`You do not have the shards to preform this spawn!`);
            return; };
        var chance = Math.round(Math.random() * 100)
        if(donated > 0){
            var chance = Math.round(Math.random() * 105)
        }
            if(chance < 50){
                var rng = 0
            }
            if(50 <= chance && chance < 85){
                var rng = 1
            }
            if(85 <= chance && chance < 97){
                var rng = 2
            }
            if(97 <= chance && chance <= 110){
                var rng = 3
            }
        let name = client.levels.rares[rng].name
        let min = client.levels.rares[rng].min
        let max = client.levels.rares[rng].max
        let col = client.levels.rares[rng].color
        let img = client.levels.rares[rng].img
        let em = client.levels.rares[rng].emote
        let emote = client.emojis.get(em)
        const spawned = Math.floor(Math.random() * 22);
        const newspawnn = client.characters.autonum
        const spawnedname = client.units.units[spawned].name
        var spawnedimage = client.units.units[spawned].image
        if(rng == 3){
            var spawnedimage = client.units.units[spawned].gimg
        }
        const spawneddescription = client.units.units[spawned].description
        const spanwedseries = client.units.units[spawned].series
        const spawnedclass = client.units.units[spawned].class
        const spawnedhp = client.units.units[spawned].hp
        var spawnedatk = client.units.units[spawned].atk
        var spawnedmatk = client.units.units[spawned].matk
        var spawneddef = client.units.units[spawned].def
        var spawnedmdef = client.units.units[spawned].mdef
        var spawnedspd = client.units.units[spawned].spd

        let ress = Math.round((Math.random() * (max - min) + min)* 100) / 100
        let resa = Math.round((Math.random() * (max - min) + min)* 100) / 100 
        let resm = Math.round((Math.random() * (max - min) + min)* 100) / 100 
        let resd = Math.round((Math.random() * (max - min) + min)* 100) / 100 
        let resmd = Math.round((Math.random() * (max - min) + min)* 100) / 100

        var spawnedspd = Math.round(ress * spawnedspd)
        var spawnedatk = Math.round(resa * spawnedatk)
        var spawnedmatk = Math.round(resm * spawnedmatk)
        var spawneddef = Math.round(resd * spawneddef)
        var spawnedmdef = Math.round(resmd * spawnedmdef)

        let total = spawnedspd + spawnedatk + spawnedmatk + spawneddef + spawnedmdef
        
        client.characters.set(newspawnn, {Name: spawnedname, Image: spawnedimage, Desc: spawneddescription, Series: spanwedseries, Class: spawnedclass, Health: spawnedhp, Atk: spawnedatk, Matk: spawnedmatk, Def: spawneddef, Mdef: spawnedmdef, Spd: spawnedspd, ID: newspawnn, Lib: spawned, Level: 0, Abilities: [], Exp: 0, Reinforced: 0, rarity: rng})
        client.profile.math(message.author.id, "-", 100, "shards")
        client.profile.push(message.author.id, newspawnn, "characters")
        const level = client.characters.get(newspawnn, "Level")

    const beginner = new Discord.RichEmbed()
    .setColor(col)
    .setTitle(`**:crossed_swords:Congratulations!:crossed_swords:**`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`You preformed a Beginner spawn and summoned ${spawnedname} for \`100\` Shards!`)
    .setThumbnail('https://i.imgur.com/k8mdsJe.gif')
    .addField(`**Spawned character:**`, `${spawnedname} Lvl \`${level}\`- \`${total}\` Total.`)
    .addField(`|${emote}| ${name} Rarity Bonus: `, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
    .setImage(spawnedimage)
    .setTimestamp()
    .setFooter(`Spawned by ${message.author.username}! To check your characters now use the ${prefix}characters command`)

    return message.channel.send(beginner);

    }

    else if (args[0] == "heroic" || args[0] == "h") {

        if (shards < 500) {
            message.channel.send(`You do not have the shards to preform this spawn!`);
            return; };
            var chance = Math.round(Math.random() * 100)
            if(donated > 0){
                var chance = Math.round(Math.random() * 105)
            }
            if(chance < 35){
                var rng = 0
            }
            if(35 <= chance && chance < 65){
                var rng = 1
            }
            if(65 <= chance && chance < 90){
                var rng = 2
            }
            if(90 <= chance && chance <= 110){
                var rng = 3
            }
        let name = client.levels.rares[rng].name
        let min = client.levels.rares[rng].min
        let max = client.levels.rares[rng].max
        let col = client.levels.rares[rng].color
        let img = client.levels.rares[rng].img
        let em = client.levels.rares[rng].emote
        let emote = client.emojis.get(em)

        let array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,30,31,32,45,46,49,50,23,24,25,26,27,34,35,36,37,38,39,40,41,42]
        var spawned = array[Math.floor(Math.random() * array.length)];
        const newspawnn = client.characters.autonum
        const spawnedname = client.units.units[spawned].name
        var spawnedimage = client.units.units[spawned].image
        const spawneddescription = client.units.units[spawned].description
        const spanwedseries = client.units.units[spawned].series
        const spawnedclass = client.units.units[spawned].class
        const spawnedhp = client.units.units[spawned].hp
        var spawnedatk = client.units.units[spawned].atk
        var spawnedmatk = client.units.units[spawned].matk
        var spawneddef = client.units.units[spawned].def
        var spawnedmdef = client.units.units[spawned].mdef
        var spawnedspd = client.units.units[spawned].spd
        if(rng == 3){
            var spawnedimage = client.units.units[spawned].gimg
        }

        let ress = Math.round((Math.random() * (max - min) + min)* 100) / 100
        let resa = Math.round((Math.random() * (max - min) + min)* 100) / 100 
        let resm = Math.round((Math.random() * (max - min) + min)* 100) / 100 
        let resd = Math.round((Math.random() * (max - min) + min)* 100) / 100 
        let resmd = Math.round((Math.random() * (max - min) + min)* 100) / 100

        var spawnedspd = Math.round(ress * spawnedspd)
        var spawnedatk = Math.round(resa * spawnedatk)
        var spawnedmatk = Math.round(resm * spawnedmatk)
        var spawneddef = Math.round(resd * spawneddef)
        var spawnedmdef = Math.round(resmd * spawnedmdef)

        let total = spawnedspd + spawnedatk + spawnedmatk + spawneddef + spawnedmdef

        client.characters.set(newspawnn, {Name: spawnedname, Image: spawnedimage, Desc: spawneddescription, Series: spanwedseries, Class: spawnedclass, Health: spawnedhp, Atk: spawnedatk, Matk: spawnedmatk, Def: spawneddef, Mdef: spawnedmdef, Spd: spawnedspd, ID: newspawnn, Lib: spawned, Level: 0, Abilities: [], Exp: 0, Reinforced: 0, rarity: rng})
        client.profile.math(message.author.id, "-", 500, "shards")
        client.profile.push(message.author.id, newspawnn, "characters")
        const level = client.characters.get(newspawnn, "Level")

    const heroic = new Discord.RichEmbed()
    .setColor(col)
    .setTitle(`**Congratulations!**`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`You preformed a Heroic spawn and summoned ${spawnedname} for \`500\` Shards!`)
    .setThumbnail('https://i.imgur.com/yKGPPbZ.gif')
    .addField(`**Spawned character:**`, `${spawnedname} Lvl \`${level}\`- \`${total}\` Total.`)
    .addField(`|${emote}| ${name} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
    .setImage(spawnedimage)
    .setTimestamp()
    .setFooter(`Spawned by ${message.author.username}! To check your characters now use the ${prefix}characters command`)

        return message.channel.send(heroic);
    }

    else if (args[0] == "event" || args[0] == "e") {
        const up = client.profile.get('617362855775305728', "spawns")
        let cost = client.spawns.spawns[up].cost
        if (shards < cost) {
            message.channel.send(`You do not have the shards to preform this spawn!`);
            return; };
            if(up == 0){
                return message.channel.send(`There is no event spawn up at this time!`)
            }
            var chance = Math.round(Math.random() * 100)
            if(donated > 0){
                var chance = Math.round(Math.random() * 105)
            }
            if(chance < 35){
                var rng = 0
            }
            if(35 <= chance && chance < 65){
                var rng = 1
            }
            if(65 <= chance && chance < 90){
                var rng = 2
            }
            if(90 <= chance && chance <= 110){
                var rng = 3
            }
            if(!client.profile.has(message.author.id, "spawned")){
                client.profile.set(message.author.id, 0, "spawned")
            }
            client.profile.math(message.author.id, "+", 1, "spawned")
            const array = client.spawns.spawns[up].pool
            const newspawnn = client.characters.autonum
            var spawned = array[Math.floor(Math.random() * array.length)];
            if(client.profile.get(message.author.id, "spawned") >= 10){
                let featured = client.spawns.spawns[up].featured
                var spawned = featured[Math.floor(Math.random() * featured.length)];
                var rng = 3
                client.profile.set(message.author.id, 0, "spawned")
            }
            let name = client.levels.rares[rng].name
            let min = client.levels.rares[rng].min
            let max = client.levels.rares[rng].max
            let col = client.levels.rares[rng].color
            let img = client.levels.rares[rng].img
            let em = client.levels.rares[rng].emote
            let emote = client.emojis.get(em)

            const spawnedname = client.units.units[spawned].name
            var spawnedimage = client.units.units[spawned].image
            const spawneddescription = client.units.units[spawned].description
            const spanwedseries = client.units.units[spawned].series
            const spawnedclass = client.units.units[spawned].class
            const spawnedhp = client.units.units[spawned].hp
            var spawnedatk = client.units.units[spawned].atk
            var spawnedmatk = client.units.units[spawned].matk
            var spawneddef = client.units.units[spawned].def
            var spawnedmdef = client.units.units[spawned].mdef
            var spawnedspd = client.units.units[spawned].spd
            if(rng == 3){
                var spawnedimage = client.units.units[spawned].gimg
            }
    
            let ress = Math.round((Math.random() * (max - min) + min)* 100) / 100
            let resa = Math.round((Math.random() * (max - min) + min)* 100) / 100 
            let resm = Math.round((Math.random() * (max - min) + min)* 100) / 100 
            let resd = Math.round((Math.random() * (max - min) + min)* 100) / 100 
            let resmd = Math.round((Math.random() * (max - min) + min)* 100) / 100
    
            var spawnedspd = Math.round(ress * spawnedspd)
            var spawnedatk = Math.round(resa * spawnedatk)
            var spawnedmatk = Math.round(resm * spawnedmatk)
            var spawneddef = Math.round(resd * spawneddef)
            var spawnedmdef = Math.round(resmd * spawnedmdef)

            let total = spawnedspd + spawnedatk + spawnedmatk + spawneddef + spawnedmdef

            client.characters.set(newspawnn, {Name: spawnedname, Image: spawnedimage, Desc: spawneddescription, Series: spanwedseries, Class: spawnedclass, Health: spawnedhp, Atk: spawnedatk, Matk: spawnedmatk, Def: spawneddef, Mdef: spawnedmdef, Spd: spawnedspd, ID: newspawnn, Lib: spawned, Level: 0, Abilities: [], Exp: 0, Reinforced: 0, rarity: rng})
            client.profile.math(message.author.id, "-", cost, "shards")
            client.profile.push(message.author.id, newspawnn, "characters")
            const level = client.characters.get(newspawnn, "Level")

            const event = new Discord.RichEmbed()
            .setColor(col)
            .setTitle(`**Congratulations!** You preformed an Event spawn and summoned ${spawnedname}!!`)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(`You have used \`${cost}\` Shards!`)
            .setThumbnail(client.spawns.spawns[up].image)
            .addField(`**Spawned character:**`, `${spawnedname} Lvl \`${level}\`- \`${total}\` Total.`)
            .addField(`|${emote}| ${name} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
            .setImage(spawnedimage)
            .setTimestamp()
            .setFooter(`Spawned by ${message.author.username}! To check your characters now use the ${prefix}characters command`)
        
        return message.channel.send(event);
    }

        else if(args[0] == "selection" || args[0] == "s"){
            if(args.length == 1){
                return message.channel.send(`Include the collection ID of the character you wish to spawn, to view collection ID's please see \`${prefix}collection\``)
            }
            if(args.length == 2){
                if (isNaN(args[1])) {
                    return message.channel.send(`This is not a valid character!`)
                }
                const checkies = parseInt(args[1])
                const spawnable = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,45,46]
                if(!spawnable.includes(checkies)){
                    return message.channel.send(`This character is not available to selection spawn!`)
                }
                if(client.profile.get(message.author.id, "glimmer") < 10){
                    return message.channel.send(`You do not have enough glimmer to preform this spawn!`)
                }
                else{
                var chance = Math.round(Math.random() * 100)
                if(donated > 0){
                    var chance = Math.round(Math.random() * 105)
                }
                if(chance < 35){
                    var rng = 0
                }
                if(35 <= chance && chance < 70){
                    var rng = 1
                }
                if(70 <= chance && chance < 97){
                    var rng = 2
                }
                if(97 <= chance && chance <= 110){
                    var rng = 3
                }
                let name = client.levels.rares[rng].name
                let min = client.levels.rares[rng].min
                let max = client.levels.rares[rng].max
                let col = client.levels.rares[rng].color
                let img = client.levels.rares[rng].img
                let em = client.levels.rares[rng].emote
                let emote = client.emojis.get(em)

                 const spawned = parseInt(args[1])
                 const newspawnn = client.characters.autonum
                 const spawnedname = client.units.units[spawned].name
                 var spawnedimage = client.units.units[spawned].image
                 const spawneddescription = client.units.units[spawned].description
                 const spanwedseries = client.units.units[spawned].series
                 const spawnedclass = client.units.units[spawned].class
                 const spawnedhp = client.units.units[spawned].hp
                 var spawnedatk = client.units.units[spawned].atk
                 var spawnedmatk = client.units.units[spawned].matk
                 var spawneddef = client.units.units[spawned].def
                 var spawnedmdef = client.units.units[spawned].mdef
                 var spawnedspd = client.units.units[spawned].spd

                 if(rng == 3){
                    var spawnedimage = client.units.units[spawned].gimg
                }
        
                let ress = Math.round((Math.random() * (max - min) + min)* 100) / 100
                let resa = Math.round((Math.random() * (max - min) + min)* 100) / 100 
                let resm = Math.round((Math.random() * (max - min) + min)* 100) / 100 
                let resd = Math.round((Math.random() * (max - min) + min)* 100) / 100 
                let resmd = Math.round((Math.random() * (max - min) + min)* 100) / 100
        
                var spawnedspd = Math.round(ress * spawnedspd)
                var spawnedatk = Math.round(resa * spawnedatk)
                var spawnedmatk = Math.round(resm * spawnedmatk)
                var spawneddef = Math.round(resd * spawneddef)
                var spawnedmdef = Math.round(resmd * spawnedmdef)
    
                let total = spawnedspd + spawnedatk + spawnedmatk + spawneddef + spawnedmdef
            client.characters.set(newspawnn, {Name: spawnedname, Image: spawnedimage, Desc: spawneddescription, Series: spanwedseries, Class: spawnedclass, Health: spawnedhp, Atk: spawnedatk, Matk: spawnedmatk, Def: spawneddef, Mdef: spawnedmdef, Spd: spawnedspd, ID: newspawnn, Lib: spawned, Level: 0, Abilities: [], Exp: 0, Reinforced: 0, rarity: rng})
            client.profile.math(message.author.id, "-", 10, "glimmer")
            client.profile.push(message.author.id, newspawnn, "characters")
            const level = client.characters.get(newspawnn, "Level")

            const event = new Discord.RichEmbed()
            .setColor(col)
            .setTitle(`**Congratulations!** You preformed a Selection spawn and summoned ${spawnedname}!!`)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(`You have used \`10\` glimmer!`)
            .setThumbnail(`https://i.imgur.com/RJdIOaG.gif`)
            .addField(`**Spawned character:**`, `${spawnedname} Lvl \`${level}\`- \`${total}\` Total.`)
            .addField(`|${emote}| ${name} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
            .setImage(spawnedimage)
            .setTimestamp()
            .setFooter(`Spawned by ${message.author.username}! To check your characters now use the ${prefix}characters command`)
        
        return message.channel.send(event);

                }
        }
        }
        else if(args[0] == "duplicate" || args[0] == "d"){
            var chance = Math.round(Math.random() * 100)
            if(donated > 0){
                var chance = Math.round(Math.random() * 105)
            }
            if(shards < 2000){
                return message.channel.send(`You do not have the shards to afford this spawn.`)
            }

                if(chance < 25){
                    var rng = 0
                }
                if(35 <= chance && chance < 55){
                    var rng = 1
                }
                if(55 <= chance && chance < 90){
                    var rng = 2
                }
                if(90 <= chance && chance <= 110){
                    var rng = 3
                }
                let name = client.levels.rares[rng].name
                let min = client.levels.rares[rng].min
                let max = client.levels.rares[rng].max
                let col = client.levels.rares[rng].color
                let img = client.levels.rares[rng].img
                let em = client.levels.rares[rng].emote
                let emote = client.emojis.get(em)
            let chosen = client.profile.get(message.author.id, "chosen")
            var spawned = client.characters.get(chosen, "Lib")
            if(spawned == 57 || spawned == 58){
                let checkrng = Math.round(Math.random() * 10)
                if(checkrng !== 5){
                var spawned = Math.round(Math.random() * 22)
                }
            }
                 const newspawnn = client.characters.autonum
                 const spawnedname = client.units.units[spawned].name
                 var spawnedimage = client.units.units[spawned].image
                 const spawneddescription = client.units.units[spawned].description
                 const spanwedseries = client.units.units[spawned].series
                 const spawnedclass = client.units.units[spawned].class
                 const spawnedhp = client.units.units[spawned].hp
                 var spawnedatk = client.units.units[spawned].atk
                 var spawnedmatk = client.units.units[spawned].matk
                 var spawneddef = client.units.units[spawned].def
                 var spawnedmdef = client.units.units[spawned].mdef
                 var spawnedspd = client.units.units[spawned].spd
                 if(rng == 3){
                    var spawnedimage = client.units.units[spawned].gimg
                }
        
                let ress = Math.round((Math.random() * (max - min) + min)* 100) / 100
                let resa = Math.round((Math.random() * (max - min) + min)* 100) / 100 
                let resm = Math.round((Math.random() * (max - min) + min)* 100) / 100 
                let resd = Math.round((Math.random() * (max - min) + min)* 100) / 100 
                let resmd = Math.round((Math.random() * (max - min) + min)* 100) / 100
        
                var spawnedspd = Math.round(ress * spawnedspd)
                var spawnedatk = Math.round(resa * spawnedatk)
                var spawnedmatk = Math.round(resm * spawnedmatk)
                var spawneddef = Math.round(resd * spawneddef)
                var spawnedmdef = Math.round(resmd * spawnedmdef)
    
                let total = spawnedspd + spawnedatk + spawnedmatk + spawneddef + spawnedmdef
            client.characters.set(newspawnn, {Name: spawnedname, Image: spawnedimage, Desc: spawneddescription, Series: spanwedseries, Class: spawnedclass, Health: spawnedhp, Atk: spawnedatk, Matk: spawnedmatk, Def: spawneddef, Mdef: spawnedmdef, Spd: spawnedspd, ID: newspawnn, Lib: spawned, Level: 0, Abilities: [], Exp: 0, Reinforced: 0, rarity: rng})
            client.profile.math(message.author.id, "-", 2000, "shards")
            client.profile.push(message.author.id, newspawnn, "characters")
            const level = client.characters.get(newspawnn, "Level")

            const event = new Discord.RichEmbed()
            .setColor(col)
            .setTitle(`**Congratulations!** You preformed a Duplicate spawn and summoned ${spawnedname}!!`)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(`You have used \`2000\` shards`)
            .setThumbnail(`https://i.imgur.com/RJdIOaG.gif`)
            .addField(`**Spawned character:**`, `${spawnedname} Lvl \`${level}\`- \`${total}\` Total.`)
            .addField(`|${emote}| ${name} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
            .setImage(spawnedimage)
            .setTimestamp()
            .setFooter(`Spawned by ${message.author.username}! To check your characters now use the ${prefix}characters command`)
        
        return message.channel.send(event);
            
        }
        message.channel.send(`That is not a valid spawn! To check current spawns, please try \`${client.config.prefix}spawns\`!`)

}