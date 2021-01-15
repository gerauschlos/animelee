exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "spawned")){
        return message.channel.send(`You have not preformed enough event spawns!`)
    }
    let check = client.profile.get(message.author.id, "spawned")
    if(check < 10){
        return message.channel.send(`You need 10 spawns to claim a character!`)
    }
    if(client.profile.get(message.author.id, "characters").length == 50){
        return message.channel.send(`You have reached the character limit!`)
    }
    let up = client.active.active[0].spawns
    let pool = client.spawns.spawns[up].pool
    if(args.length == 0){
        return message.channel.send(`Include the character you would like to spawn!`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid character!`)
    }
    let spawned = parseInt(args[0])
    if(!pool.includes(spawned)){
        return message.channel.send(`This is not a valid character, if you need to check the spawnlist of a spawn use !spawninfo e.`)
    }
    let chance = Math.round(Math.random() * 100)
    if(chance < 30){
        var rng = 2
    }
    if(chance > 30 && chance < 100){
        var rng = 3
    }
    if(chance == 30){
        var rng = 0
    }
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
    client.profile.math(message.author.id, "-", 10, "spawned")
    let Discord = require(`discord.js`)
    const event = new Discord.RichEmbed()
    .setColor(col)
    .setTitle(`**Congratulations!** You have claimed ${spawnedname}!!`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`You have reset \`10\` Spawn streak!`)
    .setThumbnail(client.spawns.spawns[up].image)
    .addField(`**Spawned character:**`, `${spawnedname} Lvl \`${level}\`- \`${total}\` Total.`)
    .addField(`|${emote}| ${name} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
    .setImage(spawnedimage)
    .setTimestamp()
    .setFooter(`Spawned by ${message.author.username}! To check your characters now use the !characters command`)

return message.channel.send(event);
    
}