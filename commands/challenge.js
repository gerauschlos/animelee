exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please mention the player you are challenging!`)
    }
    if(!message.mentions.users.first()){
        return message.channel.send(`This is not a valid player!`)
    }
    if(!client.profile.has(message.mentions.users.first().id)){
        return message.channel.send(`The player you are challenging has not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "chosen")){
        return message.channel.send(`You do not have a chosen character! Please !choose one before continuing.`)
    }
    if(!client.profile.has(message.mentions.users.first().id, "chosen")){
        return message.channel.send(`The player you are challenging does not have a chosen character!`)
    }
    if(client.colo.has(message.channel.id)){
        return message.channel.send(`There is already a battle happening here! Use !exit to confirm.`)
    }
    if(!client.profile.get(message.author.id, "questing") == 0){
        return message.channel.send(`You cannot challenge a player while you are in a quest.`)
    }
    if(!client.profile.get(message.mentions.users.first().id, "questing") == 0){
        return message.channel.send(`You cannot challenge a player who is questing!`)
    }
    if(message.author.id == message.mentions.users.first().id){
        return message.channel.send(`You cannot challenge yourself!`)
    }
    let p1 = message.author.id
    let p1nme = message.author.username
    let p2 = message.mentions.users.first().id
    let p2nme = message.mentions.users.first().username
    let c1 = client.profile.get(message.author.id, "chosen")
    let c2 = client.profile.get(message.mentions.users.first().id, "chosen")
    let c1name = client.characters.get(c1, "Name")
    let c2name = client.characters.get(c2, "Name")
    let c1lvl = client.characters.get(c1, "Level")
    let c2lvl = client.characters.get(c2, "Level")
    let c1img = client.characters.get(c1, "Image")
    let c2img = client.characters.get(c2, "Image")
    let c1spd = client.characters.get(c1, "Spd")
    let c2spd = client.characters.get(c2, "Spd")
    const Discord = require(`discord.js`)
    const challenge = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`🔥${p1nme} has challenged ${p2nme} to a battle!🔥`)
    .setDescription(`To continue with the battle, ${p2nme} must confirm the challenge by reacting with ✅!`)
    .addField(`${p1nme}'s ${c1name}:`, `Level: ${c1lvl}, Equipped Items: N/A`)
    .addField(`**VS**`, `${p2nme}'s ${c2name} Level: ${c2lvl}, Equipped Items: N/A`)
    .setThumbnail(c1img)
    .setImage(c2img)
    .setTimestamp()

    message.channel.send(challenge).then(sentEmbed => {
        sentEmbed.react('✅')
        .then(() => sentEmbed.react('⛔'))

        const filter = (reaction, user) => {
            return ['✅', '⛔'].includes(reaction.emoji.name) && user.id == p2
        };
        const collector = sentEmbed.createReactionCollector(filter, { time: 150000 });

        collector.on('collect', (reaction, reactionCollector) => {
        const reacted = reaction.emoji.name

        if(reacted == `✅`) {
            if(client.profile.get(message.author.id, "questing") !== 0){
                return message.channel.send(`You cannot accept while in a quest/battle!`)
            }
            client.battles.set(message.channel.id, 1, "Battle")
            message.channel.send(`Battle Comencing!`)
            if(c1spd > c2spd){
                var first = p1
                var second = p2
            }
            if(c1spd < c2spd){
                var first = p2
                var second = p1
            }
            if(c1spd == c2spd){
                var first = p1
                var second = p2
            }
            if(!client.battles.has(message.channel.id)){
                client.battles.delete(message.channel.id)
            }
            if(!client.colo.has(message.author.id)){
                client.colo.set(message.author.id, 0, "wins")
                client.colo.set(message.author.id, 0, "losses")
                client.colo.set(message.author.id, 0, "glory")
                client.colo.set(message.author.id, 0, "streak")
                client.colo.set(message.author.id, 0, "turn")
            }
            if(!client.colo.has(p2)){
                client.colo.set(p2, 0, "wins")
                client.colo.set(p2, 0, "losses")
                client.colo.set(p2, 0, "glory")
                client.colo.set(p2, 0, "streak")
                client.colo.set(p2, 0, "turn")
            }
            let firstcheck = client.profile.get(first, "chosen")
            let seconcheck = client.profile.get(second, "chosen")
            client.characters.set(firstcheck, 300, "Health")
            client.characters.set(seconcheck, 300, "Health")
            let firstname = client.characters.get(firstcheck, "Name")
            let secondname = client.characters.get(seconcheck, "Name")
            client.profile.set(message.author.id, message.channel.id, "questing")
            client.profile.set(message.mentions.users.first().id, message.channel.id, "questing")
            const accepted = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`Welcome, to the Colosseum!`)
            .setDescription(`You watch as a colosseum rises from the earth, behold the ancient tomb of True Warriors!`)
            .addField(`First move: ${firstname}`, `Second move: ${secondname}.`)
            .setImage(`https://i.imgur.com/55tVmGn.png`)
            .addField(`Note:`, `*To begin, use !attack [1 - 3]*`)
            message.channel.send(accepted)

            client.colo.set(message.channel.id, first, "first")
            client.colo.set(message.channel.id, second, "second")
            client.colo.set(message.channel.id, [p1, p2], "players")
            client.colo.set(message.channel.id, 0, "attacks")
            client.colo.set(first, 0, "turn")
            client.colo.set(second, 0, "turn")
            var started = "yes"
            
        }
        if(reacted == `⛔`){
            return message.channel.send(`Match has been canceled!`)
        }
        collector.on('end', collected => {
            if(started !== "yes"){
            message.channel.send(`Challenged Timed out!`)}
        })
        })
    })
    
    }