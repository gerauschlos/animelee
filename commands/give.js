exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    let characcheck = client.profile.get(message.author.id, "characters")
    if(characcheck.length <= 1){
        return message.channel.send(`You do not have enough characters to give one away!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please mention the player you going to give a character to!`)
    }
    if(!message.mentions.users.first()){
        return message.channel.send(`This is not a valid player!`)
    }
    if(!client.profile.has(message.mentions.users.first().id)){
        return message.channel.send(`This player has not started Animelee!`)
    }
    if(args.length == 1){
        return message.channel.send(`Please include the character you would like to give away! (same number as used in !choose)`)
    }
    if(client.profile.get(message.author.id, "questing") !== 0){
        return message.channel.send(`You cannot give away a character while you are in a battle!`)
    }

    let checking = args[1];
    let characters = client.profile.get(message.author.id, "characters")
    if (0 < checking && checking <= characters.length){
        var charkey = characters[checking - 1];
    if(client.profile.get(message.author.id, "fav") == charkey){
        return message.channel.send(`You cannot giveaway your favorite character!`)
    }
    if(client.profile.get(message.author.id, "chosen") == charkey){
        return message.channel.send(`You cannot giveaway your chosen character!`)
    }
    let check = client.profile.get(message.mentions.users.first().id, "characters")
    if(check.length == 50){
        return message.channel.send(`This player already has the maximum amount of characters!`)
    }
    if(client.profile.has(message.author.id, "team")){
        let team = client.profile.get(message.author.id, "team")
        if(team.includes(charkey)){
            return message.channel.send(`You cannot give away a character in your team!`)
        }
    }
    let img = client.characters.get(charkey, "Image")
    client.profile.remove(message.author.id, charkey, "characters")
    client.profile.push(message.mentions.users.first().id, charkey, "characters")
    const Discord = require(`discord.js`)
    const given = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`${message.author.username} has given their ${client.characters.get(charkey, "Name")} to ${message.mentions.users.first().username}!`)
    .setDescription(`*To check your characters use !characters*`)
    .setImage(img)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    message.channel.send(given)

    let giveoccured = new Discord.RichEmbed()
    .setColor(`#0019a6`)
    .setTitle(`Gift has Occured: ${message.guild.name}`)
    .setDescription(`${message.author.username}#${message.author.discriminator} has given ${message.mentions.users.first().username}#${message.mentions.users.first().discriminator} a ${client.characters.get(charkey, "Name")} | ID: ${charkey}`)
    .setTimestamp()
    .setFooter(`For Admin use only.`)
    client.channels.get(`686237243202994262`).send(giveoccured)
    return message.channel.send(`Trade completed!`) 
}
}