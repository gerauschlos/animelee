exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.colo.has(message.author.id)){
        return message.channel.send(`You hvae not fought any matches!`)
    }
    if(client.colo.get(message.author.id, "claimed") == 2){
        return message.channel.send(`You have completed all rewards!`)
    }
    if(client.profile.get(message.author.id, "characters").lenght == 50){
        return message.channel.send(`You have reached max character capacity!`)
    }
    if(!client.colo.has(message.author.id, "claimed")){
        client.colo.set(message.author.id, 0, "claimed")
    }
    let claimed = client.colo.get(message.author.id, "claimed")
    let held = client.colo.get(message.author.id, "glory")
    if(held < 500){
        return message.channel.send(`You dont have enough glory to claim any rewards!`)
    }
    if(claimed == 0 && held > 500){
        let chance = Math.round(Math.random() * 100)
                if(chance < 35){
                    var rng = 0
                }
                if(35 <= chance && chance < 70){
                    var rng = 1
                }
                if(70 <= chance && chance < 97){
                    var rng = 2
                }
                if(97 <= chance && chance <= 100){
                    var rng = 3
                }
                let min = client.levels.rares[rng].min
                let max = client.levels.rares[rng].max
                let col = client.levels.rares[rng].color
            const newspawnn = client.characters.autonum
            var spawned = 28
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

            client.characters.set(newspawnn, {Name: spawnedname, Image: spawnedimage, Desc: spawneddescription, Series: spanwedseries, Class: spawnedclass, Health: spawnedhp, Atk: spawnedatk, Matk: spawnedmatk, Def: spawneddef, Mdef: spawnedmdef, Spd: spawnedspd, ID: newspawnn, Lib: spawned, Level: 0, Abilities: [], Exp: 0, Reinforced: 0, rarity: rng})
            client.profile.push(message.author.id, newspawnn, "characters")
            client.colo.set(message.author.id, 1, "claimed")

        const Discord = require(`discord.js`)
        const asuna = new Discord.RichEmbed()
        .setColor(col)
        .setTitle(`You have claimed Asuna Yuuki!`)
        .setDescription(`Congratulations!`)
        .setImage(`https://i.imgur.com/v0rLYSz.png?1`)
        .setTimestamp()

       return message.channel.send(asuna)
    }
    if(claimed == 1 && held > 1000){
        let chance = Math.round(Math.random() * 100)
        if(chance < 35){
            var rng = 0
        }
        if(35 <= chance && chance < 70){
            var rng = 1
        }
        if(70 <= chance && chance < 97){
            var rng = 2
        }
        if(97 <= chance && chance <= 100){
            var rng = 3
        }
        let min = client.levels.rares[rng].min
        let max = client.levels.rares[rng].max
        let col = client.levels.rares[rng].color
        const newnewspawnn = client.characters.autonum
        var spawned = 29
        const spawnedname1 = client.units.units[spawned].name
        const spawnedimage1 = client.units.units[spawned].image
        const spawneddescription1 = client.units.units[spawned].description
        const spanwedseries1 = client.units.units[spawned].series
        const spawnedclass1 = client.units.units[spawned].class
        const spawnedhp1 = client.units.units[spawned].hp
        var spawnedatk1 = client.units.units[spawned].atk
        var spawnedmatk1 = client.units.units[spawned].matk
        var spawneddef1 = client.units.units[spawned].def
        var spawnedmdef1 = client.units.units[spawned].mdef
        var spawnedspd1 = client.units.units[spawned].spd

        if(rng == 3){
            var spawnedimage = client.units.units[spawned].gimg
        }

        let ress = Math.round((Math.random() * (max - min) + min)* 100) / 100
        let resa = Math.round((Math.random() * (max - min) + min)* 100) / 100 
        let resm = Math.round((Math.random() * (max - min) + min)* 100) / 100 
        let resd = Math.round((Math.random() * (max - min) + min)* 100) / 100 
        let resmd = Math.round((Math.random() * (max - min) + min)* 100) / 100

        var spawnedspd1 = Math.round(ress * spawnedspd1)
        var spawnedatk1 = Math.round(resa * spawnedatk1)
        var spawnedmatk1 = Math.round(resm * spawnedmatk1)
        var spawneddef1 = Math.round(resd * spawneddef1)
        var spawnedmdef1 = Math.round(resmd * spawnedmdef1)
        client.characters.set(newnewspawnn, {Name: spawnedname1, Image: spawnedimage1, Desc: spawneddescription1, Series: spanwedseries1, Class: spawnedclass1, Health: spawnedhp1, Atk: spawnedatk1, Matk: spawnedmatk1, Def: spawneddef1, Mdef: spawnedmdef1, Spd: spawnedspd1, ID: newnewspawnn, Lib: spawned, Level: 0, Abilities: [], Exp: 0, Reinforced: 0, rarity: rng})
        client.profile.push(message.author.id, newnewspawnn, "characters")
        client.colo.set(message.author.id, 2, "claimed")
    const Discord = require(`discord.js`)
    const lazengann = new Discord.RichEmbed()
    .setColor(col)
    .setTitle(`You have claimed Lazengann!`)
    .setDescription(`Congratulations!`)
    .setImage(`https://i.imgur.com/gkKcrt5.png`)
    .setTimestamp()
    return message.channel.send(lazengann)
        }
        else{
            return message.channel.send(`You do not have the glory to claim!`)
        }
    }