exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "chosen")){
        return message.channel.send(`Please choose a character first!`)
    }
    if(client.profile.get(message.author.id, "rank") < 5){
        return message.channel.send(`You must complete the first 5 quests to unlock reinforcing!`)
    }
    if(!client.profile.has(message.author.id, "horns")){
        return message.channel.send(`You do not have the materials to reinforce a character!`)
    }
    if(client.profile.get(message.author.id, "horns") < 20 || client.profile.get(message.author.id, "souls") < 20 || client.profile.get(message.author.id, "lances") < 20 || client.profile.get(message.author.id, "nightmares") < 20 || client.profile.get(message.author.id, "tridents") < 20 || client.profile.get(message.author.id, "souldust") < 20 || client.profile.get(message.author.id, "wings") < 20 || client.profile.get(message.author.id, "souldew") < 20 || client.profile.get(message.author.id, "diamonds") < 20){
        return message.channel.send(`You do not have the materials to reinforce a character!`)
    }
    let characters = client.profile.get(message.author.id, "characters")
    if(characters.length == 0){
        return message.channel.send(`You only have 1 character!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please follow this template: \`!rein [target] [character being used to reinforce (dissapears after)]\`.`)
    }
    if(args.length == 1){
        return message.channel.send(`Please follow this template: \`!rein [target] [character being used to reinforce (dissapears after)]\`.`)
    }
    if(client.profile.get(message.author.id, "questing") !== 0){
        return message.channel.send(`You cannot reinforce while in battle!`)
    }
    let target = parseInt(args[0])
    let sac = parseInt(args[1])
    if(target == sac){
        return message.channel.send(`You cannot reinforce a character with itself!`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid character.`)
    }
    if(isNaN(args[1])){
        return message.channel.send(`This is not a valid character.`)
    }
    if (0 < target && target <= characters.length){
        if(0 < sac && sac <= characters.length){
        let tarkey = characters[target - 1];
        let sackey = characters[sac - 1];
        let name1 = client.characters.get(tarkey, "Name")
        let img1 = client.characters.get(tarkey, "Image")
        let id1 = client.characters.get(tarkey, "Lib")
        let name2 = client.characters.get(sackey, "Name")
        let img2 = client.characters.get(sackey, "Image")
        let id2 = client.characters.get(sackey, "Lib")
        var reined = 0
        var add = 20
        if(client.characters.get(tarkey, "Reinforced") >= 3){
        var add = 40
        }
        let Discord = require(`discord.js`)
        if(client.profile.get(message.author.id, "chosen") == sackey){
            return message.channel.send(`You cannot reinforce with your chosen character!`)
        }
        if(client.profile.get(message.author.id, "fav") == sackey){
            return message.channel.send(`You cannot reinforce with your favorite character!`)
        }
        if(client.characters.get(tarkey, "Reinforced") == 5){
            return message.channel.send(`This character has already been reinforced to capacity.`)
        }
        if(id1 == id2){
            var cost = 25 * (client.characters.get(tarkey, "Reinforced") + 1)
        }
        if(id1 !== id2){
         return message.channel.send(`Duplicate character is required for reinforcement!`)
        }
        if(client.characters.get(tarkey, "Reinforced") >= 3){
            var cost = 75 * (client.characters.get(tarkey, "Reinforced"))
        }
        if(client.profile.get(message.author.id, "shards") < cost){
            var status = "❌"
        }
        if(client.profile.get(message.author.id, "shards") >= cost){
            var status = "✅"
        }
       
        var tos = 1
        let reinforce = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`You are about to reinforce ${name1} with ${name2}!`)
        .setDescription(`This will permanently consume ${name2}! Are you sure you want to continue?`)
        .addField(`React with the stat you would like to reinforce!`, `1. Speed, 2. Attack, 3. Mattack, 4. Defense, 5. Mdefense.`)
        .addField(`${status} Cost:`, `${cost} shards | 20 Horns | 20 Flames | 20 Lances | 20 Nightmares | 20 Tridents | 20 Souldust | 20 Wings | 20 Souldew | 20 Diamonds.`)
        .setThumbnail(img2)
        .setImage(img1)
        .setFooter(`React with the stat you would like to reinforce!`)
        message.channel.send(reinforce).then(sentEmbed => {
            sentEmbed.react('1️⃣')
            .then(() => sentEmbed.react('2️⃣'))
            .then(() => sentEmbed.react('3️⃣'))
            .then(() => sentEmbed.react('4️⃣'))
            .then(() => sentEmbed.react('5️⃣'))
            .then(() => sentEmbed.react('⛔'))

            const filter = (reaction, user) => {
                return ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','⛔'].includes(reaction.emoji.name) && user.id == message.author.id;
            };
            const collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                collector.on('collect', (reaction, reactionCollector) => {
                    const reacted = reaction.emoji.name

                    if(reacted == '1️⃣'){
                        if(client.profile.get(message.author.id, "shards") < cost){
                            return message.channel.send(`You cannot afford this rein!`)
                        }
                        client.profile.remove(message.author.id, sackey, "characters")
                        client.profile.math(message.author.id, "-", cost, "shards")
                        client.profile.math(message.author.id, "-", 20, "horns")
                        client.profile.math(message.author.id, "-", 20, "souls")
                        client.profile.math(message.author.id, "-", 20, "lances")
                        client.profile.math(message.author.id, "-", 20, "nightmares")
                        client.profile.math(message.author.id, "-", 20, "tridents")
                        client.profile.math(message.author.id, "-", 20, "souldust")
                        client.profile.math(message.author.id, "-", 20, "wings")
                        client.profile.math(message.author.id, "-", 20, "souldew")
                        client.profile.math(message.author.id, "-", 20, "diamonds")
                        client.characters.delete(sackey)
                        client.characters.math(tarkey, "+", add, "Spd")
                        client.characters.math(tarkey, "+", tos, "Reinforced")
                        let rein = client.characters.get(tarkey, "Reinforced")
                        sentEmbed.delete()
                        let spdem = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`You have Increased the speed of your ${name1} with ${name2}!`)
                        .setDescription(`*${name2} has been consumed, aswell as ${cost} shards, and 20 of each material.*`)
                        if(rein == 0){
                            spdem.addField(`Reinforcement:`, `✧✧✧◈◈`)
                        }
                        if(rein == 1){
                            spdem.addField(`Reinforcement:`, `✦✧✧◈◈`)
                        }
                        if(rein == 2){
                            spdem.addField(`Reinforcemenet:`, `✦✦✧◈◈`)
                        }
                        if(rein == 3){
                            spdem.addField(`Reinforcemenet:`, `✦✦✦◈◈`)
                        }
                        if(rein == 4){
                            spdem.addField(`Reinforcemenet:`, `✦✦✦◆◈`)
                        }
                        if(rein == 5){
                            spdem.addField(`Reinforcement:`, `✦✦✦◆◆`)
                        }
                        spdem.setThumbnail(img1)
                        spdem.setTimestamp()
                        return message.channel.send(spdem)
                    }
                    if(reacted == '2️⃣'){
                        if(client.profile.get(message.author.id, "shards") < cost){
                            return message.channel.send(`You cannot afford this rein!`)
                        }
                        client.profile.remove(message.author.id, sackey, "characters")
                        client.profile.math(message.author.id, "-", cost, "shards")
                        client.profile.math(message.author.id, "-", 20, "horns")
                        client.profile.math(message.author.id, "-", 20, "souls")
                        client.profile.math(message.author.id, "-", 20, "lances")
                        client.profile.math(message.author.id, "-", 20, "nightmares")
                        client.profile.math(message.author.id, "-", 20, "tridents")
                        client.profile.math(message.author.id, "-", 20, "souldust")
                        client.profile.math(message.author.id, "-", 20, "wings")
                        client.profile.math(message.author.id, "-", 20, "souldew")
                        client.profile.math(message.author.id, "-", 20, "diamonds")
                        client.characters.delete(sackey)
                        client.characters.math(tarkey, "+", add, "Atk")
                        client.characters.math(tarkey, "+", tos, "Reinforced")
                        let rein = client.characters.get(tarkey, "Reinforced")
                        sentEmbed.delete()
                        let spdem = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`You have Increased the attack of your ${name1} with ${name2}!`)
                        .setDescription(`*${name2} has been consumed, aswell as ${cost} shards, and 20 of each material.*`)
                        if(rein == 0){
                            spdem.addField(`Reinforcement:`, `✧✧✧`)
                        }
                        if(rein == 1){
                            spdem.addField(`Reinforcement:`, `✦✧✧`)
                        }
                        if(rein == 2){
                            spdem.addField(`Reinforcemenet:`, `✦✦✧`)
                        }
                        if(rein == 3){
                            spdem.addField(`Reinforcemenet:`, `✦✦✦◈◈`)
                        }
                        if(rein == 4){
                            spdem.addField(`Reinforcemenet:`, `✦✦✦◆◈`)
                        }
                        if(rein == 5){
                            spdem.addField(`Reinforcement:`, `✦✦✦◆◆`)
                        }
                        spdem.setThumbnail(img1)
                        spdem.setTimestamp()
                        return message.channel.send(spdem)
                    }
                    if(reacted == '3️⃣'){
                        if(client.profile.get(message.author.id, "shards") < cost){
                            return message.channel.send(`You cannot afford this rein!`)
                        }
                        client.profile.remove(message.author.id, sackey, "characters")
                        client.profile.math(message.author.id, "-", cost, "shards")
                        client.profile.math(message.author.id, "-", 20, "horns")
                        client.profile.math(message.author.id, "-", 20, "souls")
                        client.profile.math(message.author.id, "-", 20, "lances")
                        client.profile.math(message.author.id, "-", 20, "nightmares")
                        client.profile.math(message.author.id, "-", 20, "tridents")
                        client.profile.math(message.author.id, "-", 20, "souldust")
                        client.profile.math(message.author.id, "-", 20, "wings")
                        client.profile.math(message.author.id, "-", 20, "souldew")
                        client.profile.math(message.author.id, "-", 20, "diamonds")
                        client.characters.delete(sackey)
                        client.characters.math(tarkey, "+", add, "Matk")
                        client.characters.math(tarkey, "+", tos, "Reinforced")
                        let rein = client.characters.get(tarkey, "Reinforced")
                        sentEmbed.delete()
                        let spdem = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`You have Increased the magic attack of your ${name1} with ${name2}!`)
                        .setDescription(`*${name2} has been consumed, aswell as ${cost} shards, and 20 of each material.*`)
                        if(rein == 0){
                            spdem.addField(`Reinforcement:`, `✧✧✧`)
                        }
                        if(rein == 1){
                            spdem.addField(`Reinforcement:`, `✦✧✧`)
                        }
                        if(rein == 2){
                            spdem.addField(`Reinforcemenet:`, `✦✦✧`)
                        }
                        if(rein == 3){
                            spdem.addField(`Reinforcemenet:`, `✦✦✦◈◈`)
                        }
                        if(rein == 4){
                            spdem.addField(`Reinforcemenet:`, `✦✦✦◆◈`)
                        }
                        if(rein == 5){
                            spdem.addField(`Reinforcement:`, `✦✦✦◆◆`)
                        }
                        spdem.setThumbnail(img1)
                        spdem.setTimestamp()
                        return message.channel.send(spdem)
                    }
                    if(reacted == '4️⃣'){
                        if(client.profile.get(message.author.id, "shards") < cost){
                            return message.channel.send(`You cannot afford this rein!`)
                        }
                        client.profile.remove(message.author.id, sackey, "characters")
                        client.profile.math(message.author.id, "-", cost, "shards")
                        client.profile.math(message.author.id, "-", 20, "horns")
                        client.profile.math(message.author.id, "-", 20, "souls")
                        client.profile.math(message.author.id, "-", 20, "lances")
                        client.profile.math(message.author.id, "-", 20, "nightmares")
                        client.profile.math(message.author.id, "-", 20, "tridents")
                        client.profile.math(message.author.id, "-", 20, "souldust")
                        client.profile.math(message.author.id, "-", 20, "wings")
                        client.profile.math(message.author.id, "-", 20, "souldew")
                        client.profile.math(message.author.id, "-", 20, "diamonds")
                        client.characters.math(tarkey, "+", tos, "Reinforced")
                        client.characters.delete(sackey)
                        client.characters.math(tarkey, "+", add, "Def")
                        let rein = client.characters.get(tarkey, "Reinforced")
                        sentEmbed.delete()
                        let spdem = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`You have Increased the defense of your ${name1} with ${name2}!`)
                        .setDescription(`*${name2} has been consumed, aswell as ${cost} shards, and 20 of each material.*`)
                        if(rein == 0){
                            spdem.addField(`Reinforcement:`, `✧✧✧`)
                        }
                        if(rein == 1){
                            spdem.addField(`Reinforcement:`, `✦✧✧`)
                        }
                        if(rein == 2){
                            spdem.addField(`Reinforcemenet:`, `✦✦✧`)
                        }
                        if(rein == 3){
                            spdem.addField(`Reinforcemenet:`, `✦✦✦◈◈`)
                        }
                        if(rein == 4){
                            spdem.addField(`Reinforcemenet:`, `✦✦✦◆◈`)
                        }
                        if(rein == 5){
                            spdem.addField(`Reinforcement:`, `✦✦✦◆◆`)
                        }
                        spdem.setThumbnail(img1)
                        spdem.setTimestamp()
                        return message.channel.send(spdem)
                    }
                    if(reacted == '5️⃣'){
                        if(client.profile.get(message.author.id, "shards") < cost){
                            return message.channel.send(`You cannot afford this rein!`)
                        }
                        client.profile.remove(message.author.id, sackey, "characters")
                        client.profile.math(message.author.id, "-", cost, "shards")
                        client.profile.math(message.author.id, "-", 20, "horns")
                        client.profile.math(message.author.id, "-", 20, "souls")
                        client.profile.math(message.author.id, "-", 20, "lances")
                        client.profile.math(message.author.id, "-", 20, "nightmares")
                        client.profile.math(message.author.id, "-", 20, "tridents")
                        client.profile.math(message.author.id, "-", 20, "souldust")
                        client.profile.math(message.author.id, "-", 20, "wings")
                        client.profile.math(message.author.id, "-", 20, "souldew")
                        client.profile.math(message.author.id, "-", 20, "diamonds")
                        client.characters.math(tarkey, "+", tos, "Reinforced")
                        client.characters.delete(sackey)
                        client.characters.math(tarkey, "+", add, "Mdef")
                        let rein = client.characters.get(tarkey, "Reinforced")
                        sentEmbed.delete()
                        let spdem = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`You have Increased the magic defense of your ${name1} with ${name2}!`)
                        .setDescription(`*${name2} has been consumed, aswell as ${cost} shards, and 20 of each material.*`)
                        if(rein == 0){
                            spdem.addField(`Reinforcement:`, `✧✧✧`)
                        }
                        if(rein == 1){
                            spdem.addField(`Reinforcement:`, `✦✧✧`)
                        }
                        if(rein == 2){
                            spdem.addField(`Reinforcemenet:`, `✦✦✧`)
                        }
                        if(rein == 3){
                            spdem.addField(`Reinforcemenet:`, `✦✦✦◈◈`)
                        }
                        if(rein == 4){
                            spdem.addField(`Reinforcemenet:`, `✦✦✦◆◈`)
                        }
                        if(rein == 5){
                            spdem.addField(`Reinforcement:`, `✦✦✦◆◆`)
                        }
                        spdem.setThumbnail(img1)
                        spdem.setTimestamp()
                        return message.channel.send(spdem)
                    }
                    if(reacted == '⛔'){
                        return message.channel.send(`You have declined to reinforce this character.`)
                    }
            })
        })
        }
    }
}