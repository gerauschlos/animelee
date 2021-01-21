exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(args.length == 1){
        if(!message.mentions.users.first()){
            return message.channel.send(`This is not a valid player!`)
        }
        if(!client.profile.has(message.mentions.users.first().id)){
            return message.channel.send(`This player has not started Animelee!`)
        }
        if(!client.profile.has(message.mentions.users.first().id, "guild")){
            return message.channel.send(`This player is not in a guild!`)
        }
        if(client.profile.get(message.mentions.users.first().id, "guild") == 0){
            return message.channel.send(`This player is not in a guild!`)
        }
        let mentioned = message.mentions.users.first().id
        let guild = client.profile.get(mentioned, "guild")
        let name = client.guild.get(guild, "name")
        let leader = client.guild.get(guild, "leader")
        let members = client.guild.get(guild, "members")
        let subs = client.guild.get(guild, "subs")
        let gold = client.guild.get(guild, "gold")
        let roster = members.length
        const Discord = require(`discord.js`)
        let guilde = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`${name}'s Lobby`)
        .addField(`Gold: ${gold}`, `0 Wins`)
        .addField(`**Leader:**`, `👑<@${leader}>`)
        if(client.guild.has(guild, "champ")){
            if(client.guild.get(guild, "champ") !== 0){
                let champ = client.guild.get(guild, "champ")
                guilde.addField(`**Champion:**`, `🏆<@${champ}>`)
            }
        }
        for (i = 0; i < subs.length; i++) {
        const sub = subs[i]
        guilde.addField(`**Enforcer:**`, `🛠<@${sub}>` )
         }
         guilde.addField(`Members:`, `${roster}/5`)
        for (i = 0; i < members.length; i++) {
        const member = members[i]
        let char = client.profile.get(member, "chosen")
        let nme = client.characters.get(char, "Name")
        guilde.addField(`${i + 1}.`,`<@${member}>`)
        }
        if(client.guild.has(guild, "desc")){
        let desc = client.guild.get(guild, "desc")
        guilde.setDescription(`${desc}`)
        }
        guilde.addField(`*Note:*`, `*For more information about guilds, use the !help command*`)

        return message.channel.send(guilde)
        
    }
    if(!client.profile.has(message.author.id, "guild")){
        return message.channel.send(`You are not in a Guild!`)
    }
    if(client.profile.get(message.author.id, "guild") == 0){
        return message.channel.send(`You are not in a Guild!`)
    }
    let guild = client.profile.get(message.author.id, "guild")
    if(!client.guild.has(guild, "points")){
        client.guild.set(guild, 0, "points")
    }
    let leader = client.guild.get(guild, "leader")
    let name = client.guild.get(guild, "name")
    let members = client.guild.get(guild, "members")
    let subs = client.guild.get(guild, "subs")
    let gold = client.guild.get(guild, "gold")
    let points = client.guild.get(guild, "points")
    let roster = members.length
    const Discord = require(`discord.js`)
    let guilde = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`${name}'s Lobby!`)
    .addField(`Gold: ${gold}`, `0 Wins \n${points} Guild Points`)
    .addField(`**Leader:**`, `👑<@${leader}>`)
    if(client.guild.has(guild, "champ")){
        if(client.guild.get(guild, "champ") !== 0){
            let champ = client.guild.get(guild, "champ")
            guilde.addField(`**Champion:**`, `🏆<@${champ}>`)
        }
    }
    guilde.setThumbnail(message.author.avatarURL)
    for (i = 0; i < subs.length; i++) {
        const sub = subs[i]
        guildie.addField(`**Enforcer:**`, `🛠<@${sub}>` )
    }
    guilde.addField(`Members:`, `${roster}/5`)
    for (i = 0; i < members.length; i++) {
        const member = members[i]
        let char = client.profile.get(member, "chosen")
        let nme = client.characters.get(char, "Name")
        guilde.addField(`${i + 1}.`, `<@${member}>`)
    }
    if(client.guild.has(guild, "desc")){
        let desc = client.guild.get(guild, "desc")
        guilde.setDescription(`${desc}`)
    }
    guilde.addField(`*Note:*`, `*For more information about guilds, use the !help command*`)

    return message.channel.send(guilde)
    
    
}