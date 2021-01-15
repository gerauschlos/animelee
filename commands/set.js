exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "chosen")){
        return message.channel.send(`You must have a chosen character.`)
    }
    if(args.length == 0){
        return message.channel.send(`Include the character inventory #.`)
    }
    if(args.length == 1){
        return message.channel.send(`Include the slot you would like to place this character in.`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid character!`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid slot!`)
    }
    let characters = client.profile.get(message.author.id, "characters")
    let checking = parseInt(args[0])
    let slot = parseInt(args[1])
    if(slot <= 0 || slot > 3){
        return message.channel.send(`You can only have 3 characters to a team!`)
    }
    if(0 < checking && checking <=characters.length){
        if(!client.profile.has(message.author.id, "team")){
            client.profile.set(message.author.id, [], "team")
        }
        
    }
}