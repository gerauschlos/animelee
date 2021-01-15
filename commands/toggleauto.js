exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(message.member.hasPermission('ADMINISTRATOR', false, false)){
        if(!client.servers.has(message.guild.id)){
            client.servers.set(message.guild.id, 0, "tauto")
        }
        if(client.servers.get(message.guild.id, "tauto") !== 0){
            client.servers.set(message.guild.id, 0, "tauto")
            return message.channel.send(`Auto-resonses enabled within this server.`)
        }
        if(!client.servers.has(message.guild.id, "tauto")){
             client.servers.set(message.guild.id, message.guild.id, "tauto")
            }
            if(client.servers.get(message.guild.id, "tauto") == 0){
                client.servers.set(message.guild.id, message.guild.id, "tauto")
            }
        return message.channel.send(`Auto-responses disabled within this server.`)
    }
    message.channel.send(`You do not have the required permissions to use this command.`)
}