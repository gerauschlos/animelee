exports.run = (client, message, args) => {
    let valid = ['229601796442685440', '314385179420393472']
    if(!valid.includes(message.author.id)){
        return message.channel.send(`Eh? But.. Onee-Sama said people shouldnt use this..`)
    }
    if(args.length == 0){
        return message.channel.send(`Include the ID of the character you are creating!`)
    }
    if(args.length == 1){
        return message.channel.send(`Include level`)
    }
    let rng = parseInt(args[2])
    let min = client.levels.rares[rng].min
    let max = client.levels.rares[rng].max
    let em = client.levels.rares[rng].emote
    let emote = client.emojis.get(em)
    let newspawnn = client.characters.autonum
    var spawned = parseInt(args[0])
    let level = parseInt(args[1])
    const spawnedname = client.units.units[spawned].name
    const spawnedimage = client.units.units[spawned].image
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

    let spawnedexp = client.levels.levels[level].next
    client.characters.set(newspawnn, {Name: spawnedname, Image: spawnedimage, Desc: spawneddescription, Series: spanwedseries, Class: spawnedclass, Health: spawnedhp, Atk: spawnedatk, Matk: spawnedmatk, Def: spawneddef, Mdef: spawnedmdef, Spd: spawnedspd, ID: newspawnn, Lib: spawned, Level: 0, Abilities: [], Exp: spawnedexp, Reinforced: 0, rarity: rng})
    message.channel.send(`You have created a brand new ${spawnedname}. ID: ${newspawnn} ${emote}`)
}