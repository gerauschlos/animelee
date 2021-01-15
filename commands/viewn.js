exports.run = (client, message, args) => {
    if(args.length == 0){
        return message.channel.send(`Please include the enemy you would like to see!`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid Enemy!`)
    }
    let check = args[0]
    if(check <= 0){
        return message.channel.send(`This is not a valid Enemy!`)
    }
    if(check > client.mobs.mobs.length){
        return message.channel.send(`This is not a valid Enemy!`)
    }
    let mob = client.mobs.mobs[check-1]
    let name = mob.name
    let atk = mob.atk
    let atkred = atk/10
    let atkbar = []
    for(i=0;i<atkred;i++){
        atkbar.push("▉")
    }
    let atkshow = atkbar.join("")
    let matk = mob.matk
    let matkred = matk/10
    let matkbar = []
    for(i=0;i<matkred;i++){
        matkbar.push("▉")
    }
    let matkshow = matkbar.join("")
    let def = mob.def
    let defred = def/10
    let defbar = []
    for(i=0;i<defred;i++){
        defbar.push("▉")
    }
    let defshow = defbar.join("")
    let mdef = mob.mdef
    let mdefred = mdef/10
    let mdefbar = []
    for(i=0;i<mdefred;i++){
        mdefbar.push("▉")
    }
    let mdefshow = mdefbar.join("")
    let agro = mob.agro
    let agrored = 6 - agro
    let agrobar = []
    for(i=0;i<agrored;i++){
        agrobar.push("▉")
    }
    let clas = mob.class
    let nme = client.classes.classes[clas].name
    let ig = client.classes.classes[clas].img
    let agroshow = agrobar.join("")
    let img = mob.image
    let Discord = require(`discord.js`)
    let enemy = new Discord.RichEmbed()
    .setColor(`#1075a1`)
    .setTitle(`${name}`)
    .setAuthor(nme, ig)
    .setDescription(`${mob.description}`)
    .addField(`Health:`, `\`\`\`${mob.hp}\`\`\``)
    .addField(`Total: ${atk + matk + def + mdef}`, `**Stats**: \n Attack: \`${atkshow}\` \n Mattack: \`${matkshow}\` \n Defense: \`${defshow}\` \n Mdefense: \`${mdefshow}\` \n Agro: \`${agroshow}\``)
    .setImage(img)
    .setThumbnail(`https://i.imgur.com/R88pgez.png?1`)
    .setFooter(`Various enemies may not re-appear, or were event exclusive.`)
    message.channel.send(enemy)

}