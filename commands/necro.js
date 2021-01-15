exports.run = (client, message, args) => {
    var mobl = client.mobs.mobs
    var mobs = []
    for(i=0;i<mobl.length;i++){
        mobs.push(i)
    }

    let size = 10;let arrayOfArrays=[];
    for(let i = 0;i<mobs.length;i+=size){
    arrayOfArrays.push(mobs.slice(i, i+size));
}
    var check = 0
    var using = arrayOfArrays[0]
    if(args.length == 1){
    if(isNaN(args)){
        return message.channel.send(`This is not a valid enemies page!`)
    }
    var check = args[0] - 1
    }
    var using = arrayOfArrays[check]
    if(check > arrayOfArrays.length || check < 0){
        return message.channel.send(`These enemies are not available!`)
    }
    let length = Math.round(client.mobs.mobs.length/10)
    let Discord = require(`discord.js`)
    let necro = new Discord.RichEmbed()
    .setTitle(`Necronomicon: Surface`)
    .setDescription(`Listing of all recorded enemy types as they go, the living book sees all even those long past.`)
    .setThumbnail(`https://i.imgur.com/R88pgez.png?1`)
    .setColor(`#1075a1`)
    .addField(`Total Enemies: ${client.mobs.mobs.length} | Total Pages: ${length}`, `Each time one of these is killed you recieve a "Monster Kill". Your Monster Kills: \`${client.profile.get(message.author.id, "kills")}\``)
    for(i=0;i<using.length;i++){
        let mob = using[i]
        let name = client.mobs.mobs[mob].name
        let hp = client.mobs.mobs[mob].hp
        let atk = client.mobs.mobs[mob].atk
        let matk = client.mobs.mobs[mob].matk
        let def = client.mobs.mobs[mob].def
        let mdef = client.mobs.mobs[mob].mdef
        let total = atk + matk + def + mdef
        necro.addField(`${mob+1}. ${name}`, `\`${hp}\` Health. \`${total}\` Total Stats`)
    }
    necro.setFooter(`!viewn Available soon.`)
    message.channel.send(necro)
}