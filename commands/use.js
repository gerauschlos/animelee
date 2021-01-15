exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
        var amount = 1
    if(args.length == 0){
        return message.channel.send(`Please include the item you are using!`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid item!`)
    }
    let checking = args[0];
    let items = client.profile.get(message.author.id, "items")
    items.sort((a, b) => a-b)
    let setitems = new Set(items)
    let myitems = Array.from(setitems)
    if (0 < checking && checking <= myitems.length){
        let itemkey = myitems[checking - 1]
        let check = client.items.items[itemkey].type 
        
        if(check !== "Consumable"){
            return message.channel.send(`This is not a consumable item!`)
        }

        if(itemkey == 4){
            const chosen = client.profile.get(message.author.id, "chosen")
            const charlvl = client.characters.get(chosen, "Level")
            const exp = client.characters.get(chosen, "Exp")
            let gained = Math.floor(100 * amount)
            let newexp = exp + gained
            client.characters.set(chosen, newexp, "Exp")
            message.channel.send(`You have used a shard renmant, and recieved +100 character exp.`)
            client.profile.remove(message.author.id, 4, "items")
            let tonext = client.levels.levels[charlvl].next

            if(newexp > tonext || newexp == tonext){
                if(charlvl == client.levels.levels.length - 1){
                    return message.channel.send(`Your character is max level!`)
                }
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
                const charnme = client.characters.get(chosen, "Name")
                const charhp = client.characters.get(chosen, "Health")
                const charatk = client.characters.get(chosen, "Atk")
                const charmatk = client.characters.get(chosen, "Matk")
                const chardef = client.characters.get(chosen, "Def")
                const charmdef = client.characters.get(chosen, "Mdef")
                const charspd = client.characters.get(chosen, "Spd")
                const charimg = client.characters.get(chosen, "Image")
                const charid = client.characters.get(chosen, "Lib")

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

                   return message.channel.send(lvling)
            }
        }
        if(itemkey == 5){
            let characters = client.profile.get(message.author.id, "characters")
            for (i = 0; i < characters.length; i++) {
                const character = characters[i]
                let hp = client.characters.get(character, "Health")
                var newhp = hp + 30
                client.characters.set(character, newhp, "Health")
                if(newhp > 100){
                    client.characters.set(character, 100, "Health")
                }
            }
            client.profile.remove(message.author.id, 5, "items")
            let Discord = require(`discord.js`)
            let replenish = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`You have used an HP replenish postion!`)
            .setDescription(`All your characters have gained 30 HP!`)
            .setThumbnail('https://i.imgur.com/ouP1inK.gif')
            .setFooter(`To check your inventory use !inv.`)
            return message.channel.send(replenish)
        }
        if(itemkey == 3){
            const chosen = client.profile.get(message.author.id, "chosen")
            const hp = client.characters.get(chosen, "Health")
            if(hp == 100){
                return message.channel.send(`Your character is already at max health.`)
            }
            if(!client.profile.has(message.author.id)){
                return message.channel.send(`You have not started Animelee!`)
            }
            const inventory = client.profile.get(message.author.id, "items")
            if(!inventory.includes(3)){
                return message.channel.send(`You do not have any health items!`)
            }
            if(!client.profile.has(message.author.id, "chosen")){
                return message.channel.send(`Please choose the character you would like healed!`)
            }
            const Discord = require(`discord.js`)
            const heal = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('You have used a healing potion!')
            .setDescription(`Your character has regained 40 health. To check character health use \`!info\``)
            .setThumbnail(`https://i.imgur.com/MjQZy63.gif`)
            message.channel.send(heal)
            client.profile.remove(message.author.id, 3, "items")
            let newhp = hp + 40
            client.characters.set(chosen, newhp, "Health")
            if(newhp > 100){
                client.characters.set(chosen, 100, "Health")
            }
            return;
        }
        if(itemkey == 7 || itemkey == 8 || itemkey == 9 || itemkey == 10 ||itemkey == 14 || itemkey == 18){
            if(!client.battles.has(message.channel.id)){
                return message.channel.send(`There is no dungeon here!`)
            }
            if(!client.battles.has(message.channel.id, "dungeon")){
                return message.channel.send(`There is no dungeon here!`)
            }
            if(itemkey == 7){
                var dun = 0
            }
            if(itemkey == 8){
                var dun = 1
            }
            if(itemkey == 9){
                var dun = 2
            }
            if(itemkey == 10){
                var dun = 3
            }
            if(itemkey == 14){
                var dun = 4
            }
            if(itemkey == 18){
                var dun = 5
            }
            if(dun !== client.battles.get(message.channel.id, "dungeon")){
                return message.channel.send(`This is the wrong key!`)
            }
            if(!client.profile.has(message.author.id, "team")){
                return message.channel.send(`You cannot enter the dungeon without a team!`)
            }
            let team = client.profile.get(message.author.id, "team")
            if(!team.includes(client.profile.get(message.author.id, "chosen"))){
                return message.channel.send(`Your chosen characrer is not on your team!`)
            }
            if(team.includes(0)){
                return message.channel.send(`One of your team slots is not occupied!`)
            }
            let nme = client.locs.dungeons[dun].name
            let spawned = client.locs.dungeons[dun].waves[2].enemy
            let s1 = client.locs.dungeons[dun].waves[2].support1
            let s2 = client.locs.dungeons[dun].waves[2].support2
            let s1hp = client.mobs.mobs[s1].hp
            let s2hp = client.mobs.mobs[s2].hp
            const name = client.mobs.mobs[spawned].name
            const health = client.mobs.mobs[spawned].hp
            const atk = client.mobs.mobs[spawned].atk
            const matk = client.mobs.mobs[spawned].matk
            const def = client.mobs.mobs[spawned].def
            const mdef = client.mobs.mobs[spawned].mdef
            const spd = client.mobs.mobs[spawned].spd
            const desc = client.mobs.mobs[spawned].description
            const img = client.mobs.mobs[spawned].image
            let bar = 20
            let barl = []
            for(i = 0; i <= bar; i++){
                barl.push('▇')
            }
            let barshow = barl.join("")
            client.battles.set(message.channel.id, {spawned: spawned, hp: health, atk: atk, matk: matk, def: def, mdef: mdef, spd: spd, id: spawned, Turn: 0, dungeon: dun, wave: 0, active: team, dead: [], team: team, part: message.author.id, inter: 1, up: [{spawned: s1, hp: s1hp, place: 1}, {spawned: s2, hp: s2hp, place: 2}], stage: 0})
            client.battles.set(message.author.id, message.channel.id, "dungeon")
            client.profile.set(message.author.id, message.channel.id, "questing")
            if(itemkey !== 14){
                client.profile.remove(message.author.id, itemkey, "items")
            }
            let Discord = require(`discord.js`)
            let dundun = new Discord.RichEmbed()
            .setColor(`#fc0026`)
            .setTitle(`The Dungeon has Accepted Your Key!`)
            .setDescription(`The great dungeon gates envelop you without a chance to enter, and you find yourself face to face...`)
            .addField(`*From the Boss' sides rise companions!*`, `**${client.mobs.mobs[s1].name}** \n\`${client.mobs.mobs[s1].hp}\``)
            .addField(`The Lord of the ${nme}`, `**${name}** \`\`\`${barshow}\`\`\``)
            .setImage(img)
            .setThumbnail(client.mobs.mobs[s1].image)
            .setFooter(`Use !attack to continue!`)
            return message.channel.send(dundun)
        }
        if(itemkey == 15){
            let pets = client.profile.get(message.author.id, "pets")
            if(pets.length == 10){
                return message.channel.send(`You have too many pets!`)
            }
            client.profile.remove(message.author.id, 15, "items")
            let pet = 21
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
            let Discord = require(`discord.js`)
            let axo = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`Your egg has hatched!`)
            .setDescription(`As you hold the egg up to inspect it, something burts from the top!`)
            .addField(`New pet Aquired!`, `Use !pets to view your pets.`)
            .setImage(`https://i.imgur.com/DlG53OJ.gif`)
            .setFooter(`Pet limit: 10`)
            message.channel.send(axo)
        }
        if(itemkey == 16){
            if(!client.battles.has(message.channel.id)){
                return message.channel.send(`This item is not usable here.`)
            }
            if(!client.battles.has(message.channel.id, "id")){
                return message.channel.send(`This item is not usable here.`)
            }
            let spawned = client.battles.get(message.channel.id, "id")
            if(spawned == 112){
                client.battles.set(message.channel.id, 116, "id")
                client.profile.remove(message.author.id, 16, "items")
            }
            message.channel.send(`The cradle shatters and the phantom weakens.`)
        }
}
}