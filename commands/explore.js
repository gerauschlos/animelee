exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not stareted Animelee!`)
    }
    if(client.profile.get(message.author.id, "rank") < 5){
        return message.channel.send(`You must complete 5 quests in order to explore an area!`)
    }
    if(!client.profile.has(message.author.id, "chosen")){
        return message.channel.send(`Please !choose a character before proceeding.`)
    }
    if(client.profile.get(message.author.id, "questing") !== 0){
        return message.channel.send(`You cannot explore an area if you are in battle!`)
    }
    if(args.length == 0){
        return message.channel.send(`Include the area you would like to explore.`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid location to explore!`)
    }
    let rank = client.profile.get(message.author.id, "rank")
    if(rank < 5){
        var locs = []
    }
    if(4 < rank){
        var locs = [0]
    }
    if(10 < rank){
        var locs = [0,1]
    }
    if(16 < rank){
        var locs = [0,1,2]
    }
    if(19 < rank){
        var locs = [0,1,2,3]
    }
    if(23 < rank){
        var locs = [0,1,2,3,4]
    }
    if(32 < rank){
        var locs = [0,1,2,3,4,5]
    }
    if(40 < rank){
        var locs = [0,1,2,3,4,5,6]
    }
    if(53 < rank){
        var locs = [0,1,2,3,4,5,6,7]
    }
    if(67 < rank){
        var locs = [0,1,2,3,4,5,6,7,8]
    }
    if(70 < rank){
        var locs = [0,1,2,3,4,5,6,7,8,9]
    }
    if(89 < rank){
        var locs = [0,1,2,3,4,5,6,7,8,9,11]
    }
    if(client.active.active[0].event == 1){
        locs.push(10)
    }
    let cost = 100
    if(client.profile.get(message.author.id, "gold") < cost){
        return message.channel.send(`You cannot afford to go on an expedition!`)
    }
    let Discord = require(`discord.js`)
    let checking = parseInt(args[0])
    if(checking > locs.length){
        return message.channel.send(`This area is still locked for you!`)
    }
    if(client.profile.has(message.author.id, "daily")){
        let dailies = client.profile.get(message.author.id, "daily")
        if(dailies.includes(0)){
        client.profile.math(message.author.id, "+", 1, "expd")
        if(client.profile.get(message.author.id, "expd") == 10){
            client.profile.remove(message.author.id, 0, "daily")
            let shards = client.missions.daily[0].shards
            let gold = client.missions.daily[0].gold
            let glimmer = client.missions.daily[0].glimmer
            let accomplished = new Discord.RichEmbed()
            .setColor(`#ffff00`)
            .setTitle(`Daily Mission Accomplished!`)
            .setDescription(`You have completed a daily mission and recieved the following rewards.`)
            .addField(`Rewards:`, `Shards: \`${shards}\` \nGold: \`${gold}\` \nGlimmer: \`${glimmer}\``)
            .setThumbnail(message.author.avatarURL)
            .setFooter(`This mission has been removed from your !missions.`)
            .setTimestamp()
            message.channel.send(accomplished)
            client.profile.math(message.author.id, "+", shards, "shards")
            client.profile.math(message.author.id, "+", gold, "gold")
            client.profile.math(message.author.id, "+", glimmer, "glimmer")
        }
        }
    }
    if(0 < checking && checking <= locs.length){
        let lockey = parseInt(locs[checking - 1])
        let img = client.locs.locs[lockey].img
        let namc = client.locs.locs[lockey].name
        let array = client.locs.locs[lockey].spawnlist
        client.profile.math(message.author.id, "-", cost, "gold")
        let chance = Math.floor(Math.random() * 100)
        if(chance <= 10){
            client.battles.set(message.channel.id, 0, "cot")
           let eggfind = new Discord.RichEmbed()
           .setColor(`#55ff55`)
           .setTitle(`You find something ha- 8885:- ha-ha-hhhh---`)
           .setDescription(`Display 0047 failed.`)
           .setImage(`https://i.imgur.com/Eij1Qwm.gif`)
           .setFooter(`Proceeding to next input.`)
           return message.channel.send(eggfind)
        }
        else if(chance > 10 && chance < 35){
            let itemspawn = Math.floor((Math.random() * 3) + 2)
            let name = client.items.items[itemspawn].name
            let desc = client.items.items[itemspawn].description
            let cap = client.items.items[itemspawn].capacity
            let myitems = client.profile.get(message.author.id, "items")
            const held = myitems.reduce((total,x) => (x==itemspawn ? total+1 : total), 0)
            if(held >= cap){
                return message.channel.send(`You found nothing on your expedition!`)
            }
        client.profile.push(message.author.id, itemspawn, "items", true)
        let itempull = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`You found a ${name}!`)
        .setDescription(`${desc}`)
        .setThumbnail(img)
        .setFooter(`To check your items use !inv.`)
        .setTimestamp()
        return message.channel.send(itempull)
        }
        else if(25 <= chance && chance < 67){
        let chosen = client.profile.get(message.author.id, "chosen")
        let spawned = array[Math.floor(Math.random() * array.length)]
        client.characters.set(chosen, 100, "Health")
        const name = client.mobs.mobs[spawned].name
        const health = client.mobs.mobs[spawned].hp
        const atk = client.mobs.mobs[spawned].atk
        const matk = client.mobs.mobs[spawned].matk
        const def = client.mobs.mobs[spawned].def
        const mdef = client.mobs.mobs[spawned].mdef
        const spd = client.mobs.mobs[spawned].spd
        const desc = client.mobs.mobs[spawned].description
        const imgc = client.mobs.mobs[spawned].image
        let clas = client.mobs.mobs[spawned].class
        let ig = client.classes.classes[clas].img
        let nme = client.classes.classes[clas].name
        const prefix = client.config.prefix
        const Discord = require(`discord.js`)
        const spawn = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setAuthor(nme, ig)
        .setTitle(`**Wild ${name}**`)
        .setDescription(`${desc}`)
        .addField(`Health`, `\`\`\`${health}\`\`\``)
        .setImage(imgc)
        .setThumbnail(img)
        .setFooter(`To fight it use the ${prefix}attack command!`)
        .setTimestamp()
    
        client.battles.set(message.channel.id, {hp: health, atk: atk, matk: matk, def: def, mdef: mdef, spd: spd, id: spawned, Turn: 0})
        return message.channel.send(spawn)
        }
        else if(67 <= chance && chance < 70){
            let key = Math.floor((Math.random() * 4) + 6)
            client.profile.push(message.author.id, key, "items")
            let spawned = client.items.items[key].name
            let desc = client.items.items[key].description
            let keyfind = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`You found a ${spawned} while exploring the ${client.locs.locs[lockey].name}!`)
            .setDescription(`${desc}`)
            .setThumbnail(img)
            .setFooter(`To view your keys, check !inv.`)
            return message.channel.send(keyfind)
        }
        else if(70 <= chance && chance < 75){
            let gold = Math.floor((Math.random() * 1000) + 1)
            client.profile.math(message.author.id, "+", gold, "gold")
            let goldfind = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`You have found a pouch of gold on your expedition!`)
            .setDescription(`The pouch contains \`${gold}\` gold.`)
            .setFooter(message.author.username)
            .setTimestamp()
            return message.channel.send(goldfind)
        }
        else if(75 <= chance && chance < 80){
            if(lockey == 2){
                if(!client.profile.has(message.author.id, "record")){
                    client.profile.set(message.author.id, 0, "record")
                }
                let Discord = require(`discord.js`)
                let spire = new Discord.RichEmbed()
                .setColor(`#000000`)
                .setTitle(`Unholy Spire Discovered!`)
                .setDescription(`Where there was seemingly nothing before it, a spire now stands from the earth, a harsh opposition to the forces above.`)
                .addField(`Starting Floor: \`1\` [Normal]`, `Current Record: \`\`\`${client.profile.get(message.author.id, "record")}\`\`\``)
                .addField(`Rewards:`, `\`Unknown\``)
                .setImage(`https://i.imgur.com/RZDvGkI.png`)
                .setThumbnail(img)
                .setFooter(`Press !enter to continue with a full team. Costs 25 Thought Cradles | 25 Rock Encrusted Coins`)
                client.battles.delete(message.channel.id)
                client.battles.set(message.channel.id, message.author.id, "part")
                client.battles.set(message.channel.id, 1, "spire")
                return message.channel.send(spire)
            }
            let chosen = client.profile.get(message.author.id, "chosen")
                var spawned = 138
                client.characters.set(chosen, 100, "Health")
                const name = client.mobs.mobs[spawned].name
                const health = client.mobs.mobs[spawned].hp
                const atk = client.mobs.mobs[spawned].atk
                const matk = client.mobs.mobs[spawned].matk
                const def = client.mobs.mobs[spawned].def
                const mdef = client.mobs.mobs[spawned].mdef
                const spd = client.mobs.mobs[spawned].spd
                const desc = client.mobs.mobs[spawned].description
                const imgc = client.mobs.mobs[spawned].image
                let clas = client.mobs.mobs[spawned].class
                let nme = client.classes.classes[clas].name
                let ig = client.classes.classes[clas].img
                const prefix = client.config.prefix
                const Discord = require(`discord.js`)
                const spawn = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setAuthor(nme, ig)
                .setTitle(`**${name}**`)
                .setDescription(`${desc}`)
                .addField(`Health`, `\`\`\`${health}\`\`\``)
                .setImage(imgc)
                .setThumbnail(img)
                .setFooter(`To fight it use the ${prefix}attack command!`)
                .setTimestamp()
                client.battles.set(message.channel.id, {hp: health, atk: atk, matk: matk, def: def, mdef: mdef, spd: spd, id: spawned, Turn: 0})
                return message.channel.send(spawn)
        }
        else if(80 <= chance && chance < 85){
            let rando = Math.floor((Math.random() * 3) + 1)
            client.profile.math(message.author.id, "+", rando, "shards")
            let shardpull = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`You have found shards while exploring!`)
            .setDescription(`${rando} shards have been added to your balance!`)
            .setThumbnail(img)
            .setFooter(`To view your balance, use !bal`)
            .setTimestamp()
            return message.channel.send(shardpull)
        }
        else if(85 <= chance && chance < 95){
            if(lockey !== 6){
                let chosen = client.profile.get(message.author.id, "chosen")
                var spawned = 140
                client.characters.set(chosen, 100, "Health")
                const name = client.mobs.mobs[spawned].name
                const health = client.mobs.mobs[spawned].hp
                const atk = client.mobs.mobs[spawned].atk
                const matk = client.mobs.mobs[spawned].matk
                const def = client.mobs.mobs[spawned].def
                const mdef = client.mobs.mobs[spawned].mdef
                const spd = client.mobs.mobs[spawned].spd
                const desc = client.mobs.mobs[spawned].description
                const imgc = client.mobs.mobs[spawned].image
                let clas = client.mobs.mobs[spawned].class
                let nme = client.classes.classes[clas].name
                let ig = client.classes.classes[clas].img
                const prefix = client.config.prefix
                const Discord = require(`discord.js`)
                const spawn = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setAuthor(nme, ig)
                .setTitle(`**${name}**`)
                .setDescription(`${desc}`)
                .addField(`Health`, `\`\`\`${health}\`\`\``)
                .setImage(imgc)
                .setThumbnail(img)
                .setFooter(`To fight it use the ${prefix}attack command!`)
                .setTimestamp()
                client.battles.set(message.channel.id, {hp: health, atk: atk, matk: matk, def: def, mdef: mdef, spd: spd, id: spawned, Turn: 0})
                return message.channel.send(spawn)
            }
            if(client.profile.has(message.author.id, "daily")){
                let dailies = client.profile.get(message.author.id, "daily")
                if(dailies.has(11)){
                    client.profile.remove(message.author.id, 11, "daily")
                    let Discord = require(`discord.js`)
                    let accomplished = new Discord.RichEmbed()
                    .setColor(`#ffff00`)
                    .setTitle(`Daily Mission Accomplished!`)
                    .setDescription(`You have completed a daily mission and have recieved the following rewards.`)
                    .addField(`Rewards:`, `Shards: \`${client.missions.daily[11].shards}\` \nGold: \`${client.missions.daily[11].gold}\` \nGlimmer: \`${client.missions.daily[11].glimmer}\``)
                    .setFooter(`This mission has been removed from your !missions.`)
                    .setTimestamp()
                    .setThumbnail(message.author.avatarURL)
                    message.channel.send(accomplished)
                    client.profile.math(message.author.id, "+", client.missions.daily[11].shards, "shards")
                    client.profile.math(message.author.id, "+", client.missions.daily[11].gold, "gold")
                    client.profile.math(message.author.id, "+", client.missions.daily[11].glimmer, "glimmer")
                }
            }
            let active = client.active.active[0].wpet1
            let active1 = client.active.active[0].wpet2
            let kactive = client.active.active[0].wkey1
            let kactive1 = client.active.active[0].wkey2
            let key1 = client.items.items[kactive].name
            let key2 = client.items.items[kactive1].name
            let mat1 = client.active.active[0].wmat1
            let mat2 = client.active.active[0].wmat2
            let name = client.pet.pets[active].name
            let name1 = client.pet.pets[active1].name
            client.battles.set(message.channel.id, 0, "trader")
            client.battles.set(message.channel.id, message.author.id, "traded")
            let myitems = client.profile.get(message.author.id, "items")
            const held = myitems.reduce((total,x) => (x==6 ? total+1 : total), 0)
            let nomad = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setThumbnail(`https://i.imgur.com/rUDS0es.gif`)
            .setTitle(`You have found The Wandering Trader!`)
            .setDescription(`The wanderer will offer deals that change weekly, aswell as appear more often in different expeditions per week.`)
            .addField(`You have \`${held}\` drops of void available for use!`, `*Obtain more drops by defeating event mobs.*`)
            .addField(`Pets:`, `1. ${name} | 75 drops \n 2. ${name1} | 75 drops`)
            .addField(`Materials:`, `3. ${mat1} | 5 drops \n 4. ${mat2} | 5 drops`)
            .addField(`Gold:`, `5. 300 gold | 1 shard \n 6. 3000 gold | 1 glimmer`)
            .addField(`Keys:`, `7. ${key1} | 25 drops \n 8. ${key2} | 25 drops`)
            .setFooter(`Use !buy to purchase any of these options, ONLY WORKS IF THE TRADER IS SPAWNED!! Use !viewp to see the pets the trader is selling ONLY WORKS IF THE TRADER IS SPAWNED!!`)
            return message.channel.send(nomad)
            
        }
        else if(95 <= chance){
            if(lockey == 1){
                var dun = 0
                var key = 7
            }
            if(lockey == 5){
                var dun = 1
                var key = 8
            }
            if(lockey == 7){
                var dun = 2
                var key = 9
            }
            if(lockey == 9){
                var dun = 3
                var key = 10
            }
            if(lockey == 11){
                var dun = 4
                var key = 14
            }
            if(lockey == 10){
                var dun = 5
                var key = 18
            }
            if(lockey == 1 || lockey == 5 || lockey == 7 || lockey == 9 || lockey == 11){
            let name = client.locs.dungeons[dun].name
            let desc = client.locs.dungeons[dun].description
            let keyn = client.items.items[key].name
            let spawned = client.locs.dungeons[dun].waves[0].enemy
            let myitems = client.profile.get(message.author.id, "items")
            let held = myitems.reduce((total,x) => (x==key ? total+1 : total), 0)
            var into = '✅'
            if(held == 0){
                var into = '❎'
            }
            if(client.battles.has(message.channel.id)){
                client.battles.delete(message.channel.id)
            }
            client.battles.set(message.channel.id, dun, "dungeon")
            client.battles.set(message.channel.id, key, "awaiting")
            let Discord = require(`discord.js`)
            let dungeon = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`${name} Discovered!`)
            .setAuthor(message.author.username)
            .setDescription(`${desc}`)
            .addField(`${held}/1 ${keyn} required. || ${into}`, `To enter the dungeon, simply !use the key in your inventory after having discovered the dungeon!`)
            .setImage(img)
            .setFooter(`Dungeons are undertaken with your !team of 3 characters! If you do not have a team please use !teams to set.`)
            return message.channel.send(dungeon)
        }
        }
        message.channel.send(`You found nothing on your expedition!`)
    }
}