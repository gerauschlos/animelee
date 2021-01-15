exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    let rank = client.profile.get(message.author.id, "rank")
    if(rank < 100){
        return message.channel.send(`You do not have town features unlocked!`)
    }
    if(!client.towns.has(message.author.id)){
        return message.channel.send(`Your town is not built yet!`)
    }
    if(client.battles.has(message.channel.id) && client.battles.has(message.channel.id, "petcare")){
        let checking = args[0]
        let pets = client.towns.get(message.author.id, "petcare")
        if(client.profile.get(message.author.id, "pets").length >= 10){
            return message.channel.send(`Your pet inventory is full!`)
        }
        if (0 < checking && checking <= pets.length){
            let petkey = pets[checking - 1];
            
            client.towns.remove(message.author.id, petkey, "petcare")
            client.profile.push(message.author.id, petkey, "pets")
            message.channel.send(`You have checked-out your ${client.pets.get(petkey, "name")} from its petcare pen.`)
    }
}
    let hotel = client.towns.get(message.author.id, "hotel")
    if(client.profile.get(message.author.id, "characters") == 50){
        return message.channel.send(`Your inventory is full!`)
    }
    let checking = args[0];
        let characters = client.profile.get(message.author.id, "characters")
        if (0 < checking && checking <= hotel.length){
            let charkey = hotel[checking - 1];

            client.towns.remove(message.author.id, charkey, "hotel")
            client.profile.push(message.author.id, charkey, "characters")
            message.channel.send(`You have cheked-out your ${client.characters.get(charkey, "Name")} from their hotel room.`)
        }
}