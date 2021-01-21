exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send("You have not started Animelee!")
     }
     if(args.length == 0){
        return message.channel.send(`Please include the item number you would like to purchase!`)
    }
    if(!client.profile.get(message.author.id, "questing") == 0){
        return message.channel.send(`You cannot buy items during a quest!`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid item!`)
    }
    if(client.battles.has(message.channel.id)){
        if(client.battles.has(message.channel.id, "sakura")){
            if(client.battles.get(message.channel.id, "sakura") !== message.author.id){
                return message.channel.send(`This shop was not opened for you! Sakura is obtained Via donating and then using the !sakura command.`)
            }
            let check = parseInt(args[0])
            if(check <= 0){
                return message.channel.send(`This is not a valid Purchase!`)
            }
            else if(check == 1 || check == 2){
                var amount = 1
                if(check == 1){
                    if(args.length == 2){
                        if(isNaN(args[1])){
                            return message.channel.send(`This is not a valid amount.`)
                        }
                        return message.channel.send(`Characters must be claimed 1 at a time.`)
                    }
                    var cost = amount * 250
                    let sakura = client.profile.get(message.author.id, "sakura")
                    if(cost > sakura){
                        return message.channel.send(`You do not have the sakura to complete this purchase!`)
                    }
                    client.profile.math(message.author.id, "-", cost, "sakura")
                    if(amount == 1){
                        let spawned = 57
                        let rng = 3
                        let name = client.levels.rares[rng].name
                        let min = client.levels.rares[rng].min
                        let max = client.levels.rares[rng].max
                        let col = client.levels.rares[rng].color
                        let img = client.levels.rares[rng].img
                        let em = client.levels.rares[rng].emote
                        let emote = client.emojis.get(em)

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
                        client.profile.push(message.author.id, newspawnn, "characters")
                        const level = client.characters.get(newspawnn, "Level")
                        let Discord = require(`discord.js`)
                        const event = new Discord.RichEmbed()
                        .setColor(col)
                        .setTitle(`**Congratulations!** You have bought ${spawnedname}!!`)
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setDescription(`-250 Sakura!`)
                        .setThumbnail(client.spawns.spawns[up].image)
                        .addField(`**Spawned character:**`, `${spawnedname} Lvl \`${level}\`- \`${total}\` Total.`)
                        .addField(`|${emote}| ${name} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
                        .setImage(spawnedimage)
                        .setTimestamp()
                        .setFooter(`Spawned by ${message.author.username}! To check your characters now use the !characters command`)

                    return message.channel.send(event);
                    }
                }
                if(check == 2){
                    var amount = 1
                if(check == 1){
                    if(args.length == 2){
                        if(isNaN(args[1])){
                            return message.channel.send(`This is not a valid amount.`)
                        }
                        return message.channel.send(`Characters must be claimed 1 at a time.`)
                    }
                    var cost = amount * 250
                    let sakura = client.profile.get(message.author.id, "sakura")
                    if(cost > sakura){
                        return message.channel.send(`You do not have the sakura to complete this purchase!`)
                    }
                    client.profile.math(message.author.id, "-", cost, "sakura")
                    if(amount == 1){
                        let spawned = 58
                        let rng = 3
                        let name = client.levels.rares[rng].name
                        let min = client.levels.rares[rng].min
                        let max = client.levels.rares[rng].max
                        let col = client.levels.rares[rng].color
                        let img = client.levels.rares[rng].img
                        let em = client.levels.rares[rng].emote
                        let emote = client.emojis.get(em)

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
                        client.profile.push(message.author.id, newspawnn, "characters")
                        const level = client.characters.get(newspawnn, "Level")
                        let Discord = require(`discord.js`)
                        const event = new Discord.RichEmbed()
                        .setColor(col)
                        .setTitle(`**Congratulations!** You have bought ${spawnedname}!!`)
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setDescription(`-250 Sakura!`)
                        .addField(`**Spawned character:**`, `${spawnedname} Lvl \`${level}\`- \`${total}\` Total.`)
                        .addField(`|${emote}| ${name} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
                        .setImage(spawnedimage)
                        .setTimestamp()
                        .setFooter(`Spawned by ${message.author.username}! To check your characters now use the !characters command`)

                    return message.channel.send(event);
                }
            }
        }
    }
    if(check == 3){
        var amount = 1
        if(args.length == 2){
        if(isNaN(args[1])){
            return message.channel.send(`This is not a valid amount!`)
        }
    return message.channel.send(`Event vouchers must be 1 at a time.`)
    }
        var cost = amount * 150
        if(cost > client.profile.get(message.author.id, "sakura")){
            return message.channel.send(`You cannot afford this purchase.`)
        }
        client.profile.math(message.author.id, "-", cost, "sakura")
        client.profile.push(message.author.id, 20, "items", true)
        return message.channel.send(`Event voucher Claimed!`)
    }
    if(check == 4 || check == 5 || check == 6 || check == 7){
        var amount = 1
        if(check == 4){
            var sak = 500
            var sakc = 1
            var type = "shards"
        }
        else if(check == 5){
            var sak = 5000
            var sakc = 8
            var type = "shards"
        }
        else if(check == 6){
            var sak = 25000
            var sakc = 1
            var type = "gold"
        }
        else if(check == 7){
            var sak = 250000
            var sakc = 8
            var type = "type"
        }
        if(args.length == 2){
            if(isNaN(args[1])){
                return message.channel.send(`This is not a valid amount!`)
            }
            var amount = parseInt(args[1])
        }
        var cost = amount * sakc
        if(cost > client.profile.get(message.author.id, "sakura")){
            return message.channel.send(`You cannot afford this purchase!`)
        }
        client.profile.math(message.author.id, "-", cost, "sakura")
        let add = sak * amount
        client.profile.math(message.author.id, "+", add, type)
        return message.channel.send(`You have purchased \`${add}\` ${type} for \`${cost}\` Sakura.`)
    }
    if(check == 8){
        var amount = 1
        if(args.length == 2){
            if(isNaN(args[1])){
                return message.channel.send(`This is not a valid amount!`)
            }
            var amount = parseInt(args[1])
        }
        var cost = amount * 1
        var add = amount * 10
        if(cost > client.profile.get(message.author.id, "sakura")){
            return message.channel.send(`You cannot afford this purchase!`)
        }
        client.profile.math(message.author.id, "-", cost, "sakura")
        client.profile.math(message.author.id, "+", add, "horns")
        client.profile.math(message.author.id, "+", add, "souls")
        client.profile.math(message.author.id, "+", add, "lances")
        client.profile.math(message.author.id, "+", add, "nightmares")
        client.profile.math(message.author.id, "+", add, "tridents")
        client.profile.math(message.author.id, "+", add, "souldust")
        client.profile.math(message.author.id, "+", add, "wings")
        client.profile.math(message.author.id, "+", add, "souldew")
        client.profile.math(message.author.id, "+", add, "diamonds")
        return message.channel.send(`\`${add}\` of each material has been purchased for \`${cost}\` Sakura`)
    }
    }
    }
    if(client.battles.has(message.channel.id)){
    if(client.battles.has(message.channel.id, "trader")){
        let check = parseInt(args[0])
        let myitems = client.profile.get(message.author.id, "items")
        if(client.battles.get(message.channel.id, "traded") !== message.author.id){
            return message.channel.send(`The Wanderer has not offered you his deals! Go !explore to encounter him yourself.`)
        }
        else if(check <= 0){
            return message.channel.send(`This is not a valid purchase!`)
        }
        if(check == 1 || check == 2){
            if(check > 8){
                return message.channel.send(`This is not a valid purchase!`)
            }
            let held = myitems.reduce((total,x) => (x==6 ? total+1 : total), 0)
            if(held < 75){
                return message.channel.send(`You cannot afford these pets!`)
            }
            if(client.profile.get(message.author.id, "pets").length == 10){
                return message.channel.send(`You already have 5 pets!`)
            }
            let active1 = client.active.active[0].wpet1
            let active2 = client.active.active[0].wpet2
            if(check == 1){
                var pet = active1
            }
            else if(check == 2){
                var pet = active2
            }
            let nme = client.pet.pets[pet].name
            let desc = client.pet.pets[pet].description
            let atk = client.pet.pets[pet].atk
            let matk = client.pet.pets[pet].matk
            let spd = client.pet.pets[pet].spd
            let img = client.pet.pets[pet].img
            let ID = pet
            let atkimg = client.pet.pets[pet].atkimg
            let newpet = client.pets.autonum
            client.pets.set(newpet, {health: 25, name: nme, description: desc, attack: atk, mattack: matk, speed: spd, image: img, atkimage: atkimg, lib: ID, id: newpet, level: 0, exp: 0})
            client.profile.push(message.author.id, newpet, "pets")
            for (i = 0; i < 75; i++){
                client.profile.remove(message.author.id, 6, "items")
            }
            return message.channel.send(`You have purchased a new pet for 75 drops of void!`)
        }
        else if(check == 3 || check == 4){
            let active1 = client.active.active[0].wmat1
            let active2 = client.active.active[0].wmat2
            if(check == 3){
                var mat = active1
            }
            else if(check == 4){
                var mat = active2
            }
            let held = myitems.reduce((total,x) => (x==6 ? total+1 : total), 0)
            if(held < 5){
                return message.channel.send(`You cannot afford these materials!`)
            }
            for (i = 0; i < 5; i++){
                client.profile.remove(message.author.id, 6, "items")
            }
            client.profile.math(message.author.id, "+", 1, mat)
           return message.channel.send(`You have purchased 1 ${mat} for 5 drops of void.`)
        }
        else if(check == 5 || check == 6){
            if(check == 5){
                let held = client.profile.get(message.author.id, "shards")
                if(held < 1){
                    return message.channel.send(`You cannot afford any gold!`)
                }
                client.profile.math(message.author.id, "-", 1, "shards")
                client.profile.math(message.author.id, "+", 300, "gold")
                return message.channel.send(`You have purchased 300 gold for 1 shard.`)
            }
            else if(check == 6){
                let held = client.profile.get(message.author.id, "glimmer")
                if(held < 1){
                    return message.channel.send(`You cannot afford any gold!`)
                }
                client.profile.math(message.author.id, "-", 1, "glimmer")
                client.profile.math(message.author.id, "+", 3000, "gold")
                return message.channel.send(`You have purchased 3000 gold for 1 glimmer.`)
            }
        }
        else if(check == 7 || check == 8){
            let kactive = client.active.active[0].wkey1
            let kactive1 = client.active.active[0].wkey2
            if(check == 7){
                let held = myitems.reduce((total,x) => (x==6 ? total+1 : total), 0)
                if(client.profile.get(message.author.id, "gold") < 10000){
                    return message.channel.send(`You cannot afford this key!`)
                }
                // for(i = 0; i < 25; i++){
                //    client.profile.remove(message.author.id, 6, "items")
                //}
                client.profile.math(message.author.id, "-", 10000, "gold")
                client.profile.push(message.author.id, kactive, "items")
                return message.channel.send(`You have purchased a Dungeon Key for 25 drops.`)
            }
            else if(check == 8){
                let held = myitems.reduce((total,x) => (x==6 ? total+1 : total), 0)
                if(client.profile.get(message.author.id, "gold") < 10000){
                    return message.channel.send(`You cannot afford this key!`)
                }
                // for(i = 0; i < 25; i++){
                //    client.profile.remove(message.author.id, 6, "items")
                //}
                client.profile.math(message.author.id, "-", 10000, "gold")
                client.profile.push(message.author.id, kactive1, "items")
                return message.channel.send(`You have purchased a Dungeon Key for 25 drops.`)
            }
        }
    }
}
     let checking = parseInt(args[0])
     if(checking > 6){
        return message.channel.send(`This is not a valid purchase!`)
    }
     let items = client.items.items
     const myitems = client.profile.get(message.author.id, "items")
     if (0 < checking && checking <= 6){
         let pushs = checking - 1
         let itemkey = items[checking - 1]
         if(client.profile.has(message.author.id, "daily")){
             let dailies = client.profile.get(message.author.id, "daily")
             if(dailies.includes(2)){
             client.profile.math(message.author.id, "+", 1, "bought")
             if(client.profile.get(message.author.id, "bought") == 3){
                 client.profile.remove(message.author.id, 2, "daily")
                 let Discord = require(`discord.js`)
                 let accomplished = new Discord.RichEmbed()
                 .setColor(`#ffff00`)
                 .setTitle(`Daily Mission Accomplished!`)
                 .setDescription(`You have completed a daily mission and recieved the following rewards.`)
                 .addField(`Rewards:`, `Shards: \`${client.missions.daily[2].shards}\` \nGold: \`${client.missions.daily[2].gold}\` \nGlimmer: \`${client.missions.daily[2].glimmer}\``)
                 .setFooter(`This mission has been removed from your !missions.`)
                 .setTimestamp()
                 message.channel.send(accomplished)
                 client.profile.math(message.author.id, "+", client.missions.daily[2].shards, "shards")
                 client.profile.math(message.author.id, "+", client.missions.daily[2].gold, "gold")
                 client.profile.math(message.author.id, "+", client.missions.daily[2].glimmer, "glimmer")
             }
             }
         }

         const max = itemkey.capacity
         const name = itemkey.name
         const price = itemkey.price
         const desc = itemkey.description
         const type = itemkey.type
         const gold = client.profile.get(message.author.id, "gold")
         const held = myitems.reduce((total,x) => (x==pushs ? total+1 : total), 0)

         if(gold < price){
             return message.channel.send(`You do not have enough gold for this item!`)
         }
         else if((held) >= max){
             return message.channel.send(`You have reached max capacity of this item!`)
         }
         const Discord = require(`discord.js`)
         client.profile.push(message.author.id, pushs, "items", true)
         client.profile.math(message.author.id, "-", price, "gold")
         const bought = new Discord.RichEmbed()
         .setColor(`#0099ff`)
         .setAuthor(message.author.username)
         .setTitle(`You have bought a ${name} for ${price}!`)
         .setDescription(`You can find this item in your inventory with \`!inv\``)
         .addField(`Item Description:`, `${desc}`)
         .setTimestamp()
         message.channel.send(bought)


     }
}