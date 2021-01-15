exports.run = (client, message, channel) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.holiday.has(message.author.id)){
        return message.channel.send(`You have not gathered any kills!`)
    }
    if(!client.holiday.has(message.author.id, "ekills")){
        return message.channel.send(`You have not gathered any kills!`)
    }
    let check = client.holiday.get(message.author.id, "ekills")
    if(check < 1000){
        return message.channel.send(`You do not have the required kills to claim this reward! To see your kills please use !event`)
    }
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
    var spawned = 62
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
    client.holiday.math(message.author.id, "-", 1000, "ekills")
    const level = client.characters.get(newspawnn, "Level")

    let Discord = require(`discord.js`)
    const event = new Discord.RichEmbed()
    .setColor(col)
    .setTitle(`**Congratulations!** You have claimed ${spawnedname}!!`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`You have used 1000 kills!`)
    .addField(`**Spawned character:**`, `${spawnedname} Lvl \`${level}\`- \`${total}\` Total.`)
    .addField(`|${emote}| ${name} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
    .setImage(spawnedimage)
    .setTimestamp()
    .setFooter(`Spawned by ${message.author.username}! To check your characters now use the !characters command`)

return message.channel.send(event);

    
}