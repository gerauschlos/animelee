exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    client.profile.set(message.author.id, 0, "fav")
    message.channel.send(`You reset your favorite character!`)
}