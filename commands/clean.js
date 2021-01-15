exports.run = (client, message, args) => {
    let char = client.characters.get(431)

    if(char == null){
        message.channel.send(`detected`)
    }
}