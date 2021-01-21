exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(client.profile.get(message.author.id, "questing") !== 0){
        return message.channel.send(`You cannot change teams mid quest!`)
    }
    client.profile.set(message.author.id, [0,0,0], "team")
    message.channel.send(`Your team has been cleared!`)
}