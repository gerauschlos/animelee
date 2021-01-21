exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "guild")){
        return message.channel.send(`You are not in a guild!`)
    }
    let guild = client.profile.get(message.author.id, "guild")
    if(guild == 0){
        return message.channel.send(`You are not in a guild!`)
    }
    let check = client.guild.get(guild, "leader")
    if(check !== message.author.id){
        return message.channel.send(`You do not have the authority to set a guild description!`)
    }
    let desc = args.join(" ")
    if(desc.length > 200){
        return message.channel.send(`Please keep descriptions to 200 characters!`)
    }
    client.guild.set(guild, desc, "desc")
    message.channel.send(`You have set your guild's description to \`${desc}\``)
}