exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "chosen")){
        return message.channel.send(`Please \`${client.config.prefix}choose\` a character!`)
    }
    if(!client.battles.has(message.channel.id)){
        return message.channel.send(`There is nothing to fight here!`)
    }
    if(client.battles.get(message.channel.id, "inter") == 3){
        return message.channel.send(`Please continue before attacking!`)
    }
    if(client.battles.has(message.channel.id, "quest")){
        if(!client.colo.has(message.channel.id)){
        if(client.battles.get(message.channel.id, "quester") !== message.author.id){
            return message.channel.send(`This is not your quest!`)
        }
    }}
    if(client.battles.has(message.channel.id, "spire")){
        let chosen = client.profile.get(message.author.id, "chosen")
        let dead = client.battles.get(message.channel.id, "dead")
        if(dead.includes(chosen)){
            return message.channel.send(`This character has died, please select a new one.`)
        }
    }
    if(args.length == 0){
        return message.channel.send(`Please include the attack you are using!`)
    }
    if(args.length > 1){
        return message.channel.send(`This is not a valid attack`)
    }
    if(args.length == 1){
        if (isNaN(args[0])) {
            return message.channel.send(`This is not a valid attack!`)
        }
        const check = parseInt(args[0])
        if(check > 3){
            return message.channel.send(`This is not a valid attack!`)
        }
        //PvP
    if(client.colo.has(message.channel.id)){
        let parts = client.colo.get(message.channel.id, "players")
        if(!parts.includes(message.author.id)){
            return message.channel.send(`This is not your fight!`)
        }
        let first = client.colo.get(message.channel.id, "first")
        let second = client.colo.get(message.channel.id, "second")
        let atkcheck = client.colo.get(message.channel.id, "attacks")
        if(message.author.id == first){
            if(atkcheck > 0){
                return message.channel.send(`It is not your turn!`)
            }
            let attacker = message.author.username
            let turn = client.colo.get(message.author.id, "turn")
            let used = parseInt(args[0] - 1)
            let newatk = atkcheck + 1
            client.colo.set(message.channel.id, newatk, "attacks")
            let chosenc = client.profile.get(first, "chosen")
            let enemy = client.profile.get(second, "chosen")
            let name = client.characters.get(chosenc, "Name")
            let hp = client.characters.get(chosenc, "Health")
            let atk = client.characters.get(chosenc, "Atk")
            let matk = client.characters.get(chosenc, "Matk")
            let def = client.characters.get(chosenc, "Def")
            let mdef = client.characters.get(chosenc, "Mdef")
            let id = client.characters.get(chosenc, "Lib")
            let img = client.characters.get(chosenc, "Image")
            let spd = client.characters.get(chosenc, "Spd")
            var show = `| ${client.emojis.get(`685621618541592593`)} | 100% Dmg`
           let attack = client.units.units[id].abilities[used]
           let atknme = attack.name
           let atkap = attack.Ap
           let atkhits = attack.hits
           let atkcd = attack.cd
           let atktype = attack.type
           if(args[0] == 3){
               if(turn < atkcd){
                   let remaining = atkcd - turn
                   const Discord = require(`discord.js`)
                   const cooldowns = new Discord.RichEmbed()
                   .setColor(`#0099ff`)
                   .setTitle(`Your ultimate attack is on cooldown!`)
                   .setDescription(`Turns left before use: ${remaining}`)
                   .setImage(`${img}`)
                   client.colo.math(message.channel.id, "-", 1, "attacks")
                    return message.channel.send(cooldowns)
               }
           }

            let ehp = client.characters.get(enemy, "Health")
            let edef = client.characters.get(enemy, "Def")
            let emdef = client.characters.get(enemy, "Mdef")
            if(atktype == 1){
                var add = Math.floor(Math.random() * 3)
                var dmgcalc = Math.floor(((atk * (atkap * atkhits))/edef) + add)
            }
            else if(atktype == 2){
                var add = Math.floor(Math.random() * 3)
                var dmgcalc = Math.floor(((matk * (atkap * atkhits))/emdef) + add)
            }
            var dmg = dmgcalc - 2
            if(dmgcalc < 0){
                var dmg = 0
            }
            let ogspd = client.units.units[id].spd
            let crit_chance = client.units.units[id].abilities[used].crit_chance
            var critcheck = Math.floor((Math.random() * 100) + 1)
           if(critcheck <= crit_chance){
                var dmg = Math.floor(dmgcalc * 1.4)
                var show = `| ${client.emojis.get(`685621618541592593`)} | +40% Dmg`
            }
            let misscheck = 100 - client.units.units[id].abilities[used].miss_chance
            if(critcheck > misscheck && used !== 2){
                var dmg = Math.floor(dmgcalc * 0.4)
                var show = `| ${client.emojis.get(`685621521644781576`)} | -60% Dmg`
            }
            var reduce = 1
            if(atkhits > 1){
                var stack = []
                var dmg = 0
                if(atktype == 1){
                    for(i = 0; i < atkhits; i++){
                        var critcheck = Math.round((Math.random() * 100) + 1)
                        var reduce = reduce - .05
                        var type = client.emojis.get(`685621618541592593`)
                        var dmgbit = Math.floor(((atk * atkap) * reduce)/(edef))
                        if(critcheck <= crit_chance){
                            var dmgbit = Math.round(dmgbit * 1.4)
                            var type = client.emojis.get(`685621618743050260`)
                        }
                        if(misscheck < critcheck && used !== 2){
                            var dmgbit = Math.round(dmgbit * 0.6)
                            var type = client.emojis.get(`685621521644781576`)
                            
                        }
                        var dmg = dmgbit + dmg
                        stack.push(type)
                    }
                }
                else if(atktype == 2){
                    for(i = 0; i < atkhits; i++){
                        var critcheck = Math.round((Math.random() * 100) + 1)
                        var reduce = reduce - .05
                        var type = client.emojis.get(`685621618541592593`)
                        var dmgbit = Math.floor(((matk * atkap) * reduce)/(emdef))
                        if(critcheck <= crit_chance){
                            var dmgbit = Math.round(dmgbit * 1.4)
                            var type = client.emojis.get(`685621618743050260`)
                        }
                        if(misscheck < critcheck && used !== 2){
                            var dmgbit = Math.round(dmgbit * 0.6)
                            var type = client.emojis.get(`685621521644781576`)
                        }
                        var dmg = dmgbit + dmg
                        stack.push(type)
                    }
                }
                var stackshow = stack.join(" ")
            }
            if(dmg < 0){
                var dmg = 0
            }
            let newhp = ehp - dmg
            if(newhp <= 0){
                var wl = Math.round(client.colo.get(message.author.id, "wins") / client.colo.get(message.author.id, "losses"))
                var wl2 = Math.round(client.colo.get(second, "wins") / client.colo.get(second, "losses"))
                if(isNaN(wl) || wl == "Infinity"){
                    var wl = 0
                }
                if(isNaN(wl2)|| wl2 == "Infinity"){
                    var wl2 = 0
                }
                var dif = wl2 - wl
                if(dif > 0){
                    var gain = Math.round((dif + 1) * 500)
                }
                if(dif == 0){
                    var gain = 500
                }
                if(dif < 0){
                    var gain = 100
                    
                }
                client.colo.math(message.author.id, "+", gain, "glory")
                client.colo.set(message.author.id, 0, "turn" )
                client.characters.set(chosenc, 100, "Health")
                client.characters.set(enemy, 100, "Health")
                client.colo.delete(message.channel.id)
                client.profile.set(first, 0, "questing")
                client.profile.set(second, 0, "questing")
                let gold = Math.floor((Math.random() * 500) + 1)
                client.profile.math(message.author.id, "+", gold, "gold")
                client.battles.delete(message.channel.id)
                client.colo.math(message.author.id, "+", 1, "wins")
                client.colo.math(second, "+", 1, "losses")
                
                let Discord = require(`discord.js`)
                const finish = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setTitle(`${attacker} has claimed victory in the colosseum!`)
                .addField(`Rewards:`, `Glory: ${gain}, Gold: ${gold}`)
                .addField(`Night Falls on the Coloseum, a battle well fought.`, `*The name of a new casualty is chiseled on the memorial wall*`)
                .setImage(`https://i.imgur.com/RcmnQTu.png`)
                .setTimestamp()

                return message.channel.send(finish)
            }
            client.characters.set(enemy, newhp, "Health")
            client.colo.math(first, "+", 1, "turn")
            let turnat = client.colo.get(message.author.id, "turn")
            let cd = client.units.units[id].abilities[2].cd

            const Discord = require(`discord.js`)
            const atacked = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`${attacker}'s ${name} has attacked with ${atknme}!`)
            .setDescription(`Damage dealt: \`${dmg}\` ${show}`)
            .setThumbnail(img)
            if(atkhits > 1){
                atacked.setDescription(`Total Damage: \`${dmg}\``)
                atacked.addField(`Attack Chain!`, `${stackshow}`)
            }
            if(used == 2){
                if(cd == 1){
                    atacked.addField(`▱ **Ultimate Attack Used!**`, `Remaining Health: \`\`${hp}\``)
                }
                if(cd == 2){
                    atacked.addField(`▱▱ **Ultimate Attack Used!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                if(cd == 3){
                    atacked.addField(`▱▱▱ **Ultimate Attack Used!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                if(cd == 4){
                    atacked.addField(`▱▱▱▱ **Ultimate Attack Used!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
            }
            else if(used !== 2){
                if(turnat < cd){
                if(turnat == 1){
                    atacked.addField(`▰`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                else if(turnat == 2){
                    atacked.addField(`▰▰`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                else if(turnat == 3){
                    atacked.addField(`▰▰▰`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }}
            else if(turnat >= cd){
                if(cd == 1){
                    atacked.addField(`▰ **Ultimate Attack Ready!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                if(cd == 2){
                    atacked.addField(`▰▰ **Ultimate Attack Ready!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                else if(cd == 3){
                    atacked.addField(`▰▰▰ **Ultimate Attack Ready!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                else if(cd == 4){
                    atacked.addField(`▰▰▰▰ **Ultimate Attack Reaady!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
            }}}
            atacked.setFooter(`Player 2's turn!`)
            if(args[0] == 3){
                client.colo.set(message.author.id, 0, "turn")
                let attackimg = attack.img
                atacked.setImage(attackimg)
            }
            atacked.addField(`Health remaining on oponent:`, `\`\`\`${newhp}\`\`\``)
            return message.channel.send(atacked)

        }
        else if(message.author.id == second){
            if(!atkcheck == 1){
                return message.channel.send(`It is not your turn!`)
            }
            let attacker = message.author.username
            let used = parseInt(args[0] - 1)
            let turn = client.colo.get(message.author.id, "turn")
            let newatk = atkcheck + 1
            client.colo.set(message.channel.id, 0, "attacks")
            let chosenc = client.profile.get(second, "chosen")
            let enemy = client.profile.get(first, "chosen")
            let name = client.characters.get(chosenc, "Name")
            let hp = client.characters.get(chosenc, "Health")
            let atk = client.characters.get(chosenc, "Atk")
            let matk = client.characters.get(chosenc, "Matk")
            let def = client.characters.get(chosenc, "Def")
            let mdef = client.characters.get(chosenc, "Mdef")
            let id = client.characters.get(chosenc, "Lib")
            let img = client.characters.get(chosenc, "Image")
            var show = `| ${client.emojis.get(`685621618541592593`)} | 100% Dmg`
            let attack = client.units.units[id].abilities[used]
            let atknme = attack.name
            let atkap = attack.Ap
            let atkhits = attack.hits
            let atkcd = attack.cd
            let atktype = attack.type
            if(args[0] == 3){
                if(turn < atkcd){
                    let remaining = atkcd - turn
                    const Discord = require(`discord.js`)
                    const cooldowns = new Discord.RichEmbed()
                    .setColor(`#0099ff`)
                    .setTitle(`Your ultimate attack is on cooldown!`)
                    .setDescription(`Turns left before use: ${remaining}`)
                    .setImage(`${img}`)
                    client.colo.math(message.channel.id, "+", 1, "attacks")
                     return message.channel.send(cooldowns)
                }}
            let ehp = client.characters.get(enemy, "Health")
            let edef = client.characters.get(enemy, "Def")
            let emdef = client.characters.get(enemy, "Mdef")

            if(atktype == 1){
                var add = Math.floor(Math.random() * 5)
                var dmgcalc = Math.floor(((atk * (atkap * atkhits))/edef) + add)
            }
            else if(atktype == 2){
                var add = Math.floor(Math.random() * 5)
                var dmgcalc = Math.floor(((matk * (atkap * atkhits))/emdef) + add)
            }
            var dmg = dmgcalc - 2
            if(dmgcalc < 0){
                var dmg = 0
            }
            let crit_chance = client.units.units[id].abilities[used].crit_chance
            var critcheck = Math.floor((Math.random() * 100) + 1)
            if(critcheck <= crit_chance){
                var dmg = Math.floor(dmgcalc * 1.4)
                var show = `| ${client.emojis.get(`685621618743050260`)} | +40% Dmg`
            }
            let misscheck = 100 - client.units.units[id].abilities[used].miss_chance
            if(misscheck < critcheck && used !== 2){
                var dmg = Math.floor(dmgcalc * 0.4)
                var show = `| ${client.emojis.get(`685621521644781576`)} | -60% Dmg`
            }
            var reduce = 1
            if(atkhits > 1){
                var stack = []
                var dmg = 0
                if(atktype == 1){
                    for(i = 0; i < atkhits; i++){
                        var critcheck = Math.round((Math.random() * 100) + 1)
                        var reduce = reduce - .05
                        var type = client.emojis.get(`685621618541592593`)
                        var dmgbit = Math.floor(((atk * atkap) * reduce)/(edef))
                        if(critcheck <= crit_chance){
                            var dmgbit = Math.round(dmgbit * 1.4)
                            var type = client.emojis.get(`685621618743050260`)
                        }
                        if(misscheck < critcheck && used !== 2){
                            var dmgbit = Math.round(dmgbit * 0.6)
                            var type = client.emojis.get(`685621521644781576`)
                            
                        }
                        var dmg = dmgbit + dmg
                        stack.push(type)
                    }
                }
                else if(atktype == 2){
                    for(i = 0; i < atkhits; i++){
                        var critcheck = Math.round((Math.random() * 100) + 1)
                        var reduce = reduce - .05
                        var type = client.emojis.get(`685621618541592593`)
                        var dmgbit = Math.floor(((matk * atkap) * reduce)/(emdef))
                        if(critcheck <= crit_chance){
                            var dmgbit = Math.round(dmgbit * 1.4)
                            var type = client.emojis.get(`685621618743050260`)
                        }
                        if(misscheck < critcheck && used !== 2){
                            var dmgbit = Math.round(dmgbit * 0.6)
                            var type = client.emojis.get(`685621521644781576`)
                        }
                        var dmg = dmgbit + dmg
                        stack.push(type)
                    }
                }
                var stackshow = stack.join(" ")
            }
            if(dmg < 0){
                var dmg = 0
            }
            let newhp = ehp - dmg
            if(newhp <= 0){
                var wl = Math.round(client.colo.get(message.author.id, "wins") / client.colo.get(message.author.id, "losses"))
                var wl2 = Math.round(client.colo.get(first, "wins") / client.colo.get(first, "losses"))
                if(isNaN(wl) || wl == "Infinity"){
                    var wl = 0
                }
                if(isNaN(wl2) || wl2 == "Infinity"){
                    var wl2 = 0
                }
                var dif = wl2 - wl
                if(dif > 0){
                    var gain = Math.round((dif + 1) * 500)
                }
                if(dif == 0){
                    var gain = 500
                }
                if(dif < 0){
                    var gain = 100
                    
                }
                client.colo.math(message.author.id, "+", gain, "glory")
                client.colo.set(message.author.id, 0, "turn")
                client.characters.set(chosenc, 100, "Health")
                client.characters.set(enemy, 100, "Health")
                client.colo.delete(message.channel.id)
                client.profile.set(first, 0, "questing")
                client.profile.set(second, 0, "questing")
                let gold = Math.floor((Math.random() * 500) + 1)
                client.profile.math(message.author.id, "+", gold, "gold")
                client.battles.delete(message.channel.id)
                client.colo.math(message.author.id, "+", 1, "wins")
                client.colo.math(first, "+", 1, "losses")

                let Discord = require(`discord.js`)
                const finish = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setTitle(`${attacker} has claimed victory in the colosseum!`)
                .addField(`Rewards:`, `Glory: ${gain}, Gold: ${gold}`)
                .addField(`Night Falls on the Coloseum, a battle well fought.`, `*The name of a new casualty is chiseled on the memorial wall*`)
                .setImage(`https://i.imgur.com/RcmnQTu.png`)
                .setTimestamp()

                return message.channel.send(finish)
            }
            client.characters.set(enemy, newhp, "Health")
            client.colo.math(second, "+", 1, "turn")
            let turnat = client.colo.get(message.author.id, "turn")
            let cd = client.units.units[id].abilities[2].cd

            const Discord = require(`discord.js`)
            const atacked = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`${attacker}'s ${name} has attacked with ${atknme}!`)
            .setDescription(`Damage dealt: ${dmg} ${show}`)
            .setThumbnail(img)
            if(atkhits > 1){
                atacked.setDescription(`Total Damage: \`${dmg}\``)
                atacked.addField(`Attack Chain!`, `${stackshow}`)
            }
            if(used == 2){
                if(cd == 1){
                    atacked.addField(`▱ **Ultimate Attack Used!**`, `Remaining Health: \`\`${hp}\``)
                }
                if(cd == 2){
                    atacked.addField(`▱▱ **Ultimate Attack Used!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                if(cd == 3){
                    atacked.addField(`▱▱▱ **Ultimate Attack Used!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                if(cd == 4){
                    atacked.addField(`▱▱▱▱ **Ultimate Attack Used!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }}
            if(used !== 2){
            if(turnat < cd){
                if(turnat == 1){
                    atacked.addField(`▰`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                if(turnat == 2){
                    atacked.addField(`▰▰`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                if(turnat == 3){
                    atacked.addField(`▰▰▰`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }}
            if(turnat >= cd){
                if(cd == 1){
                    atacked.addField(`▰ **Ultimate Attack Ready!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                if(cd == 2){
                    atacked.addField(`▰▰ **Ultimate Attack Ready!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                if(cd == 3){
                    atacked.addField(`▰▰▰ **Ultimate Attack Ready!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
                }
                if(cd == 4){
                    atacked.addField(`▰▰▰▰ **Ultimate Attack Reaady!**`, `Remaining Health: \`\`\`${hp}\`\`\``)
            }}}
            atacked.addField(`Health remaining on oponent:`, `\`\`\`${newhp}\`\`\``)
            atacked.setFooter(`Player 2's turn!`)
            if(args[0] == 3){
                client.colo.set(message.author.id, 0, "turn")
                let attackimg = attack.img
                atacked.setImage(attackimg)
            }
            return message.channel.send(atacked)

    }}
    //PvE
    else if(!client.colo.has(message.channel.id)){
        if(client.profile.get(message.author.id, "questing") !== 0){
            let where = client.profile.get(message.author.id, "questing")
            if(client.colo.has(where)){
                return message.channel.send(`You cannot battle enemies while in the colosseum!`)
            }}
        //Dungeons
        if(client.battles.has(message.channel.id, "dungeon")){
            let parts = client.battles.get(message.channel.id, "part")
            if(parts !== message.author.id){
                return message.channel.send(`This is not your dungeon!`)
            }
            let chosen = client.profile.get(message.author.id, "chosen")
            let charname = client.characters.get(chosen, "Name")
            let hp = client.characters.get(chosen, "Health")
            let atk = client.characters.get(chosen, "Atk")
            let matk = client.characters.get(chosen, "Matk")
            let def = client.characters.get(chosen, "Def")
            let mdef = client.characters.get(chosen, "Mdef")
            let spd = client.characters.get(chosen, "Spd")
            let img = client.characters.get(chosen, "Image")
            let id = client.characters.get(chosen, "Lib")
            let lvl = client.characters.get(chosen, "Level")
            let attack = parseInt(args[0] - 1)
            let turn = client.battles.get(message.channel.id, "Turn")
            let abname = client.units.units[id].abilities[attack].name
            let ap = client.units.units[id].abilities[attack].Ap
            let hits = client.units.units[id].abilities[attack].hits
            let type = client.units.units[id].abilities[attack].type
            let cd = client.units.units[id].abilities[2].cd
            let abcd = client.units.units[id].abilities[2].cd
            let remaining = cd - turn
            let dun = client.battles.get(message.channel.id, "dungeon")
            let spawned = client.battles.get(message.channel.id, "id")
            let spawnednme = client.mobs.mobs[spawned].name
            let spawnedimage = client.mobs.mobs[spawned].image
            let ehp = client.battles.get(message.channel.id, "hp")
            let eatk = client.battles.get(message.channel.id, "atk")
            let ematk = client.battles.get(message.channel.id, "matk")
            let edef = client.battles.get(message.channel.id, "def")
            let emdef = client.battles.get(message.channel.id, "mdef")
            let s1 = client.locs.dungeons[dun].waves[2].support1
            let s2 = client.locs.dungeons[dun].waves[2].support2
            let s1hp = client.battles.get(message.channel.id, "up[0].hp")
            let s2hp = client.battles.get(message.channel.id, "up[1].hp")
            let active = client.battles.get(message.channel.id, "active")
            let team = client.profile.get(message.author.id, "team")
            let dead = client.battles.get(message.channel.id, "dead")
            let up = client.battles.get(message.channel.id, "up")
            let mat = client.locs.dungeons[dun].rewards.mats
            let gold = client.locs.dungeons[dun].rewards.gold
            let shards = client.locs.dungeons[dun].rewards.shards
            let meds = client.locs.dungeons[dun].rewards.medals
            let mdmg = client.mobs.mobs[spawned].dmg
            let stage = client.battles.get(message.channel.id, "stage")
            if(dead.includes(chosen)){
                return message.channel.send(`This character is dead!`)
            }
            if(!active.includes(chosen)){
                return message.channel.send(`You cannot use a character not on the team used to start this dungeon!`)
            }
            if(attack == 2 && turn < cd){
                const Discord = require(`discord.js`)
                const abil = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setTitle(`Your ultimate attack is on cooldown!`)
                .setDescription(`Turns left before use: ${remaining}`)
                .setImage(img)
                .setTimestamp()
                return message.channel.send(abil)
            }
            if(attack == 2 && turn >= cd){
                var hitt = []
                    var title = `Normal Ultimate!`
                    var multi = `100% Damage dealt to all Enemies!`
                    var sub = 1
                if(type == 1){
                    var dmg = Math.floor(((ap/2.5 * hits) * atk / edef) + Math.floor(Math.random() * 5))
                    let ogspd = client.units.units[id].spd
                    var crit_chance = client.units.units[id].abilities[attack].crit_chance
                    var critcheck = Math.floor((Math.random() * 100) + 1)
                    if(crit_chance > critcheck){
                        var dmg = Math.floor(dmg * 1.4)
                        var title = `Critical Hit!`
                        var multi = `40% Bonus Damage!`
                    }
                    if(hits > 1){
                        var dmg = 0
                        var title = `Attack Chain!`
                        for(i = 0; i < hits; i++){
                            var sub = sub + .06
                            var dmgbit = Math.floor(((ap/2.3) * (atk / sub)) /edef) + Math.floor(Math.random() * 3)
                            var dmgbitshow = client.emojis.get(`685621618541592593`)
                            var critcheck = Math.floor((Math.random() * 100) + 1)
                            if(crit_chance > critcheck){
                                var dmgbit = Math.round(dmgbit * 1.4)
                                var dmgbitshow = client.emojis.get(`685621618743050260`)
                            }
                            hitt.push(dmgbitshow)
                            var dmg = dmgbit + dmg
                        }
                        var multi = hitt.join(" ")
                        var multi = `${multi}`
                    }
                    if(dmg < 0){
                        var dmg = 0
                    }
                    client.battles.math(message.channel.id, "-", dmg, "hp")
                    for(i = 0; i < up.length; i++){
                        let hits = up[i].hp
                        client.battles.math(message.channel.id, "-", dmg, `up[${i}].hp`)
                    }
                    if(up.length == 1){
                        if(client.battles.get(message.channel.id, `up[0].hp`) <= 0){
                            client.battles.set(message.channel.id, [], "up")
                        }
                    }
                    else if(up.length == 2){
                        if(client.battles.get(message.channel.id, `up[0].hp`) <= 0){
                            client.battles.set(message.channel.id, [up[1]], "up")
                        }
                        if(client.battles.get(message.channel.id, `up[1].hp`) <= 0){
                            client.battles.set(message.channel.id, [up[0]], "up")
                        }
                }
                    }
                else if(type == 2){
                    var dmg = Math.floor(((ap/2.5 * hits) * matk / emdef) + Math.floor(Math.random() * 5))
                    let ogspd = client.units.units[id].spd
                    var crit_chance = client.units.units[id].abilities[attack].crit_chance
                    var critcheck = Math.floor((Math.random() * 100) + 1)
                    if(crit_chance > critcheck){
                        var dmg = Math.floor(dmg * 1.4)
                        var title = `Critical Hit!`
                        var multi = `40% Bonus Damage!`
                    }
                    if(hits > 1){
                        var dmg = 0
                        var title = `Attack Chain!`
                        for(i = 0; i < hits; i++){
                            var sub = sub + .06
                            var dmgbit = Math.floor(((ap/2.3) * (atk / sub)) /edef) + Math.floor(Math.random() * 3)
                            var dmgbitshow = client.emojis.get(`685621618541592593`)
                            var critcheck = Math.floor((Math.random() * 100) + 1)
                            if(crit_chance > critcheck){
                                var dmgbit = Math.round(dmgbit * 1.4)
                                var dmgbitshow = client.emojis.get(`685621618743050260`)
                            }
                            hitt.push(dmgbitshow)
                            var dmg = dmgbit + dmg
                        }
                        var multi = hitt.join(" ")
                        var multi = `${multi}`
                    }
                    for(i = 0; i < up.length; i++){
                        let hits = up[i].hp
                        client.battles.math(message.channel.id, "-", dmg, `up[${i}].hp`)
                    }
                    if(up.length == 1){
                        if(client.battles.get(message.channel.id, `up[0].hp`) <= 0){
                            client.battles.set(message.channel.id, [], "up")
                        }
                    }
                    else if(up.length == 2){
                        if(client.battles.get(message.channel.id, `up[0].hp`) <= 0 && client.battles.get(message.channel.id, `up[1].hp`) <= 0){
                            client.battles.set(message.channel.id, [], "up")
                        }
                        else if(client.battles.get(message.channel.id, `up[0].hp`) <= 0){
                            client.battles.set(message.channel.id, [up[1]], "up")
                        }
                        else if(client.battles.get(message.channel.id, `up[1].hp`) <= 0){
                            client.battles.set(message.channel.id, [up[0]], "up")
                        }
                }}
                if(dmg < 0){
                    var dmg = 0
                }
                    client.battles.math(message.channel.id, "-", dmg, "hp")
                    if(client.battles.get(message.channel.id, "hp") <= 0){
                        if(spawned == 134){
                            client.battles.set(message.channel.id, {spawned: 135, hp: 1250, atk: 200, matk: 100, def: 150, mdef: 160, spd: 100, id: 135, Turn: 0, dungeon: 5, wave: 0, active: active, dead: dead, team: team, part: message.author.id, inter: 1, up: [{spawned: client.locs.dungeons[5].waves[2].support1, hp: 100, place: 1}, {spawned: client.locs.dungeons[5].waves[2].support2, hp: 100, place: 2}], stage: 0})
                            let Discord = require(`discord.js`)
                            let newspawnn = new Discord.RichEmbed()
                            .setColor(`#FF0000`)
                            .setTitle(`New boss has appeared!`)
                            .setDescription(`Rayquaza appears to be mega evolving!`)
                            .addField(`Health:`, `\`\`\`1250\`\`\``)
                            .setImage(`https://i.imgur.com/nnD5F9m.gif`)
                            .setThumbnail(`https://i.imgur.com/UPmGSA1.gif`)
                            .setFooter(`To continue please use !attack.`)
                            return message.channel.send(newspawnn)
                        }
                        if(client.profile.has(message.author.id, "daily")){
                            let dailies = client.profile.get(message.author.id, "daily")
                            if(dailies.includes(5)){
                                client.profile.remove(message.author.id, 5, "daily")
                                let Discord = require(`discord.js`)
                                let accomplished = new Discord.RichEmbed()
                                .setTitle(`Daily Mission Accomplished!`)
                                .setDescription(`You have completed a daily mission and have recieved the following rewards.`)
                                .addField(`Rewards:`, `Shards: \`${client.missions.daily[5].shards}\` \nGold: \`${client.missions.daily[5].gold}\` \nGlimmer: \`${client.missions.daily[5].glimmer}\``)
                                .setFooter(`This mission has been removed from your !missions.`)
                                .setTimestamp()
                                .setThumbnail(message.author.avatarURL)
                                message.channel.send(accomplished)
                                client.profile.math(message.author.id, "+", client.missions.daily[5].shards, "shards")
                                client.profile.math(message.author.id, "+", client.missions.daily[5].gold, "gold")
                                client.profile.math(message.author.id, "+", client.missions.daily[5].glimmer, "glimmer")
                            }
                        } 
                        let deathimg = client.mobs.mobs[spawned].deathimg
                        let Discord = require(`discord.js`)
                        let win = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`You have Defeated the Dungeon Boss!`)
                        .setDescription(`Behind the enemy corpse lies a way out, but more importantly, a door.`)
                        .addField(`Treasure:`, `Gold: ${gold} \nShards: ${shards} \n${mat}: 10`)
                        .setImage(deathimg)
                        .setTimestamp()
                        message.channel.send(win)
                        for(i = 0; i < team.length; i++){
                            let char = team[i]
                            client.characters.set(char, 100, "Health")
                        }
                        client.profile.math(message.author.id, "+", 10, mat)
                        client.profile.math(message.author.id, "+", gold, "gold")
                        for(i = 0; i <= meds; i++){
                            client.profile.push(message.author.id, 13, "items", true)
                        }
                        client.battles.delete(message.channel.id)
                        client.profile.set(message.author.id, 0, "questing")
                        if(spawned == 109){
                            client.profile.push(message.author.id, 16, "items")
                            client.profile.remove(message.author.id, 14, "items")
                        }
                        if(spawned == 135){
                            client.profile.push(message.author.id, 19, "items")
                        }
                        return client.profile.math(message.author.id, "+", shards, "shards")
                }
                client.battles.set(message.channel.id, 0, "Turn")
                let Discord = require(`discord.js`)
                let ult = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setTitle(`**ULTIMATE ATTACK USED**!`)
                .setDescription(`${charname} has unleashed ${abname} upon all enemies!`)
                .addField(`Dmg Dealt:`, `\`${dmg}\``)
                .addField(`${title}`, `${multi}`)
                let oghp = client.mobs.mobs[spawned].hp
                        let int = Math.floor(oghp/20)
                        var barl = 20
                        if(client.battles.get(message.channel.id, "hp") < oghp){
                            var barl = client.battles.get(message.channel.id, "hp")/int
                        }
                        var bar = []
                        for(i = 0; i <= barl; i++){
                            bar.push("▇")
                        }
                        if(client.battles.get(message.channel.id, "hp") < int/2){
                            var bar = ["▒"]
                        }
                        let barshow = bar.join("")
                ult.addField(`${spawnednme}`, `\`\`\`${barshow}\`\`\``)
                ult.setThumbnail(client.characters.get(chosen, "Image"))
                ult.setImage(client.units.units[id].abilities[2].img)
                ult.setFooter(`Despite the boss' desperate attack after your ultimate, he will be stunned for 1 next turn!`)
                message.channel.send(ult)
                
            }
            else if(attack !== 2){
                let Discord = require(`discord.js`)
                let targ = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setTitle(`Select your target!`)
                if(up.length == 0){
                    targ.addField(`Boss Remaining!`, `1️⃣ ${spawnednme} | ${client.battles.get(message.channel.id, "hp")} Hp`)
                }
                if(up.length == 1){
                    let alive = up[0]
                    let id = up[0].spawned
                    let hp = up[0].hp
                    targ.addField(`Living Enemies:`, `1️⃣ ${spawnednme} | ${client.battles.get(message.channel.id, "hp")} Hp \n2️⃣ ${client.mobs.mobs[id].name} | ${hp} Hp`)
                }
                else if(up.length == 2){
                    let alive1 = up[0]
                    let id1 = up[0].spawned
                    let alive2 = up[1]
                    let id2 = up[1].spawned
                    let hp1 = up[0].hp
                    let hp2 = up[1].hp
                    targ.addField(`Living Enemies:`, `1️⃣ ${spawnednme} | ${client.battles.get(message.channel.id, "hp")} Hp \n2️⃣ ${client.mobs.mobs[id1].name} | ${hp1} Hp \n3️⃣ ${client.mobs.mobs[id2].name} | ${hp2} Hp`)
                }
                message.channel.send(targ).then(sentEmbed => {
                    sentEmbed.react('1️⃣')
                   .then(() => sentEmbed.react('2️⃣'))
                   .then(() => sentEmbed.react('3️⃣'))
        
                   const filter = (reaction, user) => {
                    return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
                };
                const collector = sentEmbed.createReactionCollector(filter, { time: 1500000 });
    
            collector.on('collect', (reaction, reactionCollector) => {
            const reacted = reaction.emoji.name
            if(reacted == '1️⃣'){
                if(client.battles.get(message.channel.id, "inter") == 1){
                    return message.channel.send(`You have already attacked this round.`)
                }
                let check = client.profile.get(message.author.id, "chosen")
                let atk1 = client.characters.get(check, "Atk")
                let matk1 = client.characters.get(check, "Matk")
                let id1 = client.characters.get(check, "Lib")
                let ap1 = client.units.units[id1].abilities[attack].Ap
                let hits1 = client.units.units[id1].abilities[attack].hits
                if(client.characters.get(check, "Health") == 0){
                    return message.channel.send(`This character has died before they could attack!`)
                }
                client.battles.math(message.channel.id, "+", 1, "Turn")
                    var hitt = []
                    var title = "Normal Attack"
                    var multi = "100% Damage!"
                    var sub = 1
                if(type == 1){
                    var dmg = Math.floor(((ap1/2.5 * hits1) * atk1 / edef) + Math.floor(Math.random() * 5))
                    let ogspd = client.units.units[id1].spd
                    var crit_chance = client.units.units[id1].abilities[attack].crit_chance
                    var critcheck = Math.floor((Math.random() * 100) + 1)
                    if(crit_chance > critcheck){
                        var dmg = Math.floor(dmg * 1.4)
                        var title = "Critical Hit!"
                        var multi = "40% Extra Damage!"
                    }
                    if(hits1 > 1){
                        var dmg = 0
                        var title = `Attack Chain!`
                        for(i = 0; i < hits1; i++){
                            var sub = sub + .06
                            var dmgbit = Math.floor(((ap1/2.3) * (atk1 / sub)) /edef) + Math.floor(Math.random() * 3)
                            var dmgbitshow = client.emojis.get(`685621618541592593`)
                            var critcheck = Math.floor((Math.random() * 100) + 1)
                            if(crit_chance > critcheck){
                                var dmgbit = Math.round(dmgbit * 1.4)
                                var dmgbitshow = client.emojis.get(`685621618743050260`)
                            }
                            hitt.push(dmgbitshow)
                            var dmg = dmgbit + dmg
                        }
                        var multi = hitt.join(" ")
                        var multi = `${multi}`
                    }
                    client.battles.math(message.channel.id, "-", dmg, "hp")
                    }
                    if(type == 2){
                        var dmg = Math.floor(((ap1/2.5 * hits1) * matk1 / emdef) + Math.floor(Math.random() * 5))
                        let ogspd = client.units.units[id1].spd
                        var crit_chance = client.units.units[id1].abilities[attack].crit_chance
                        var critcheck = Math.floor((Math.random() * 100) + 1)
                        if(crit_chance > critcheck){
                            var dmg = Math.floor(dmg * 1.4)
                            var title = `Critical Hit!`
                            var multi = `40% Extra Damage!`
                        }
                        if(hits1 > 1){
                            var dmg = 0
                            var title = `Attack Chain!`
                            for(i = 0; i < hits1; i++){
                                var sub = sub + .06
                                var dmgbit = Math.floor(((ap1/2.3) * (matk1 / sub)) /emdef) + Math.floor(Math.random() * 3)
                                var dmgbitshow = client.emojis.get(`685621618541592593`)
                                var critcheck = Math.floor((Math.random() * 100) + 1)
                                if(crit_chance > critcheck){
                                    var dmgbit = Math.round(dmgbit * 1.4)
                                    var dmgbitshow = client.emojis.get(`685621618743050260`)
                                }
                                hitt.push(dmgbitshow)
                                var dmg = dmgbit + dmg
                            }
                            var multi = hitt.join(" ")
                            var multi = `${multi}`
                        }
                        client.battles.math(message.channel.id, "-", dmg, "hp")
                    }
                        let Discord = require(`discord.js`)
                        if(client.battles.get(message.channel.id, "hp") <= 0){
                            if(spawned == 134){
                                client.battles.set(message.channel.id, {spawned: 135, hp: 1250, atk: 200, matk: 100, def: 150, mdef: 160, spd: 100, id: 135, Turn: 0, dungeon: 5, wave: 0, active: active, dead: dead, team: team, part: message.author.id, inter: 1, up: [{spawned: client.locs.dungeons[5].waves[2].support1, hp: 100, place: 1}, {spawned: client.locs.dungeons[5].waves[2].support2, hp: 100, place: 2}], stage: 0})
                                let Discord = require(`discord.js`)
                                let newspawnn = new Discord.RichEmbed()
                                .setColor(`#FF0000`)
                                .setTitle(`New boss has appeared!`)
                                .setDescription(`Rayquaza appears to have mega evolved!`)
                                .addField(`Health:`, `\`\`\`1250\`\`\``)
                                .setImage(`https://i.imgur.com/nnD5F9m.gif`)
                                .setThumbnail(`https://i.imgur.com/UPmGSA1.gif`)
                                .setFooter(`To continue please use !attack.`)
                                return message.channel.send(newspawnn)
                            }
                            let deathimg = client.mobs.mobs[spawned].deathimg
                            let Discord = require(`discord.js`)
                            let win = new Discord.RichEmbed()
                            .setColor(`#0099ff`)
                            .setTitle(`You have Defeated the Dungeon Boss!`)
                            .setDescription(`Behind the enemy corpse lies a way out, but more importantly, a door.`)
                            .addField(`Treasure:`, `Gold: ${gold} \nShards: ${shards} \n${mat}: 10`)
                            .setImage(deathimg)
                            .setTimestamp()
                            message.channel.send(win)
                            client.battles.delete(message.channel.id)
                            client.profile.set(message.author.id, 0, "questing")
                            for(i = 0; i < team.length; i++){
                                let char = team[i]
                                client.characters.set(char, 100, "Health")
                            }
                            for(i = 0; i <= meds; i++){
                                client.profile.push(message.author.id, 13, "items", true)
                            }
                            client.profile.math(message.author.id, "+", 10, mat)
                            client.profile.math(message.author.id, "+", gold, "gold")
                            if(spawned == 109){
                                client.profile.push(message.author.id, 16, "items")
                                client.profile.remove(message.author.id, 14, "items")
                            }
                            if(spawned == 135){
                                client.profile.push(message.author.id, 19, "items")
                            }
                            return client.profile.math(message.author.id, "+", shards, "shards")
                        }
                        let oghp = client.mobs.mobs[spawned].hp
                        let int = Math.floor(oghp/20)
                        var barl = 20
                        if(client.battles.get(message.channel.id, "hp") < oghp){
                            var barl = client.battles.get(message.channel.id, "hp")/int
                        }
                        var bar = []
                        for(i = 0; i <= barl; i++){
                            bar.push("▇")
                        }
                        if(client.battles.get(message.channel.id, "hp") < int/2){
                            var bar = ["▒"]
                        }
                        client.battles.set(message.channel.id, 1, "inter")
                        let barshow = bar.join("")
                        let attk = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`Your ${client.characters.get(check, "Name")} attacked with ${client.units.units[id1].abilities[attack].name}!`)
                        .setDescription(`Dmg dealt: \`${dmg}\``)
                        .addField(`${title}`, `${multi}`)
                        if(client.battles.get(message.channel.id, "Turn") < client.units.units[id1].abilities[2].cd){
                            if(parseInt(args[0]) !== 3){
                            if(client.battles.get(message.channel.id, "Turn") == 1){
                                attk.addField(`▰`, `**${spawnednme}** \`\`\`${barshow}\`\`\``)
                            }
                            if(client.battles.get(message.channel.id, "Turn") == 2){
                                attk.addField(`▰▰`, `**${spawnednme}** \`\`\`${barshow}\`\`\``)
                            }
                            if(client.battles.get(message.channel.id, "Turn") == 3){
                                attk.addField(`▰▰▰`, `**${spawnednme}** \`\`\`${barshow}\`\`\``)
                            }
                            if(client.battles.get(message.channel.id, "Turn") == 4){
                                attk.addField(`▰▰▰▰`, `**${spawnednme}** \`\`\`${barshow}\`\`\``)
                            }
                        }}
                            else if(parseInt(args[0]) !== 3){
                                if(client.battles.get(message.channel.id, "Turn") + 1 >= client.units.units[id1].abilities[2].cd){
                                if(abcd == 1){
                                attk.addField(`▰ **Ultimate Attack Ready!**`, `**${spawnednme}** \`\`\`${barshow}\`\`\``)
                                }
                                if(abcd == 2){
                                attk.addField(`▰▰ **Ultimate Attack Ready!**`, `**${spawnednme}** \`\`\`${barshow}\`\`\``)
                                }
                                if(abcd == 3){
                                attk.addField(`▰▰▰ **Ultimate Attack Ready!**`, `**${spawnednme}** \`\`\`${barshow}\`\`\``)}
                                if(abcd == 4){
                                attk.addField(`▰▰▰▰ **Ultimate Attack Ready!**`, `**${spawnednme}** \`\`\`${barshow}\`\`\``)}
                            }}
                            attk.setThumbnail(client.characters.get(check, "Image"))
                            message.channel.send(attk)
                        }
            else{
            let up = client.battles.get(message.channel.id, "up")
            if(reacted == '2️⃣'){
                if(client.battles.get(message.channel.id, "inter") == 1){
                    return message.channel.send(`You have already attacked this round.`)
                }
                let check = client.profile.get(message.author.id, "chosen")
                if(client.characters.get(check, "Health") == 0){
                    return message.channel.send(`This character has died before they could attack!`)
                }
                if(up.length == 0){
                    return message.channel.send(`This enemy has already died!`)
                }
                var ins = 0
                var assure = up[0]
                var target = up[0].spawned
                var hit = up[0].hp
            }
            else if(reacted == '3️⃣'){
                if(client.battles.get(message.channel.id, "inter") == 1){
                    return message.channel.send(`You have already attacked this round.`)
                }
                let check = client.profile.get(message.author.id, "chosen")
                if(client.characters.get(check, "Health") == 0){
                    return message.channel.send(`This character has died before they could attack!`)
                }
                if(up.length == 1){
                    return message.channel.send(`This enemy has already died!`)
                }
                var ins = 1
                var assure = up[1]
                var target = up[1].spawned
                var hit = up[1].hp
            }
            let check = client.profile.get(message.author.id, "chosen")
                let atk1 = client.characters.get(check, "Atk")
                let matk1 = client.characters.get(check, "Matk")
                let id1 = client.characters.get(check, "Lib")
                let hp1 = client.characters.get(check, "Health")
                let ap1 = client.units.units[id1].abilities[attack].Ap
                let hits1 = client.units.units[id1].abilities[attack].hits
            client.battles.math(message.channel.id, "+", 1, "Turn")
            let sdef = client.mobs.mobs[target].def
            let smdef = client.mobs.mobs[target].mdef
            var hitt = []
            var sub = 1
            var multi = `100% Damage!`
            var title = `Normal Attack`
            if(type == 1){
                var dmg = Math.floor(((ap1/2.5 * hits1) * atk1 / sdef) + Math.floor(Math.random() * 5))
                var ogspd = client.units.units[id1].spd
                var crit_chance = client.units.units[id1].abilities[attack].crit_chance
                var critcheck = Math.floor((Math.random() * 100) + 1)
                if(crit_chance > critcheck){
                    var dmg = Math.floor(dmg * 1.4)
                    var title = `Critical Hit!`
                    var multi = `40% Extra Damage!`
                }
                if(hits1 > 1){
                    var dmg = 0
                    var title = `Attack Chain!`
                    for(i = 0; i < hits1; i++){
                        var sub = sub + .06
                        var dmgbit = Math.floor(((ap1/2.3) * (atk1 / sub)) /sdef) + Math.floor(Math.random() * 3)
                        var dmgbitshow = client.emojis.get(`685621618541592593`)
                        var critcheck = Math.floor((Math.random() * 100) + 1)
                        if(crit_chance > critcheck){
                            var dmgbit = Math.round(dmgbit * 1.4)
                            var dmgbitshow = client.emojis.get(`685621618743050260`)
                        }
                        hitt.push(dmgbitshow)
                        var dmg = dmgbit + dmg
                    }
                    var multi = hitt.join(" ")
                    var multi = `${multi}`
                }
                client.battles.math(message.channel.id, "-", dmg, `up[${ins}].hp`)
                }
            else if(type == 2){
                var dmg = Math.floor(((ap1/2.5 * hits1) * matk1 / smdef) + Math.floor(Math.random() * 5))
                var ogspd = client.units.units[id1].spd
                var crit_chance = client.units.units[id1].abilities[attack].crit_chance
                var critcheck = Math.floor((Math.random() * 100) + 1)
                if(crit_chance > critcheck){
                    var dmg = Math.floor(dmg * 1.4)
                    var title = `Critical Hit!`
                    var multi = `40% Extra Damage!`
                }
                if(hits1 > 1){
                    var dmg = 0
                    var title = `Attack Chain!`
                    for(i = 0; i < hits1; i++){
                        var sub = sub + .06
                        var dmgbit = Math.floor(((ap1/2.3) * (matk1 / sub)) /smdef) + Math.floor(Math.random() * 3)
                        var dmgbitshow = client.emojis.get(`685621618541592593`)
                        var critcheck = Math.floor((Math.random() * 100) + 1)
                        if(crit_chance > critcheck){
                            var dmgbit = Math.round(dmgbit * 1.4)
                            var dmgbitshow = client.emojis.get(`685621618743050260`)
                        }
                        hitt.push(dmgbitshow)
                        var dmg = dmgbit + dmg
                    }
                    var multi = hitt.join(" ")
                    var multi = `${multi}`
                }
                client.battles.math(message.channel.id, "-", dmg, `up[${ins}].hp`)
            }
            let shp = client.battles.get(message.channel.id, `up[${ins}].hp`)
            if(shp < 0 || shp == 0){
                client.battles.set(message.channel.id, 1, "inter")
                let Discord = require(`discord.js`)
                let win = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setTitle(`Boss companion destroyed!`)
                .setDescription(`Everytime a boss companion is destroyed their buff effect/regen effect ends!`)
                .setImage(client.mobs.mobs[target].deathimg)
                .setFooter(`To continue with the battle use !attack.`)
                message.channel.send(win)
                if(up.length == 1){
                    return client.battles.set(message.channel.id, [], "up")
                }
                else if(ins == 0){
                    return client.battles.set(message.channel.id, [up[1]], "up")
                }
                else if(ins == 1){
                    return client.battles.set(message.channel.id, [up[0]], "up")
                }
            }
            client.battles.set(message.channel.id, 1, "inter")
            let Discord = require(`discord.js`)
            let attk = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`Your ${client.characters.get(check, "Name")} attacked with ${client.units.units[id1].abilities[attack].name}!`)
            .setDescription(`Dmg dealt: \`${dmg}\``)
            .addField(`${title}`, `${multi}`)
                        if(client.battles.get(message.channel.id, "Turn") < client.units.units[id1].abilities[2].cd){
                            if(parseInt(args[0]) !== 3){
                            if(client.battles.get(message.channel.id, "Turn") == 1){
                                attk.addField(`▰`, `Character Health: \`\`\`${hp1}\`\`\``)
                            }
                            if(client.battles.get(message.channel.id, "Turn") == 2){
                                attk.addField(`▰▰`, `Character Health: \`\`\`${hp1}\`\`\``)
                            }
                            if(client.battles.get(message.channel.id, "Turn") == 3){
                                attk.addField(`▰▰▰`, `Character Health: \`\`\`${hp1}\`\`\``)
                            }
                            if(client.battles.get(message.channel.id, "Turn") == 4){
                                attk.addField(`▰▰▰▰`, `Character Health: \`\`\`${hp1}\`\`\``)
                            }
                        }}
                        else if(args[0] == 3){
                            if(abcd == 1){
                                attk.addField(`▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hp1}\`\`\``)
                                } 
                            if(abcd == 2){
                            attk.addField(`▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hp1}\`\`\``)
                            } 
                            if(abcd == 3){
                            attk.addField(`▱▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hp1}\`\`\``)
                            }
                            if(abcd == 4){
                            attk.addField(`▱▱▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hp1}\`\`\``)
                            }}
                            else if(parseInt(args[0]) !== 3){
                                if(client.battles.get(message.channel.id, "Turn") + 1 >= client.units.units[id1].abilities[2].cd){
                                if(abcd == 1){
                                attk.addField(`▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hp1}\`\`\``)
                                }
                                if(abcd == 2){
                                attk.addField(`▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hp1}\`\`\``)
                                }
                                if(abcd == 3){
                                attk.addField(`▰▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hp1}\`\`\``)}
                                if(abcd == 4){
                                attk.addField(`▰▰▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hp1}\`\`\``)}
                            }}
                            attk.addField(`*Companion ${client.mobs.mobs[target].name}!*`, `Enemy Health: \`\`\`${client.battles.get(message.channel.id, `up[${ins}].hp`)}\`\`\``)
                            attk.setFooter(`Use !attack to continue fighting!`)
                            attk.setThumbnail(client.characters.get(check, "Image"))
                            attk.setImage(client.mobs.mobs[target].image)
                            message.channel.send(attk)
        }
            })
            })
            }
        if(client.battles.get(message.channel.id, "inter") == 0){
            return; 
        }
        if(stage < 3){
            var attacked = 0
        if(ehp <= 900 && stage == 0){
            var attacked = 1
            for(i = 0; i < active.length; i++){
                var char = active[i]
                var stageimg = client.mobs.mobs[spawned].stage1
                var newhp = Math.floor(client.characters.get(char, "Health") * 0.5)
                client.characters.set(char, newhp, "Health")
                client.battles.set(message.channel.id, 1, "stage")
            }
        }
        else if(ehp <= 500 && stage == 1){
            var attacked = 1
            for(i=0; i < active.length; i++){
                var char = active[i]
                var stageimg = client.mobs.mobs[spawned].stage2
                var newhp = Math.floor(client.characters.get(char, "Health") * 0.7)
                client.characters.set(char, newhp, "Health")
                client.battles.set(message.channel.id, 2, "stage")
            }
        }
        else if(ehp <= 200 && stage == 2){
            var attacked = 1
            for(i=0; i < active.length; i++){
                var char = active[i]
                var stageimg = client.mobs.mobs[spawned].stage3
                var newhp = Math.floor(client.characters.get(char, "Health") * 0.8)
                client.characters.set(char, newhp, "Health")
                client.battles.set(message.channel.id, 3, "stage")
            }
        }
        if(attacked == 1){
        client.battles.set(message.channel.id, 0, "inter")
        let Discord = require(`discord.js`)
        let stage = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`Boss ${spawnednme} has attacked all characters!`)
        .setDescription(`All characters have lost 50 - 80% hp!`)
        .setImage(stageimg)
        .setThumbnail(client.mobs.mobs[spawned].image)
        for(i = 0; i < team.length; i++){
            var status = " "
            let char = team[i]
            let deadcheck = client.battles.get(message.channel.id, "dead")
            if(deadcheck.includes(char)){
                var status = "💀"
            }
            stage.addField(`\n${client.characters.get(char, "Name")}`, `${client.characters.get(char, "Health")} | ${status}`)
        }
        stage.setFooter(`To continue please use !attack`)
        return message.channel.send(stage)}}
    let atkchance = Math.floor(Math.random() * 100)
    let enmtype = Math.floor(Math.random() * 1)
    var boost = 0
    var event = "None"
    if(up.length == 1){
        let actionchance = Math.floor(Math.random() * 100)
        if(actionchance < 25){
            var boost = Math.floor(Math.random() * actionchance/3)
            var event = "Buff"
        }
        else if(actionchance >= 25){
            var heal = Math.floor(Math.random() * actionchance/5)
            client.battles.math(message.channel.id, "+", heal, "hp")
            var event = "Heal"
        }
    }
    if(up.length == 2){
        let actionchance = Math.floor(Math.random() * 100)
        if(actionchance < 20){
            var boost = Math.floor(Math.random() * actionchance/1.5) * 2
            var event = "Buff"
        }
        else if(actionchance >= 20 && actionchance > 80){
            var boost = Math.floor(Math.random() * actionchance/3)
            var heal = Math.floor(Math.random() * actionchance/5)
            var event = "Buff | Heal"
            client.battles.math(message.channel.id, "+", heal, "hp")
        }
        else if(actionchance >= 80){
            var heal = Math.floor(Math.random() * actionchance/5)
            var event = "Heal"
            client.battles.math(message.channel.id, "+", heal, "hp")
        }
    }
      if(enmtype == 0){
        var reduce = Math.floor(Math.random() * 5)
        var enmatk = Math.floor(((mdmg + (ematk / 20)) - (mdef / 20) - lvl/5) - reduce) + boost
      }  
      else if(enmtype == 1){
        var reduce = Math.floor(Math.random() * 5)
        var enmatk = Math.floor(((mdmg + (eatk / 20)) - (def / 20) - lvl/5) - reduce) + boost
      }
      if(atkchance > 15){
          client.battles.set(message.channel.id, 0, "inter")
          client.characters.math(chosen, "-", enmatk, "Health")
          if(client.characters.get(chosen, "Health") <= 0){
              client.battles.remove(message.channel.id, chosen, "active")
              client.battles.push(message.channel.id, chosen, "dead")
              client.characters.set(chosen, 0, "Health")
              if(client.battles.get(message.channel.id, "dead").length == team.length){
                client.battles.delete(message.channel.id)
                client.profile.set(message.author.id, 0, "questing")
                for(i = 0; i < team.length; i++){
                    let char = team[i]
                    client.characters.set(char, 100, "Health")
                }
                let Discord = require(`discord.js`)
                let defeat = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setTitle(`All your characters have died!`)
                .setDescription(`As your last character falls, the dungeon slowly fades away, leaving you returned to the location where it began.`)
                .addField(`Key has been consumed.`, `All characters have been returned to max health!`)
                .setImage(`https://i.imgur.com/1xbVKUy.gif`)
                .setFooter(`Better luck next time!`)
                return message.channel.send(defeat)
            }
              let Discord = require(`discord.js`)
              let kill = new Discord.RichEmbed()
              .setColor(`#0099ff`)
              .setTitle(`Boss ${spawnednme} has Killed your chosen character!!`)
              .setDescription(`This character can no longer be used in the dungeon!`)
              .setFooter(`The boss will rest for 1 turn, he will not be able to attack!`)
              .setImage(`https://i.imgur.com/aIRkFhN.gif`)
              return message.channel.send(kill)
          }
          let Discord = require(`discord.js`)
          let attack = new Discord.RichEmbed()
          .setColor(`#0099ff`)
          .setTitle(`The ${spawnednme} has attacked your chosen character!`)
          .addField(`Effect Aplied to Boss:`, `${event}`)
          .addField(`Dmg Dealth: ${enmatk}`, `Character Health Remaining: \`\`\`${client.characters.get(chosen, "Health")}\`\`\``)
          .setThumbnail(client.characters.get(chosen, "Image"))
          .setImage(client.mobs.mobs[spawned].atkimg)
          .setFooter(`Use !attack to continue!`)
          return message.channel.send(attack)
      }
      else if(atkchance <= 15){
          client.battles.set(message.channel.id, 0, "inter")
          for(i = 0; i < active.length; i++){
              let char = active[i]
              let enmatkn = Math.floor(enmatk * .5)
              client.characters.math(char, "-", enmatkn, "Health")
              let newhp = client.characters.get(char, "Health")
              if(newhp <= 0){
                  client.battles.remove(message.channel.id, char, "active")
                  client.battles.push(message.channel.id, char, "dead")
                  client.characters.set(char, 0, "Health")
              }
            }
              if(client.battles.get(message.channel.id, "dead").length == team.length){
                client.battles.delete(message.channel.id)
                client.profile.set(message.author.id, 0, "questing")
                for(i = 0; i < team.length; i++){
                    let chars = team[i]
                    client.characters.set(chars, 100, "Health")
                }
                let Discord = require(`discord.js`)
                let defeat = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setTitle(`All your characters have died!`)
                .setDescription(`As your last character falls, the dungeon slowly fades away, leaving you returned to the location where it began.`)
                .addField(`Key has been consumed.`, `All characters have been returned to max health!`)
                .setImage(`https://i.imgur.com/92FRSQQ.gif`)
                .setFooter(`Better luck next time!`)
                return message.channel.send(defeat)
              }
              let Discord = require(`discord.js`)
              let kill = new Discord.RichEmbed()
              .setColor(`#0099ff`)
              .setTitle(`Boss ${spawnednme} has attacked your team multiple times!`)
              .setDescription(`All characters have been hit with normal attack!`)
              .addField(`Effect applied to Boss:`, `${event}`)
              for(i = 0; i < team.length; i++){
                  let char = team[i]
                  var status = " "
                  let checkdead = client.battles.get(message.channel.id, "dead")
                  if(checkdead.includes(char)){
                      var status = "💀"
                  }
                kill.addField(`${client.characters.get(char, "Name")}`, `${client.characters.get(char, "Health")} Hp | ${status}`)
              }
              kill.setFooter(`Use !attack to continue!`)
              kill.setImage(client.mobs.mobs[spawned].atkimg)
              return message.channel.send(kill)
    }
      return;
    }
        if(client.battles.has(message.channel.id, "raid")){
            let parts = client.battles.get(message.channel.id, "participants")
            let active = client.battles.get(message.channel.id, "active")
            let attacks = client.battles.get(message.channel.id, "attacks")
            let guild = client.profile.get(message.author.id, "guild")
            let dead = client.battles.get(message.channel.id, "dead")
            if(!parts.includes(message.author.id)){
                return message.channel.send(`You are not in this raid!`)
            }
            if(parts.includes(message.author.id)){
                if(attacks.includes(message.author.id)){
                    return message.channel.send(`You have already attacked this round!`)
                }
                if(dead.includes(message.author.id)){
                    return message.channel.send(`You have been defeated!`)
                }
                let turn = client.battles.get(message.author.id, "turn")
                let attack = parseInt(args[0] - 1)
                const chosen = client.profile.get(message.author.id, "chosen")
                const charnme = client.characters.get(chosen, "Name")
                const charhp = client.characters.get(chosen, "Health")
                const charatk = client.characters.get(chosen, "Atk")
                const charmatk = client.characters.get(chosen, "Matk")
                const chardef = client.characters.get(chosen, "Def")
                const charmdef = client.characters.get(chosen, "Mdef")
                const charspd = client.characters.get(chosen, "Spd")
                const charimg = client.characters.get(chosen, "Image")
                const charid = client.characters.get(chosen, "Lib")
                const abname = client.units.units[charid].abilities[attack].name
                const abap = client.units.units[charid].abilities[attack].Ap
                const abtype = client.units.units[charid].abilities[attack].type
                const abhits = client.units.units[charid].abilities[attack].hits
                const abcd = client.units.units[charid].abilities[2].cd
                const remaining = abcd - turn
                const spawned = client.battles.get(message.channel.id, "id")
                const health = client.battles.get(message.channel.id, "hp")
                const name = client.mobs.mobs[spawned].name
                const img = client.mobs.mobs[spawned].image
                const desc = client.mobs.mobs[spawned].description
                const def = client.mobs.mobs[spawned].def
                const mdef = client.mobs.mobs[spawned].mdef
                const oghealth = client.mobs.mobs[spawned].hp
                const deathimg = client.mobs.mobs[spawned].deathimg
                if(attack == 2){
                    if(turn < abcd){
                        const Discord = require(`discord.js`)
                        const abil = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`Your ultimate attack is on cooldown!`)
                        .setDescription(`Turns left before use: ${remaining}`)
                        .setImage(charimg)
                        .setTimestamp()
                        return message.channel.send(abil)
                    }}
                    var titler = `Normal Attack`
                    var multir = `100% Damage!`
                    var hittr = []
                    var sub = 1
                    if(abtype == 2){
                    var dmg = Math.floor(((abap/2.5 * abhits) * charmatk / mdef) + Math.floor(Math.random() * 5))
                    let ogspd = client.units.units[charid].spd
                    var crit_chance = client.units.units[charid].abilities[attack].crit_chance
                    var critcheck = Math.floor((Math.random() * 100) + 1)
                    if(crit_chance > critcheck){
                        var dmg = Math.floor(dmg * 1.4)
                        var titler = `Critical Hit!`
                        var multir = `40% Extra Damage!`
                    }
                    if(abhits > 1){
                        var dmg = 0
                        var titler = `Attack Chain!`
                        for(i = 0; i < abhits; i++){
                            var sub = sub + .06
                            var dmgbit = Math.floor(((abap/2.3) * (charmatk / sub)) /mdef) + Math.floor(Math.random() * 3)
                            var dmgbitshow = client.emojis.get(`685621618541592593`)
                            var critcheck = Math.floor((Math.random() * 100) + 1)
                            if(crit_chance > critcheck){
                                var dmgbit = Math.round(dmgbit * 1.4)
                                var dmgbitshow = client.emojis.get(`685621618743050260`)
                            }
                            hittr.push(dmgbitshow)
                            var dmg = dmgbit + dmg
                        }
                        var multir = hittr.join(" ")
                        var multir = `${multir}`
                    }
                    client.battles.math(message.channel.id, "-", dmg, "hp")}
        
                    else if(abtype == 1){
                    var dmg = Math.floor(((abap/2.5 * abhits) * charatk / def) + Math.floor(Math.random() * 5))
                    let ogspd = client.units.units[charid].spd
                    var crit_chance = client.units.units[charid].abilities[attack].crit_chance
                    var critcheck = Math.floor((Math.random() * 100) + 1)
                    if(crit_chance > critcheck){
                        var dmg = Math.floor(dmg * 1.4)
                        var titler = `Critical Hit!`
                        var multir = `40% Extra Damage!`
                    }
                    if(abhits > 1){
                        var dmg = 0
                        var titler = `Attack Chain!`
                        for(i = 0; i < abhits; i++){
                            var sub = sub + .06
                            var dmgbit = Math.floor(((abap/2.3) * (charatk / sub)) /def) + Math.floor(Math.random() * 3)
                            var dmgbitshow = client.emojis.get(`685621618541592593`)
                            var critcheck = Math.floor((Math.random() * 100) + 1)
                            if(crit_chance > critcheck){
                                var dmgbit = Math.round(dmgbit * 1.4)
                                var dmgbitshow = client.emojis.get(`685621618743050260`)
                            }
                            hittr.push(dmgbitshow)
                            var dmg = dmgbit + dmg
                        }
                        var multir = hittr.join(" | ")
                        var multir = `${multir}`
                    }
                    if(dmg < 0){
                        var dmg = 0
                    }
                    client.battles.math(message.channel.id, "-", dmg, "hp")
                    }
                    client.battles.push(message.channel.id, message.author.id, "attacks")
                    client.battles.math(message.author.id, "+", 1, "turn")
                    let newhp = client.battles.get(message.channel.id, "hp")
                    if(newhp <= 0){
                        if(spawned == 134){
                            client.battles.set(message.channel.id, {spawned: 135, hp: 1500, atk: 200, matk: 100, def: 150, mdef: 160, spd: 100, id: 135, Turn: 0, dungeon: 5, wave: 0, active: active, dead: dead, team: team, part: message.author.id, inter: 1, up: [{spawned: client.locs.dungeons[5].support1, hp: 100, place: 1}, {spawned: client.locs.dungeons[5].support2, hp: 100, place: 2}], stage: 0})
                            let Discord = require(`discord.js`)
                            let newspawnn = new Discord.RichEmbed()
                            .setColor(`#FF0000`)
                            .setTitle(`New boss has appeared!`)
                            .setDescription(`Rayquaza appears to be mega evolving!`)
                            .setImage(`https://i.imgur.com/nnD5F9m.gif`)
                            .setThumbnail(`https://i.imgur.com/UPmGSA1.gif`)
                            .addField(`Health: \`\`\`1250\`\`\``)
                            .setFooter(`To continue please use !attack.`)
                            return message.channel.send(newspawnn)
                        }
                        for (i = 0; i < parts.length; i++) {
                            client.profile.set(parts[i], 0, "questing")
                            let part = parts[i]
                            let chosen = client.profile.get(part, "chosen")
                            client.characters.set(chosen, 100, "Health")
                            client.profile.math(part, "+", 50, "shards")
                            client.profile.math(part, "+", 10000, "gold")
                            client.profile.math(part, "+", 1, "glimmer")
                            client.battles.delete(part)
                            }
                            if(!client.guild.has(guild, "points")){
                                client.guild.set(guild, 0, "points")
                            }
                            let points = Math.floor((Math.random() * 2) + 1)
                            client.guild.math(guild, "+", points, "points")
                            for(i = 0;i<parts.length;i++){
                                let profile = parts[i]
                        if(client.profile.has(profile, "daily")){
                            let dailies = client.profile.get(profile, "daily")
                            const user = client.users.find(user =>user.id === profile)
                            if(dailies.includes(4)){
                                client.profile.remove(profile, 4, "daily")
                                let Discord = require(`discord.js`)
                                let accomplished = new Discord.RichEmbed()
                                .setColor(`#ffff00`)
                                .setTitle(`Daily Mission Accomplished!`)
                                .setDescription(`You have completed a daily mission and have recieved the following rewards.`)
                                .addField(`Rewards:`, `Shards: \`${client.missions.daily[4].shards}\` \nGold: \`${client.missions.daily[4].gold}\` \nGlimmer: \`${client.missions.daily[4].glimmer}\``)
                                .setFooter(`This mission has been removed from your !missions.`)
                                .setTimestamp()
                                .setThumbnail(user.avatarURL)
                                message.channel.send(accomplished)
                                client.profile.math(profile, "+", client.missions.daily[4].shards, "shards")
                                client.profile.math(profile, "+", client.missions.daily[4].gold, "gold")
                                clientt.profile.math(profile, "+", client.missions.daily[4].glimmer, "glimmer")
                            }
                        }}
                        let Discord = require(`discord.js`)
                        let defeated = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`You have defeated the ${name}!`)
                        .setDescription(`As the enemy falls, rewards drain to the victors!`)
                        .addField(`Rewards:`, `Gold: 10000 \nShards: 50 \nGlimmer: 1 \nPoints: ${points}`)
                        .setFooter(`Guild raid is accessible again in 24 hours!`)
                        .setImage(deathimg)
                        message.channel.send(defeated)
                        client.guild.set(guild, 0, "raid")
                        let next = Date.now() + 86400000
                        client.guild.set(guild, next, "next")
                        return client.battles.delete(message.channel.id)
                    }
                    let Discord = require(`discord.js`)
                    let spawn = new Discord.RichEmbed()
                    .setColor(`#0099ff`)
                    .setTitle(`${message.author.username}'s ${charnme} has attacked with ${abname}!`)
                    .setDescription(`Dmg Dealt: \`${dmg}\``)
                    .setImage(img)
                    .setThumbnail(charimg)
                    spawn.addField(`${titler}`, `${multir}`)
                    if(turn + 1 < abcd){
                        if(parseInt(args[0]) !== 3){
                        if(turn + 1 == 1){
                            spawn.addField(`▰`, `Character Health: \`\`\`${charhp}\`\`\``)
                        }
                        if(turn + 1 == 2){
                            spawn.addField(`▰▰`, `Character Health: \`\`\`${charhp}\`\`\``)
                        }
                        if(turn + 1 == 3){
                            spawn.addField(`▰▰▰`, `Character Health: \`\`\`${charhp}\`\`\``)
                        }}}
                    else if(args[0] == 3){
                        if(abcd == 1){
                            spawn.addField(`▱ **Ultimate attack used!**`, `Character Health: \`\`\`${charhp}\`\`\``)
                            } 
                        if(abcd == 2){
                        spawn.addField(`▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${charhp}\`\`\``)
                        } 
                        if(abcd == 3){
                        spawn.addField(`▱▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${charhp}\`\`\``)
                        }
                        if(abcd == 4){
                            spawn.addField(`▱▱▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${charhp}\`\`\``)
                        }}
                        else if(parseInt(args[0]) !== 3){
                        if(turn + 1 >= abcd){
                            if(abcd == 1){
                                spawn.addField(`▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${charhp}\`\`\``)
                            }
                        if(abcd == 2){
                            spawn.addField(`▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${charhp}\`\`\``)
                        }
                        if(abcd == 3){
                        spawn.addField(`▰▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${charhp}\`\`\``)}
                        if(abcd == 4){
                        spawn.addField(`▰▰▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${charhp}\`\`\``)}
                    }}
                    let newhealth = client.battles.get(message.channel.id, "hp")
                    spawn.addField(`**Wild ${name}**`, `Enemy Health: \`\`\`${newhealth}\`\`\`` )
                    spawn.setFooter(`To fight it use the !attack command!`)
                    message.channel.send(spawn)
                    if(parseInt(args[0]) == 3){
                        client.battles.set(message.author.id, 0, "turn")
                    }
                    if(client.battles.get(message.channel.id, "attacks").length == parts.length - dead.length){
                        client.battles.set(message.channel.id, [], "attacks")
                        let s1 = client.mobs.mobs[spawned].stage1
                        let s2 = client.mobs.mobs[spawned].stage2
                        let s3 = client.mobs.mobs[spawned].stage3
                        if(newhealth < 700 && client.battles.get(message.channel.id, "stage") < 1){
                            for(i = 0; i < active.length; i++){
                                let part = active[i]
                                let cho = client.profile.get(part, "chosen")
                                let chp = client.characters.get(cho, "Health")
                                let newhp = Math.floor(chp * 0.3)
                                client.characters.set(cho, newhp, "Health")}
                                client.battles.set(message.channel.id, 1, "stage")
                                let stage1 = new Discord.RichEmbed()
                                .setColor(`#0099ff`)
                                .setTitle(`The ${name} attacks you all!!`)
                                .setDescription(`Damage Dealt: \`70% of all character health!\``)
                                .addField(`${desc}`, `Health Remaining: \`\`\`${newhealth}\`\`\``)
                                for(i = 0; i < active.length; i++){
                                    let part = active[i]
                                    let chos = client.profile.get(part, "chosen")
                                    let hp = client.characters.get(chos, "Health")
                                    let nem = client.characters.get(chos, "Name")
                                    stage1.addField(`${i+1}. ${nem}`, `\`${hp}\` Health Remaining`)
                                }
                                stage1.setFooter(`Continue with !attack!`)
                                stage1.setImage(s1)
                                stage1.setThumbnail(img)
                               return message.channel.send(stage1)

                        }
                        else if(newhealth < 500 && client.battles.get(message.channel.id, "stage") < 2){
                            for(i = 0; i < active.length; i++){
                                let part = active[i]
                                let cho = client.profile.get(part, "chosen")
                                let chp = client.characters.get(cho, "Health")
                                let newhp = Math.floor(chp * 0.2)
                                client.characters.set(cho, newhp, "Health")}
                                client.battles.set(message.channel.id, 2, "stage")
                                let stage1 = new Discord.RichEmbed()
                                .setColor(`#0099ff`)
                                .setTitle(`The ${name} attacks you all!!`)
                                .setDescription(`Damage Dealt: \`80% of all character health!\``)
                                .addField(`${desc}`, `Health Remaining: \`\`\`${newhealth}\`\`\``)
                                for(i = 0; i < active.length; i++){
                                    let part = active[i]
                                    let chos = client.profile.get(part, "chosen")
                                    let hp = client.characters.get(chos, "Health")
                                    let nem = client.characters.get(chos, "Name")
                                    stage1.addField(`${i+1}. ${nem}`, `\`${hp}\` Health Remaining`)
                                }
                                stage1.setFooter(`Continue with !attack!`)
                                stage1.setImage(s2)
                                stage1.setThumbnail(img)
                               return message.channel.send(stage1)
                        }
                        else if(newhealth < 250 && client.battles.get(message.channel.id, "stage") < 3){
                            for(i = 0; i < active.length; i++){
                                let part = active[i]
                                let cho = client.profile.get(part, "chosen")
                                let chp = client.characters.get(cho, "Health")
                                let newhp = Math.floor(chp * 0.1)
                                client.characters.set(cho, newhp, "Health")}
                                client.battles.set(message.channel.id, 3, "stage")
                                let stage1 = new Discord.RichEmbed()
                                .setColor(`#0099ff`)
                                .setTitle(`The ${name} attacks you all!!`)
                                .setDescription(`Damage Dealt: \`90% of all character health!\``)
                                .addField(`${desc}`, `Health Remaining: \`\`\`${newhealth}\`\`\``)
                                for(i = 0; i < active.length; i++){
                                    let part = active[i]
                                    let chos = client.profile.get(part, "chosen")
                                    let hp = client.characters.get(chos, "Health")
                                    let nem = client.characters.get(chos, "Name")
                                    stage1.addField(`${i+1}. ${nem}`, `\`${hp}\` Health Remaining`)
                                }
                                stage1.setFooter(`Continue with !attack!`)
                                stage1.setImage(s3)
                                stage1.setThumbnail(img)
                               return message.channel.send(stage1)}
                        var norm = ' '
                        let target = active[Math.floor(Math.random() * active.length)];
                        const mdmg = client.mobs.mobs[spawned].dmg
                        const matk = client.mobs.mobs[spawned].matk
                        const atk = client.mobs.mobs[spawned].atk
                        const atkimg = client.mobs.mobs[spawned].atkimg
                        let targetc = client.profile.get(target, "chosen")
                        let tmdef = client.characters.get(targetc, "Mdef")
                        let tdef = client.characters.get(targetc, "Def")
                        let tlvl = client.characters.get(targetc, "Level")
                        let thp = client.characters.get(targetc, "Health")
                        let tname = client.characters.get(targetc, "Name")
                        let timg = client.characters.get(targetc, "Image")
                        const enmacheck = Math.floor((Math.random() * 2) + 1)
                        if(enmacheck == 2){
                        var reduce = Math.floor(Math.random() * 5)
                        var enmatk = Math.floor(((mdmg + (matk / 10)) - (tmdef / 20) - tlvl/5) - reduce)
                        }
                        if(enmacheck == 1){
                        var reduce = Math.floor(Math.random() * 5)
                        var enmatk = Math.floor(((mdmg + (atk / 10)) - (tdef / 20) - tlvl/5) - reduce)
                        }
                        let checke = Math.round(Math.random() * 100)
                        if(checke <= 30){
                            var enmatk = Math.round(enmatk * 1.25)
                            var norm = `| ${client.emojis.get(`685621437591060492`)} | +25% dmg!`
                        }
                        if(checke > 30 && checke < 40){
                            var enmatk = Math.round(enmatk * .4)
                            var norm = `| ${client.emojis.get(`685621521644781576`)} | -60% dmg!`
                        }
                        client.characters.math(targetc, "-", enmatk, "Health")
                        var hpshowc = client.characters.get(targetc, "Health")
                        if(client.characters.get(targetc, "Health") < 0){
                            var hpshowc = 0
                        }
                        let atkt = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`The ${name} has attacked!`)
                        .setDescription(`Dmg Dealt to <@${target}>: \`${enmatk}\` ${norm}`)
                        .addField(`${tname} Health Remaining: \`${hpshowc}\``,`Health Remaining: \`\`\`${newhealth}\`\`\``)
                        .setImage(atkimg)
                        .setThumbnail(timg)
                        if(client.characters.get(targetc, "Health") <= 0){
                            client.battles.push(message.channel.id, target, "dead")
                            client.battles.remove(message.channel.id, target, "active")
                            client.characters.set(targetc, 100, "Health")
                            atkt.addField(`Death has claimed you!`, `<@${target}> has been defeated!`)
                            atkt.setImage("https://i.imgur.com/aIRkFhN.gif")
                            atkt.setThumbnail(atkimg)
                        }
                        if(client.battles.get(message.channel.id, "dead").length == client.battles.get(message.channel.id, "participants").length){
                            atkt.addField(`ALL PLAYERS HAVE BEEN DEFEATED!!`, `The guild champion stands victorious!!`)
                            for(i = 0; i < parts.length; i++){
                                let part = parts[i]
                                client.profile.set(part, 0, "questing")
                                client.battles.delete(part)
                                client.battles.delete(message.channel.id)
                                let next = Date.now() + 86400000
                                client.guild.set(guild, next, "next")
                            }
                        }
                        return message.channel.send(atkt)
                    }
                    return;
            }}
        client.battles.set(message.channel.id, message.author.id, "participant")
        const turn = client.battles.get(message.channel.id, "Turn")
        const user = message.author.id
        const attack = parseInt(args[0] - 1)
        const chosen = client.profile.get(user, "chosen")
        const charnme = client.characters.get(chosen, "Name")
        const charhp = client.characters.get(chosen, "Health")
        const charatk = client.characters.get(chosen, "Atk")
        const charmatk = client.characters.get(chosen, "Matk")
        const chardef = client.characters.get(chosen, "Def")
        const charmdef = client.characters.get(chosen, "Mdef")
        const charspd = client.characters.get(chosen, "Spd")
        const charimg = client.characters.get(chosen, "Image")
        const charid = (client.characters.get(chosen, "Lib"))

        const abname = client.units.units[charid].abilities[attack].name
        const abap = client.units.units[charid].abilities[attack].Ap
        const abtype = client.units.units[charid].abilities[attack].type
        const abhits = client.units.units[charid].abilities[attack].hits
        const abcd = client.units.units[charid].abilities[2].cd


        const turnturn = client.battles.get(message.channel.id, "Turn")
        const remaining = abcd - turnturn

        const spawned = client.battles.get(message.channel.id, "id")
        const health = client.battles.get(message.channel.id, "hp")

        const name = client.mobs.mobs[spawned].name
        const img = client.mobs.mobs[spawned].image
        const desc = client.mobs.mobs[spawned].description
        const def = client.mobs.mobs[spawned].def
        const mdef = client.mobs.mobs[spawned].mdef
        const oghealth = client.mobs.mobs[spawned].hp
            if(attack == 2){
                if(turnturn < abcd){
                    const Discord = require(`discord.js`)
                    const abil = new Discord.RichEmbed()
                    .setColor(`#0099ff`)
                    .setTitle(`Your ultimate attack is on cooldown!`)
                    .setDescription(`Turns left before use: ${remaining}`)
                    .setImage(charimg)
                    .setTimestamp()
                    return message.channel.send(abil)
                }}
            var title = 1
            var multi = `${client.emojis.get(`685621618541592593`)} | 100% dmg.`
            var hitt = []
            var sub = 1
            if(abtype == 2){
            var dmg = Math.floor(((abap/2.5 * abhits) * charmatk / mdef) + Math.floor(Math.random() * 5))
            let ogspd = client.units.units[charid].spd
            var crit_chance = client.units.units[charid].abilities[attack].crit_chance
            var critcheck = Math.floor((Math.random() * 100) + 1)
            if(crit_chance > critcheck){
                var dmg = Math.floor(dmg * 1.4)
                var title = `Critical Hit!`
                var multi = `${client.emojis.get(`685621618743050260`)} | +40% dmg!`
            }
            if(abhits > 1){
                var dmg = 0
                var title = `Attack Chain!`
                for(i = 0; i < abhits; i++){
                    var sub = sub + .06
                    var dmgbit = Math.floor(((abap/2.3) * (charmatk / sub)) /mdef) + Math.floor(Math.random() * 2)
                    var dmgbitshow = client.emojis.get(`685621618541592593`)
                    var critcheck = Math.floor((Math.random() * 100) + 1)
                    if(crit_chance > critcheck){
                        var dmgbit = Math.round(dmgbit * 1.5)
                        var dmgbitshow = client.emojis.get(`685621618743050260`)                      
                    }
                    hitt.push(dmgbitshow)
                    var dmg = dmgbit + dmg
                }
                var multi = hitt.join(" ")
                var multi = `${multi}`
            }
            client.battles.math(message.channel.id, "-", dmg, "hp")}

            else if(abtype == 1){
            var dmg = Math.floor(((abap/2.5 * abhits) * charatk / def) + Math.floor(Math.random() * 2))
            let ogspd = client.units.units[charid].spd
            var crit_chance = client.units.units[charid].abilities[attack].crit_chance
            var critcheck = Math.floor((Math.random() * 100) + 1)
            if(crit_chance > critcheck){
                var dmg = Math.floor(dmg * 1.4)
                var multi = `40% more Damage!`
                var title = `Critical Hit!`
            }
            if(abhits > 1){
                var dmg = 0
                var title = `Attack Chain!`
                for(i = 0; i < abhits; i++){
                    var sub = sub + .06
                    var dmgbit = Math.floor(((abap/2.3) * (charatk / sub)) /def) + Math.floor(Math.random() * 3)
                    var dmgbitshow = client.emojis.get(`685621618541592593`)
                    var critcheck = Math.floor((Math.random() * 100) + 1)
                    if(crit_chance > critcheck){
                        var dmgbit = Math.round(dmgbit * 1.4)
                        var dmgbitshow = client.emojis.get(`685621618743050260`)
                    }
                    hitt.push(dmgbitshow)
                    var dmg = dmgbit + dmg
                }
                var multi = hitt.join(" ")
                var multi = `${multi}`
            }

            if(dmg < 0){
                var dmg = 0
            }
            client.battles.math(message.channel.id, "-", dmg, "hp")
            }
            let chance = Math.floor(Math.random() * 25)
            if(client.profile.has(message.author.id, "chosenp")){
                if(client.profile.get(message.author.id, "chosenp") !== 0){
                let pet = client.profile.get(message.author.id, "chosenp")
                let tempcheck = client.pets.get(pet, "lib")
                let psd = client.pet.pets[tempcheck].spd
                if(chance < psd){
                    let patk = client.pets.get(pet, "attack")
                    let pmatk = client.pets.get(pet, "mattack")
                    let plvl = client.pets.get(pet, "level")
                    let checkty = Math.floor((Math.random() * 2) + 1)
                    if(checkty == 1){
                        var phit = Math.floor((patk/3) * (100/def))
                    }
                    else if(checkty == 2){
                        var phit = Math.floor((pmatk/3) * (100/mdef))
                    }
                    if(phit <= 0){
                        var phit = 3
                    }
                    client.battles.math(message.channel.id, "-", phit, "hp")
                    client.pets.math(pet, "+", 1, "exp")
                }}}
            const newhealth = client.battles.get(message.channel.id, "hp")
            const newdmg = health - newhealth
            //Monster Killed
            if(newhealth == 0 || newhealth < 0) {
                const charlvl = client.characters.get(chosen, "Level")
                const gold = Math.floor(oghealth/10) * Math.floor((Math.random() * 5) + 1) + spawned;
                const exp = Math.floor((oghealth/9)) + Math.floor((Math.random() * 4) + 1) + spawned
                var tonext = client.levels.levels[charlvl].next 
                const levels = client.levels.levels.length - 1
                const charexp = client.characters.get(chosen, "Exp")
                const newexp = charexp + exp
            if(client.profile.has(message.author.id, "chosenp")){
                if(client.profile.get(message.author.id, "chosenp") !== 0){
                let petlevels = client.pet.levels.length - 1
                const pet = client.profile.get(message.author.id, "chosenp")
                const petlvl = client.pets.get(pet, "level")
                const petcheck = client.pets.get(pet, "exp")
                const petnext = client.pet.levels[petlvl].next
                if(petcheck >= petnext && petlvl < petlevels){
                    client.pets.math(pet, "+", 2, "attack")
                    client.pets.math(pet, "+", 2, "mattack")
                    client.pets.math(pet, "+", 2, "speed")
                    client.pets.math(pet, "+", 1, "level")

                    message.channel.send(`Your pet has leveled up!`)
                }}}
                if(charlvl < levels){
                client.characters.set(chosen, newexp, "Exp")
                if(newexp > tonext || newexp == tonext){
                    var plus = 5
                    if(client.characters.has(chosen, "rarity")){
                    let rarity = client.characters.get(chosen, "rarity")
                    if(rarity == 0){
                        var plus = 4
                    }
                    if(rarity == 1){
                        var plus = 4.5
                    }
                    if(rarity == 2){
                        var plus = 5
                    }
                    if(rarity == 3){
                        var plus = 6
                    }
                    }
                    const newatk = charatk + plus
                    const newmatk = charmatk + plus
                    const newdef = chardef + plus
                    const newmdef = charmdef + plus
                    const newspd = charspd + plus
                    const newlev = charlvl + 1

                    client.characters.set(chosen, newlev, "Level")
                    client.characters.set(chosen, newatk, "Atk")
                    client.characters.set(chosen, newmatk, "Matk")
                    client.characters.set(chosen, newdef, "Def")
                    client.characters.set(chosen, newmdef, "Mdef")
                    client.characters.set(chosen, newspd, "Spd")
                    const newlvl = client.characters.get(chosen, "Level")
                        const Discord = require(`discord.js`)
                        const prefix = client.config.prefix
                        const lvling = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`**Congratulations!**`)
                        .setDescription(`Your ${charnme} has grown to level ${newlvl}!`)
                        .addField(`Stat bonus:`, `\`+${plus}\` to all stats.`)
                        .setThumbnail(charimg)

                        message.channel.send(lvling)
                }}
                client.profile.math(message.author.id, "+", 1, "kills")
                if(client.profile.has(message.author.id, "daily")){
                    let dailies = client.profile.get(message.author.id, "daily")
                    let kills = client.profile.get(message.author.id, "kills")
                    let killset = client.profile.get(message.author.id, "killset")
                    if(dailies.includes(1)){
                        if(kills - killset == 50){
                            client.profile.remove(message.author.id, 1, "daily")
                            const Discord = require(`discord.js`)
                            let accomplished = new Discord.RichEmbed()
                            .setColor(`#ffff00`)
                            .setTitle(`Daily Mission Accomplished!`)
                            .setDescription(`You have completed a daily mission and recieved the following rewards.`)
                            .setThumbnail(message.author.avatarURL)
                            .addField(`Rewards:`, `Shards: \`${client.missions.daily[1].shards}\` Gold: \`${client.missions.daily[1].gold}\` Glimmer: \`${client.missions.daily[1].glimmer}\``)
                            .setFooter(`This mission has been removed from your !missions.`)
                            .setTimestamp()
                            message.channel.send(accomplished)
                            client.profile.math(message.author.id, "+", client.missions.daily[1].shards, "shards")
                            client.profile.math(message.author.id, "+", client.missions.daily[1].gold, "gold")
                            client.profile.math(message.author.id, "+", client.missions.daily[1].glimmer, "glimmer")
                        }
                    }
                }
                if(client.profile.get(message.author.id, "questing") !== 0 && !client.battles.has(message.channel.id, "quest") && !client.battles.has(message.channel.id, "dungeon") && !client.battles.has(message.channel.id, "raid")){
                var questcheck = 0
                }
                else if(client.profile.get(message.author.id, "questing") !== 0){
                    client.characters.set(chosen, 100, "Health")
                }
                else if(client.profile.get(message.author.id, "questing") == 0){
                    client.characters.set(chosen, 100, "Health")
                }
                //Spire
                if(client.battles.has(message.channel.id, "spire")){
                    let floor = client.battles.get(message.channel.id, "spire") + 1
                    if(floor > client.profile.get(message.author.id, "record")){
                    client.profile.set(message.author.id, floor, "record")}
                    client.battles.set(message.channel.id, floor, "floor")
                    client.battles.set(message.channel.id, floor, "spire")
                    if(attack == 2){
                        client.battles.set(message.channel.id, 0, "Turn")
                    }
                    let spawned = client.quests.spire[floor].boss
                    const name = client.mobs.mobs[spawned].name
                    const health = client.mobs.mobs[spawned].hp
                    const atk = client.mobs.mobs[spawned].atk
                    const matk = client.mobs.mobs[spawned].matk
                    const def = client.mobs.mobs[spawned].def
                    const mdef = client.mobs.mobs[spawned].mdef
                    const desc = client.mobs.mobs[spawned].description
                    const img = client.mobs.mobs[spawned].image
                    let clas = client.mobs.mobs[spawned].class
                    let nme = client.classes.classes[clas].name
                    let ig = client.classes.classes[clas].img
                    client.battles.set(message.channel.id, spawned, "id")
                    client.battles.set(message.channel.id, health, "hp")
                    client.battles.set(message.channel.id, atk, "atk")
                    client.battles.set(message.channel.id, matk, "matk")
                    client.battles.set(message.channel.id, def, "def")
                    client.battles.set(message.channel.id, mdef, "mdef")
                    client.battles.set(message.channel.id, 0, "effect")
                    let Discord = require(`discord.js`)
                    let spire = new Discord.RichEmbed()
                    .setColor(`#000000`)
                    .setTitle(`Floor ${floor+1} has opened`)
                    .setAuthor(nme, ig)
                    .setDescription(desc)
                    .addField(`**Health**`, `\`\`\`${health}\`\`\``)
                    .setThumbnail(`https://i.imgur.com/RZDvGkI.png`)
                    .setImage(img)
                    .setFooter(`Defeat it to proceed to the next floor.`)
                    .setTimestamp()
                    return message.channel.send(spire)
                }
                
                //Quests
                if(client.battles.has(message.channel.id, "quest")){
                    let wave = client.battles.get(message.channel.id, "wave")
                    let waveshow = wave + 1
                    const quest = client.battles.get(message.channel.id, "quest")
                    client.battles.set(message.channel.id, waveshow, "wave")
                    if(client.battles.get(message.channel.id, "wave") < 3){
                        const Discord = require(`discord.js`)
                        const prefix = client.config.prefix
                        const cont = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setAuthor(message.author.username)
                        .setTitle(`Wave cleared!`)
                        .setDescription(`Continue to wave ${waveshow + 1}?`)
                        .setFooter(`Type ${prefix}continue to proceed!`)
                        client.battles.set(message.channel.id, 3, "inter")

                        return message.channel.send(cont)
                    }
                    //Event Quests
                    if(client.battles.get(message.channel.id, "wave") == 3){
                        if(client.battles.has(message.channel.id, "event")){
                            let Discord = require(`discord.js`)
                            let complete = new Discord.RichEmbed()
                            .setColor(`#0099ff`)
                            .setAuthor(message.author.username)
                            .setTitle(`Event Quest Cleared!`)
                            .setDescription(`You successfully cleared the quest ${client.quests.events[quest].name}!`)
                            .addField(`Rewards:`,`\`${client.quests.events[quest].rewards.gold}\` gold, \`${client.quests.events[quest].rewards.shards}\` shards, and \`${client.quests.events[quest].rewards.glimmer}\` glimmer, \`5\` Event Kills.`)
                            .setTimestamp()
                            message.channel.send(complete)
                            let gold = client.quests.events[quest].rewards.gold
                            let shards = client.quests.events[quest].rewards.shards
                            let glimmer = client.quests.events[quest].rewards.glimmer
                            let newquest = client.battles.get(message.channel.id, "quest") + 1
                            client.holiday.set(message.author.id, [newquest], "quests")
                            client.profile.math(message.author.id, "+", gold, "gold")
                            client.profile.math(message.author.id, "+", shards, "shards")
                            client.profile.math(message.author.id, "+", glimmer, "glimmer")
                            client.profile.set(message.author.id, 0, "questing")
                            if(newquest >= client.quests.events.length){
                                if(client.holiday.has(message.author.id, "ekills")){
                                    client.holiday.math(message.author.id, "+", 15, "ekills")
                                }
                                client.holiday.set(message.author.id, [0], "quests")
                                client.holiday.math(message.author.id, "+", 1, "clears")
                            }
                            return client.battles.delete(message.channel.id)
                        }
                        //Normal quest clear
                        if(quest == 89){
                            client.profile.push(message.author.id, 14, "items")
                            message.channel.send(`A flickering shard of Excalibur Morgan Falls, you pick it up as you run..`)
                        }
                        else if(quest == 99 && !client.towns.has(message.author.id)){
                            client.profile.push(message.author.id, 21, "items")
                            client.towns.set(message.author.id, {owner: message.author.id, lvl: 0, pray: 0, miko: 0, skins: 0, store: 0, wanderer: 0, mine: 0, minenext: 0, plants: [], hotel: [], display: [], petcare: [], petnext: 0, bank: 0, banknext: 0, loan: 0, rep: 0})
                            let Discord = require(`discord.js`)
                            let townu = new Discord.RichEmbed()
                            .setColor(`#0099ff`)
                            .setTitle(`Town Feature Unlocked!`)
                            .setDescription(`Your town allows for the unlocking of multiple features, including npc vendors!`)
                            .addField(`To view your town use the !town command`, `Use !help town to view all possible commands.`)
                            .setFooter(`Npc's are discoverable now in !explore.`)
                            .setTimestamp()
                            message.channel.send(townu)
                        }
                        const Discord = require(`discord.js`)
                        const prefix = client.config.prefix
                        const storydesc = client.quests.quests[quest].storyend
                        const complete = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setAuthor(message.author.username)
                        .setTitle(`Quest Cleared!`)
                        .setDescription(`You successfully cleared the quest ${client.quests.quests[quest].name}!`)
                        .addField(`Story:`, `${storydesc}`)
                        .addField(`Rewards:`, `\`${client.quests.quests[quest].rewards.gold}\` gold, \`${client.quests.quests[quest].rewards.shards}\` shards, and \`${client.quests.quests[quest].rewards.glimmer}\` glimmer!`)
                        .addField(`Your rank has increased by 1!`, `You are now rank \`${client.profile.get(message.author.id, "rank") + 1}\`.`)
                        .setTimestamp()
                        if(quest == 94){
                            complete.setFooter(`You notice a glimmering item sitting by a rock, use !take to obtain it.`)
                        }
                        message.channel.send(complete)
                        const gold = client.quests.quests[quest].rewards.gold
                        const shards = client.quests.quests[quest].rewards.shards
                        const glimmer = client.quests.quests[quest].rewards.glimmer
                        const newquest = client.battles.get(message.channel.id, "quest") + 1
                        client.profile.set(message.author.id, [newquest], "quests")
                        client.profile.math(message.author.id, "+", gold, "gold")
                        client.profile.math(message.author.id, "+", shards, "shards")
                        client.profile.math(message.author.id, "+", glimmer, "glimmer")
                        client.profile.math(message.author.id, "+", 1, "rank")
                        client.battles.set(message.channel.id, 0, "inter")
                        client.profile.set(message.author.id, 0, "questing")
                        if(quest == 94){
                            client.profile.set(message.author.id, 95, "questing")
                        }
                        return client.battles.delete(message.channel.id)
                    }}
                //Random mob victory
                client.profile.math(message.author.id, "+", gold, "gold")
                const Discord = require(`discord.js`)
                client.profile.set(message.author.id, 0, "questing")
                const prefix = client.config.prefix
                const end = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setAuthor(message.author.username)
                .setTitle(`Victory is yours!`)
                .setDescription(`Rewards:`)
                .addField(`Exp:`, `\`${exp}\``)
                .addField(`Gold:`, `\`${gold}\``)
                //Special rewards
                if(client.battles.get(message.channel.id,"id") == 3){
                    const shards = Math.floor((Math.random() * 5) + 1)
                    client.profile.math(message.author.id, "+", shards, "shards")
                    if(client.profile.has(message.author.id, "horns")){
                            let horns = Math.floor((Math.random() * 9) + 1)
                            client.profile.math(message.author.id, "+", horns, "horns")
                    end.addField(`Horn of the Demon's:`, `\`${horns}\``)
                }}
                else if(client.battles.get(message.channel.id, "id") == 16){
                    const chance = Math.floor((Math.random() * 100) + 1)
                    if(client.profile.has(message.author.id, "souls")){
                    const soouls = Math.floor((Math.random() * 9) + 1)
                    client.profile.math(message.author.id, "+", soouls, "souls")
                    end.addField(`Flame of soul's:`, `\`${soouls}\``)
                }}
                else if(client.battles.get(message.channel.id, "id") == 24){
                    if(client.profile.has(message.author.id, "lances")){
                    const lance = Math.floor((Math.random() * 9) + 1)
                        client.profile.math(message.author.id, "+", lance, "lances")
                    end.addField(`Lances of the Heavens`, `\`${lance}\``)
                }}
                else if(client.battles.get(message.channel.id, "id") == 25){
                    if(client.profile.has(message.author.id, "nightmares")){
                    const nightmares = Math.floor((Math.random() * 10) + 1);
                    client.profile.math(message.author.id, "+", nightmares, "nightmares")
                    end.addField(`Devil's nightmares:`, `\`${nightmares}\``)
                }}
                else if(client.battles.get(message.channel.id, "id") == 26){
                    if(client.profile.has(message.author.id, "tridents")){
                    const tridents = Math.floor((Math.random() * 9) + 1);
                            client.profile.math(message.author.id, "+", tridents, "tridents")
                            end.addField(`Poseidon's Tridents:`, `\`${tridents}\``)
                    }}
                else if(client.battles.get(message.channel.id, "id") == 34){
                    if(client.profile.has(message.author.id, "souldust")){
                    const dust = Math.floor((Math.random() * 9) + 1);
                            client.profile.math(message.author.id, "+", dust, "souldust")
                            end.addField(`Scorched Souldust:`, `\`${dust}\``)
                    }}
                else if(client.battles.get(message.channel.id, "id") == 41){
                    const wings = Math.floor((Math.random() * 10) + 1);
                    if(client.profile.has(message.author.id, "wings")){
                            client.profile.math(message.author.id, "+", wings, "wings")
                            end.addField(`Angel Wings:`, `\`${wings}\``)
                    }}
                else if(client.battles.get(message.channel.id, "id") == 47){
                    const dew = Math.floor((Math.random() * 9) + 1);
                    if(client.profile.has(message.author.id, "souldew")){
                            client.profile.math(message.author.id, "+", dew, "souldew")
                            end.addField(`Souldew:`, `\`${dew}\``)
                    }}
                else if(client.battles.get(message.channel.id, "id") == 59){
                    const diamonds = Math.floor((Math.random() * 9) + 1);
                    if(client.profile.has(message.author.id, "diamonds")){
                            client.profile.math(message.author.id, "+", diamonds, "diamonds")
                            end.addField(`Demonic Diamonds:`, `\`${diamonds}\``)
                    }}
                else if(client.battles.get(message.channel.id, "id") == 67 || client.battles.get(message.channel.id, "id") == 68){
                    let myitems = client.profile.get(message.author.id, "items")
                    client.profile.push(message.author.id, 6, "items", true)
                    end.addField(`Drop of Void:`, `\`1\``)
                }
                else if(client.battles.get(message.channel.id, "id") == 69 || client.battles.get(message.channel.id, "id") == 70){
                    let myitems = client.profile.get(message.author.id, "items")
                    client.profile.push(message.author.id, 6, "items", true)
                    client.profile.push(message.author.id, 6, "items", true)
                    end.addField(`Drop of Void:`, `\`2\``)
                }
                else if(client.battles.get(message.channel.id, "id") == 71 || client.battles.get(message.channel.id, "id") == 72){
                    let myitems = client.profile.get(message.author.id, "items")
                    client.profile.push(message.author.id, 6, "items", true)
                    client.profile.push(message.author.id, 6, "items", true)
                    client.profile.push(message.author.id, 6, "items", true)
                    end.addField(`Drop of Void:`, `\`3\``)
                }
                else if(client.battles.get(message.channel.id, "id") == 53 || client.battles.get(message.channel.id, "id") == 54 || client.battles.get(message.channel.id, "id") == 56){
                    let shards = Math.floor((Math.random() * 2) + 1)
                    client.profile.math(message.author.id, "+", shards, "shards")
                    client.profile.math(message.author.id, "+", 1000, "gold")
                    end.addField(`Shards:`, `\`${shards}\``)
                    end.addField(`Gold:`, `\`1000\``)
                }
                else if(client.battles.get(message.channel.id, "id") == 82){
                    let gifts = Math.floor(Math.random() * 20)
                    if(client.holiday.has(message.author.id)){
                        client.holiday.math(message.author.id, "+", gifts, "gifts")
                        end.addField(`Gifts:`, `\`${gifts}\``)
                    }}
                else if(client.battles.get(message.channel.id, "id") == 99){
                    let exp = Math.floor((Math.random() * 250) + 1)
                    client.characters.math(chosen, "+", exp,"Exp")
                    end.addField(`Bonus Exp:`, `\`${exp}\``)
                }
                else if(client.battles.get(message.channel.id, "id") == 100){
                    let gold = Math.floor((Math.random() * 2500) + 1)
                    client.profile.math(message.author.id, "+", gold, "gold")
                    end.addField(`Bonus Gold:`, `\`${gold}\``)
                }
                else if(client.battles.get(message.channel.id, "id") == 43 || client.battles.get(message.channel.id, "id") == 44){
                    let shards = Math.floor((Math.random() * 3) + 1)
                    client.profile.math(message.author.id, "+", shards, "shards")
                    end.addField(`Bonus Shards:`, `\`${shards}\``)
                }
                else if(client.battles.get(message.channel.id, "id") == 101){
                    let chocolates = Math.floor((Math.random() * 19) + 1)
                    if(client.holiday.has(message.author.id) && client.holiday.has(message.author.id, "chocolates")){
                        client.holiday.math(message.author.id, "+", chocolates, "chocolates")
                        end.addField(`Chocolates:`, `\`${chocolates}\``)
                    }
                }
                if(client.battles.get(message.channel.id, "id") == 136 || client.battles.get(message.channel.id, "id") == 137){
                    if(client.holiday.has(message.author.id)){
                        if(!client.holiday.has(message.author.id, "ekills")){
                            client.holiday.set(message.author.id, 0, "ekills")
                        }
                        client.holiday.math(message.author.id, "+", 1, "ekills")
                    }
                }
                if(client.battles.get(message.channel.id, "id") == 138 || client.battles.get(message.channel.id, "id") == 139 || client.battles.get(message.channel.id, "id") == 140 || client.battles.get(message.channel.id, "id") == 127){
                    client.profile.push(message.author.id, 18, "items")
                    if(client.holiday.has(message.author.id)){
                    if(!client.holiday.has(message.author.id, "ekills")){
                        client.holiday.set(message.author.id, 0, "ekills")
                    }
                    client.holiday.math(message.author.id, "+", 1, "ekills")
                }}
                let wanted = client.profile.get(`617362855775305728`, "wanted")
                if(wanted.includes(client.battles.get(message.channel.id, "id"))){
                    //Rewards for wanted enemy
                let rng = Math.round(Math.random() * 3)
                let srng = Math.round((Math.random() * 5) + 1)
                client.profile.math(message.author.id, "+", rng, "diamonds")
                client.profile.math(message.author.id, "+", rng, "horns")
                client.profile.math(message.author.id, "+", rng, "lances")
                client.profile.math(message.author.id, "+", rng, "souldew")
                client.profile.math(message.author.id, "+", rng, "nightmares")
                client.profile.math(message.author.id, "+", rng, "tridents")
                client.profile.math(message.author.id, "+", rng, "souldust")
                client.profile.math(message.author.id, "+", rng, "wings")
                client.profile.math(message.author.id, "+", rng, "souls")
                client.profile.math(message.author.id, "+", srng, "shards")
                end.addField(`**Wanted Enemy defeated**!`, `Bonus rewards applied: \n \`${rng}\` Materials. \n \`${srng}\` Shards.`)
                if(client.profile.has(message.author.id, "daily")){
                    let dailies = client.profile.get(message.author.id, "daily")
                    if(dailies.includes(3)){
                            let Discord = require(`discord.js`)
                            let accomplished = new Discord.RichEmbed()
                            .setColor(`#ffff00`)
                            .setTitle(`Daily Mission Accomplished!`)
                            .setDescription(`You have completed a daily mission and recieved the following rewards.`)
                            .addField(`Rewards:`, `Shards: \`${client.missions.daily[3].shards}\` \nGold: \`${client.missions.daily[3].gold}\` \nGlimmer: \`${client.missions.daily[3].glimmer}\``)
                            .setFooter(`This mission has been removed from your !missions`)
                            .setTimestamp()
                            .setThumbnail(message.author.avatarURL)
                            message.channel.send(accomplished)

                    }
                }}
                client.battles.delete(message.channel.id)
                return message.channel.send(end)
            }
            const agro = client.mobs.mobs[spawned].agro
            var rando = Math.floor((Math.random() * agro) + 1);
            if(rando !== 1){
        let checkhp = client.characters.get(chosen, "Health")
        var hpshow = checkhp + 0
        if(checkhp < 0){
            var hpshow = 0
        }
        const Discord = require(`discord.js`)
        const prefix = client.config.prefix
        const spawn = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setAuthor(message.author.username)
        .setTitle(`**Your ${charnme} attacked with ${abname}!**`)
        .setDescription(`Damage dealt: \`${dmg}\` | ${multi}`)
        spawn.setThumbnail(charimg)
        spawn.setImage(img)
        if(abhits > 1){
        spawn.addField(`${title}`, `${multi}`)
        spawn.setDescription(`Total Damage dealt: ${dmg}`)
        }
        if(args[0] == 3){
            let atkc = 2
            spawn.setImage(client.units.units[charid].abilities[atkc].img)
            spawn.setThumbnail(img)
            client.battles.set(message.channel.id, 0, "Turn") 
        }
        let turnat = client.battles.get(message.channel.id, "Turn")
        if(turnat + 1 < abcd){
            if(args[0] == 3){
                if(abcd == 1){
                    spawn.addField(`▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
                    } 
                if(abcd == 2){
                spawn.addField(`▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
                } 
                if(abcd == 3){
                spawn.addField(`▱▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
            }
                if(abcd == 4){
                spawn.addField(`▱▱▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
            }}
            else if(parseInt(args[0]) !== 3){
            if(turnat + 1 == 1){
                spawn.addField(`▰`, `Character Health: \`\`\`${hpshow}\`\`\``)
            }
            if(turnat + 1 == 2){
                spawn.addField(`▰▰`, `Character Health: \`\`\`${hpshow}\`\`\``)
            }
            if(turnat + 1 == 3){
                spawn.addField(`▰▰▰`, `Character Health: \`\`\`${hpshow}\`\`\``)
            }}}
        if(turnat + 1 >= abcd){
            if(abcd == 1){
                spawn.addField(`▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
            }
            if(abcd == 2){
                spawn.addField(`▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
            }
            if(abcd == 3){
            spawn.addField(`▰▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hpshow}\`\`\``)}
            if(abcd == 4){
            spawn.addField(`▰▰▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hpshow}\`\`\``)}
        }
        var cast = 0
                    if(client.battles.has(message.channel.id, "spire")){
                        let id = client.battles.get(message.channel.id, "id")
                        if(id == 143 || id == 66 || id == 90){
                            if(id == 143){
                            var effect = client.battles.get(message.channel.id, "effect") - 1}
                            else if(id == 66){
                                var effect = client.battles.get(message.channel.id, "effect")
                            }
                            else if(id == 90){
                                var effect = client.battles.get(message.channel.id, "effect") + 1
                            }
                            if(effect < 0 && client.battles.get(message.channel.id, "duration") == 0){
                                    var cast = 1
                                    client.battles.set(message.channel.id, effect+1, "effect")
                                    let duration = client.active.aura[effect+1].duration
                                    client.battles.set(message.channel.id, duration, "duration")
                                    spawn.addField(`**The ${name} has channeled the power of the spire and cast:**`, `\`${client.active.aura[effect+1].name}\``)
                                    spawn.addField(`Effect cast:`, `${client.active.aura[effect+1].description} | Duration: ${client.active.aura[effect+1].duration}`)
                                    spawn.setFooter(`To keep fighting use the ${prefix}attack command!`)
                                    let imga = client.active.aura[effect+1].img
                                    if(attack == 2){
                                        spawn.setThumbnail(imga)
                                    }
                                    else{
                                        spawn.setImage(imga)
                                    }
                            }
                        }
                    }
        if(cast == 0){
        spawn.addField(`**Wild ${name}**`, `Enemy Health: \`\`\`${newhealth}\`\`\`` )
        spawn.setFooter(`To fight it use the ${prefix}attack command!`)
        if(client.battles.has(message.channel.id, "spire")){
            let duration = client.battles.get(message.channel.id, "duration")
            if(duration !== 0){
                spawn.setFooter(`To fight it use the ${prefix}attack command! | Aura duration: ${duration} turns.`)
            }
        }}
        message.channel.send(spawn)}
        //Enemy Attack
                else if(rando == 1){
                    var norm = ' '
                    const chosen = client.profile.get(message.author.id, "chosen")
                    const charlvl = client.characters.get(chosen, "Level")
                    const atk = client.mobs.mobs[spawned].atk
                    const matk = client.mobs.mobs[spawned].matk
                    const mdmg = client.mobs.mobs[spawned].dmg
                    const charmdef = client.characters.get(chosen, "Mdef")
                    const enmacheck = Math.floor((Math.random() * 2) + 1)
                    if(enmacheck == 2){
                    var reduce = Math.floor(Math.random() * 3)
                    var enmatk = Math.floor(((mdmg + (matk / 10)) - (charmdef / 20)) - reduce)
                    }
                    if(enmacheck == 1){
                    var reduce = Math.floor(Math.random() * 5)
                    var enmatk = Math.floor(((mdmg + (atk / 10)) - (chardef / 20)) - reduce)
                    }
                    var critchecke = Math.round(Math.random() * 30)
                    if(critchecke < Math.round(10/agro)){
                        var enmatk = Math.round(enmatk * 1.25)
                        var norm = `${client.emojis.get(`685621437591060492`)} | +25% more damage!`
                    }
                    if(critchecke > 10 && critchecke <= 15){
                        if(norm == 0){
                            var enmatk = Math.round(enmatk * 0.4)
                            var norm = `${client.emojis.get(`685621521644781576`)} | -60% damage!`
                        }
                    }
                    if(enmatk < 0){
                        var enmatk = 3
                    }
                    let bonus = (client.profile.get(message.author.id, "ng") * 5)
                    if(client.battles.has(message.channel.id, "quest")){
                        var enmatk = enmatk + bonus
                    }
                    const newcharhp = charhp - enmatk
                    client.characters.set(chosen, newcharhp, "Health")
                    const hpcheck = client.characters.get(chosen, "Health")
                    var hpshow = hpcheck + 0
                    if(hpcheck < 0){
                        var hpshow = 0
                    }
                    let atki = client.mobs.mobs[spawned].atkimg
                    const Discord = require(`discord.js`)
                    const prefix = client.config.prefix
                    const attack = new Discord.RichEmbed()
                    .setColor(`#0099ff`)
                    .setAuthor(message.author.username)
                    .setTitle(`**Your ${charnme} attacked with ${abname}!**`)
                    .setDescription(`Damage dealt: \`${dmg}\` | ${multi}`)
                    .setThumbnail(charimg)
                    .setImage(atki)
                    if(abhits > 1){
                    attack.addField(`${title}`, `${multi}`)
                    attack.setDescription(`Total Damage dealt: ${dmg}`)
                    }
                    if(args[0] == 3){
                        let atkc = 2
                        attack.setImage(client.units.units[charid].abilities[atkc].img)
                        attack.setThumbnail(client.mobs.mobs[spawned].atkimg)
                        client.battles.set(message.channel.id, 0, "Turn")
                    }
                    let turnat = client.battles.get(message.channel.id, "Turn")
                    if(turnat + 1 < abcd){
                        if(args[0] == 3){
                            if(abcd == 1){
                                attack.addField(`▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
                            } 
                            if(abcd == 2){
                                attack.addField(`▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
                            } 
                            if(abcd == 3){
                            attack.addField(`▱▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
                        }
                        if(abcd == 4){
                            attack.addField(`▱▱▱▱ **Ultimate attack used!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
                        }}
                        if(parseInt(args[0]) !== 3){
                        if(turnat + 1 == 1){
                            attack.addField(`▰`, `Character Health: \`\`\`${hpshow}\`\`\``)
                        }
                        if(turnat + 1 == 2){
                            attack.addField(`▰▰`, `Character Health: \`\`\`${hpshow}\`\`\``)
                        }
                        if(turnat + 1 == 3){
                            attack.addField(`▰▰▰`, `Character Health: \`\`\`${hpshow}\`\`\``)
                        }}}
                    if(turnat + 1 >= abcd){
                        if(abcd == 1){
                            attack.addField(`▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
                        }
                        if(abcd == 2){
                            attack.addField(`▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hpshow}\`\`\``)
                        }
                        if(abcd == 3){
                        attack.addField(`▰▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hpshow}\`\`\``)}
                        if(abcd == 4){
                        attack.addField(`▰▰▰▰ **Ultimate Attack Ready!**`, `Character Health: \`\`\`${hpshow}\`\`\``)}
                    }
                    attack.addField(`**The ${name} has attacked!!**`, `Enemy Health: \`\`\`${newhealth}\`\`\``)
                    attack.addField(`Damage dealt:`, `${enmatk} hp! ${norm}`)
                    attack.setFooter(`To keep fighting use the ${prefix}attack command!`)
                    if(client.battles.has(message.channel.id, "spire")){
                        let duration = client.battles.get(message.channel.id, "duration")
                        if(duration !== 0){
                            attack.setFooter(`To fight it use the ${prefix}attack command! | Aura duration: ${duration} turns.`)
                        }
                    }
                    message.channel.send(attack)

                    if(hpcheck == 0 || hpcheck < 0){
                        const itemcheck = client.profile.get(message.author.id, "items")
                        //Revive pearl
                        if(itemcheck.includes(2)){
                            client.characters.set(chosen, 60, "Health")
                            const Discord = require(`discord.js`)
                            const revive = new Discord.RichEmbed()
                            .setColor(`#0099ff`)
                            .setAuthor(message.author.username)
                            .setTitle(`**Revive Pearl consumed**`)
                            .setImage(`https://i.imgur.com/bBjcwrh.gif`)
                            message.channel.send(revive)
                            message.channel.send(`Your character is now back to 60% health!`)
                            client.battles.set(message.channel.id, 0, "Turn")
                            return client.profile.remove(message.author.id, 2, "items")
                        }
                        //Dies
                        if(!client.battles.has(message.channel.id, "spire")){
                        client.battles.set(message.channel.id, oghealth, "hp")}
                        client.battles.set(message.channel.id, 0, "Turn")
                        if(client.battles.has(message.channel.id, "quest")){
                            client.battles.set(message.channel.id, 1, "inter")
                        }
                        else if(client.battles.has(message.channel.id, "spire")){
                            client.battles.push(message.channel.id, chosen, "dead")
                            let dead = client.battles.get(message.channel.id, "dead")
                            if(dead.length == 3){
                                let rewards = Math.round((client.battles.get(message.channel.id, "floor")/5) * 50)
                                let Discord = require(`discord.js`)
                                let spireend = new Discord.RichEmbed()
                                .setColor(`#000000`)
                                .setTitle(`**Your Team has Perished**`)
                                .setDescription(`The Spire begins to sink around you, crashing to the earth and leaving nothing but an empty field around you.`)
                                .addField(`Score:`, `\`\`\`${client.battles.get(message.channel.id, "floor")}\`\`\``)
                                .addField(`Record:`, `\`\`\`${client.profile.get(message.author.id, "record")}\`\`\``)
                                .addField(`Your rank:`, `TBD`)
                                .addField(`Completion Rewards:`, `\`${rewards}\` shards`)
                                .setImage(`https://i.imgur.com/92FRSQQ.gif`)
                                .setThumbnail(`https://i.imgur.com/o13ue7I.png`)
                                .setFooter(`Your team has been returned to full health`)
                                message.channel.send(spireend)
                                let team = client.battles.get(message.channel.id, "team")
                                for(i=0;i<team.length;i++){
                                    let char = team[i]
                                    client.characters.set(char, 100, "Health")
                                }
                                client.battles.delete(message.channel.id)
                                client.profile.set(message.author.id, 0, "questing")
                                return;
                            }
                        }
                        const Discord = require(`discord.js`)
                        const death = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setAuthor(message.author.username)
                        .setTitle(`**Death has claimed you**`)
                        .setImage(`https://i.imgur.com/aIRkFhN.gif`)
                         message.channel.send(death)
                         return client.characters.set(chosen, 100, "Health")
                    }}
        let turncheck = client.battles.get(message.channel.id, "Turn")
        const newturn = turncheck + 1
       
        client.battles.set(message.channel.id, newturn, "Turn")
        if(client.battles.has(message.channel.id, "spire")){
            if(client.battles.get(message.channel.id, "duration") !== 0){
                client.battles.math(message.channel.id, "-", 1, "duration")
                if(client.battles.get(message.channel.id, "effect") == 0){
                    client.battles.math(message.channel.id, "-", 1, "Turn")
                }
                if(client.battles.get(message.channel.id, "duration") == 0){
                    if(client.battles.get(message.channel.id, "effect") == 2){
                        let chose = client.profile.get(message.author.id, "chosen")
                        client.characters.set(chose, 0, "Health")
                        client.battles.push(message.channel.id, chose, "dead")
                        let Discord = require(`discord.js`)
                        let auradeath = new Discord.RichEmbed()
                        .setColor(`#9400D3`)
                        .setTitle(`The Aura of Death has claimed your character!`)
                        .setThumbnail(client.active.aura[2].img)
                        .setImage(`https://i.imgur.com/aIRkFhN.gif`)
                        .setFooter(`A new character must be chosen.`)
                        message.channel.send(auradeath)
                    }
                    client.battles.set(message.channel.id, 0, "effect")
                }
            }
        }
        
        if(args[0] == 3){
            client.battles.set(message.channel.id, 0, "Turn")
        }
        if(client.battles.has(message.channel.id, "quest")){
            client.battles.set(message.channel.id, 1, "inter")
        }
        const Discord = require(`discord.js`)
        //Pet
        if(client.profile.has(message.author.id, "chosenp")){
            if(client.profile.get(message.author.id, "chosenp") !== 0){
            let petsd = client.profile.get(message.author.id, "chosenp")
            let tempcheck = client.pets.get(petsd, "lib")
            let psd = client.pet.pets[tempcheck].spd
        if(chance < psd){
        let pname = client.pets.get(petsd, "name")
        let pid = client.pets.get(petsd, "lib")
        let pettack = client.pet.pets[pid].attack
        let pimg = client.pets.get(petsd, "atkimage")
                    let petak = new Discord.RichEmbed()
                    .setColor(`#0099ff`)
                    .setTitle(`Your ${pname} has attacked with ${pettack}`)
                    .setDescription(`Dmg Dealt: ${phit}`)
                    .setThumbnail(pimg)
                    .setFooter(`${pname} has gained 1 experience!`)
                    message.channel.send(petak)
    }}}
    }}}