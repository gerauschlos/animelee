exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please include the pet you would like to release!`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid pet!`)
    }
    let pets = client.profile.get(message.author.id, "pets")
    let checking = parseInt(args[0])
    if (0 < checking && checking <= pets.length){
        let petkey = pets[checking - 1];
        if(client.profile.get(message.author.id, "chosenp") == petkey){
            return message.channel.send(`You cannot release your chosen pet!`)
        }
        client.profile.remove(message.author.id, petkey, "pets")
        client.pets.delete(petkey)
        client.profile.math(message.author.id, "+", 5000, "gold")
        message.channel.send(`Pet released, you have been given 5000 gold.`)
    }
}