exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(message.member.hasPermission('ADMINISTRATOR', false, false)){
    if(!client.servers.has(message.guild.id)){
        client.servers.set(message.guild.id, 0, "tlog")
    }
    if(client.servers.has(message.guild.id, "tlog")){
        if(client.servers.get(message.guild.id, "tlog" !== 0 && client.servers.get(message.guild.id, "tlog") !== message.channel.id)){
            return message.channel.send(`This is not a trade-log channel!`)
        }
        if(client.servers.get(message.guild.id, "tlog") == message.channel.id){
            client.servers.set(message.guild.id, 0, "tlog")
            return message.channel.send(`Channel has been disabled as trade-log`)
        }
    }
    let set = message.channel.id
    client.servers.set(message.guild.id, set, "tlog")
    return message.channel.send(`Channel has been set to as a trade-log for this server!`)
}
}