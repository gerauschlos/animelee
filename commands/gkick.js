exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "guild")){
        return message.channel.send(`You are not in a guild!`)
    }
    if(client.profile.get(message.author.id, "guild") == 0){
        return message.channel.send(`You are not in a guild!`)
    }
    let guild = client.profile.get(message.author.id, "guild")
    let lead = client.guild.get(guild, "leader")
    if(message.author.id !== lead){
        return message.channel.send(`You do not have the authority to kick a member!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please mention the player you wish to kick!`)
    }
    if(!message.mentions.users.first()){
        return message.channel.send(`This is not a valid player!`)
    }
    if(!client.profile.has(message.mentions.users.first().id)){
        return message.channel.send(`This player has not started Animelee!`)
    }
    let men = message.mentions.users.first().id
    if(!client.profile.has(men, "guild")){
        return message.channel.send(`This player is not in a guild!`)
    }
    if(client.profile.get(men, "guild") == 0){
        return message.channel.send(`This player is not in a guild!`)
    }
    if(client.profile.get(men, "guild") !== guild){
        return message.channel.send(`This player is not in your guild!`)
    }
    if(message.author.id == men){
        return message.channel.send(`You cannot kick yourself!`)
    }
    let members = client.guild.get(guild, "members")
    var index = members.indexOf(men);
    if (index > -1) {
       var newroster = members.splice(index, 1);
       client.guild.set(guild, members, "members")
    }
    message.channel.send(`You have just kicked ${message.mentions.users.first().username}`)
}