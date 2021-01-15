exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.holiday.has(message.author.id)){
        return message.channel.send(`Please check !event for information before using the el command!`)
    }
    if(client.active.active[0].event == 0){
        return message.channel.send(`There is no active event at this time.`)
    }
    if(args.length !== 0){
        let arg = parseInt(args[0])
        if(isNaN(arg)){
            return message.channel.send(`This is not a valid reward.`)
        }
        else if(arg <= 0 || arg > 10){
            return message.channel.send(`This is not a valid reward.`)
        }
        else if(arg > client.holiday.get(message.author.id, "clears")){
            return message.channel.send(`You cannot claim this reward yet!`)
        }
        else if(args <= client.holiday.get(message.author.id, "claimed")){
            return message.channel.send(`You have already claimed this reward!`)
        }
        let reward = client.active.ladder[arg].reward
        client.holiday.math(message.author.id, "+", reward, "ekills")
        client.holiday.set(message.author.id, arg, "claimed")
         message.channel.send(`You have claimed ${reward} kills!`)
        if(arg == 5){
            client.profile.math(message.author.id, "+", 15, "shards")
            message.channel.send(`15 Bonus Shards claimed!`)
        }
        if(arg == 7){
            client.profile.push(message.author.id, 9, "items")
            message.channel.send(`Bonus dungeon key claimed!`)
        }

        if(arg == 10){
            var chance = Math.round(Math.random() * 100)
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

            const newspawnn = client.characters.autonum
            var spawned = 63
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
            client.holiday.set(message.author.id, 0, "claimed")
            client.holiday.set(message.author.id, 0, "clears")
            const level = client.characters.get(newspawnn, "Level")
            let Discord = require(`discord.js`)
            const event = new Discord.RichEmbed()
            .setColor(col)
            .setTitle(`**Congratulations!** You have claimed ${spawnedname}!!`)
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(`You have completed the ladder!`)
            .addField(`**Spawned character:**`, `${spawnedname} Lvl \`${level}\`- \`${total}\` Total.`)
            .addField(`|${emote}| ${name} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
            .setImage(spawnedimage)
            .setTimestamp()
            .setFooter(`Spawned by ${message.author.username}! To check your characters now use the !characters command`)
        
        return message.channel.send(event);
        }
    }
    let array = ['🗹']
    let claimed = client.holiday.get(message.author.id, "claimed")
    for(i = 0; i < 11; i++){
        let on = i
        if(on < claimed){
            array.push('🗹')
        }
        else if(on > claimed){
            array.push('☒')
        }  
    }
    let Discord = require(`discord.js`)
    let ladder = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setThumbnail(`https://i.imgur.com/Nc0clne.png`)
    .setTitle(`Seraph of the End Invasion!`)
    .setDescription(`Complete all 3 event quests multiple times to achieve a clear! You have \`${client.holiday.get(message.author.id, "clears")}\` clears, and are on reward \`${client.holiday.get(message.author.id, "claimed") + 1}\`!`)
    .addField(`0. Started.`, `1. ${client.active.ladder[1].reward} Kills! ${array[1]}\n 2. ${client.active.ladder[2].reward} Kills! ${array[2]} \n 3. ${client.active.ladder[3].reward} Kills! ${array[3]} \n 4. ${client.active.ladder[4].reward} Kills! ${array[4]} \n 5. ${client.active.ladder[5].reward} Kills! ${array[5]}`)
    ladder.addField(`*10 extra shards! Claimed with !el 5*`, `6. ${client.active.ladder[6].reward} Kills! ${array[6]} \n 7. ${client.active.ladder[7].reward} Kills! ${array[7]}`)
    ladder.addField(`*1 extra dungeon key! Claimed with !el 7*`, `8. ${client.active.ladder[8].reward} Kills! ${array[8]} \n 9. ${client.active.ladder[9].reward} Kills! ${array[9]} \n 10. ${client.active.ladder[10].reward} Kills! ${array[10]}`)
    if(claimed < 10){ ladder.addField(`🎊LADDER END🎊`, `**Mikaela Hyakuya**`)}
    ladder.setFooter(`To view event details please use !event.`)
   return message.channel.send(ladder)

}