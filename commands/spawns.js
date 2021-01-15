exports.run = (client, message, args) => {

    if(!client.profile.has(message.author.id)){
        return message.channel.send("You dont have a profile because you havent started!")
     };

    const gold = client.profile.get(message.author.id, "gold");

    const shards = client.profile.get(message.author.id, "shards");

    const glimmer = client.profile.get(message.author.id, "glimmer")

    const prefix = client.config.prefix

    const Discord = require('discord.js');

    const activespawn = client.profile.get('617362855775305728', "spawns")

    const name = client.spawns.spawns[activespawn].name
    const cost = client.spawns.spawns[activespawn].cost
    const last = client.spawns.spawns[activespawn].duration
    const description = client.spawns.spawns[activespawn].description
    const img = client.spawns.spawns[activespawn].image
    if(!client.profile.has(message.author.id, "spawned")){
        client.profile.set(message.author.id, 0, "spawned")
    }
    let streak = client.profile.get(message.author.id, "spawned")
    var left = 10 - streak
    var array = []
    for(i=0;i<streak;i++){
        array.push('▰')
    }
    for(i=0;i<left;i++){
        array.push('▱')
    }
    if(array.length > 10){
        var array = ['▰','▰','▰','▰','▰','▰','▰','▰','▰','▰']
    }
    let show = array.join("")

    // inside a command, event listener, etc.
    const about = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Your available spawns:')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`You have :sparkles: \`${shards}\` :sparkles:  shards available for use!`)
        .setThumbnail(img)
        if(streak >= 10){
            about.addField(`*Spawn Streak:* **[COMPLETE]** \`${show}\``, `💰Spawns: \n*Next character will be a guaranteed featured glitch!*`)
        }
        if(streak < 10){
            about.addField(`*Spawn Streak:* \`${show}\``, `💰Spawns:`)
        }
        about.addField(`**🛡Beginner Spawn**`, `\`${shards}\`/100 shards required`)
        about.addField(`**🏅Heroic Spawn**`, `\`${shards}\`/500 shards required`)
        about.addField(`**🎯Selection Spawn**`, `\`${glimmer}\`/10 glimmer required`)
        about.addField(`**🎰Duplicate Spawn**`, `\`${shards}\`/2000 shards required`)
        about.setTimestamp()
        about.setFooter(`To preform a spawn use ${prefix}spawn [spawn name, exp: beginner, or b]`)

        if(client.active.active[0].spawns > 0){
            about.addField(`**🎆Events: ${name}**`, `\`${shards}\`/${cost} for ${last}`)
        }
    
    message.channel.send(about);
}