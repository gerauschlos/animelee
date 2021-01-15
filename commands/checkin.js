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
    if(args.length == 0){
        return message.channel.send(`Please include the character or pet you wish to leave in the town!`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid number.`)
    }
    if(client.battles.has(message.channel.id) && client.battles.has(message.channel.id, "petcare")){
        let petcare = client.towns.get(message.author.id, "petcare")
        if(petcare.length == 40){
            return message.channel.send(`Your petcare is full.`)
        }
        let checking = args[0];
        let pets = client.profile.get(message.author.id, "pets")
        if (0 < checking && checking <= pets.length){
            let petkey = characters[checking - 1];

            if(client.profile.get(message.author.id, "chosenp") == petkey){
                return message.channel.send(`You cannot leave your chosen pet!`)
            }

            client.towns.push(message.author.id, petkey, "petcare")
            client.profile.remove(message.author.id, petkey, "pets")
            let gain = (Client.towns.get(message.author.id, "lvl") + 1) * 2
            message.channel.send(`You have successfully left your ${client.pets.get(petkey, "name")} to petcare!`)
            setTimeout(() => {
                if(client.towns.get(message.author.id, "petcare").includes(petkey)){
                    client.pets.math(petkey, "+", gain, "exp")
                }
            }, 86400000);
        }

    }
    let hotel = client.towns.get(message.author.id, "hotel")
    if(hotel.length == 150){
        return message.channel.send(`Your hotel is full!`)
    }
    let checking = args[0];
        let characters = client.profile.get(message.author.id, "characters")
        if (0 < checking && checking <= characters.length){
            let charkey = characters[checking - 1];
            if(client.profile.get(message.author.id, "chosen") == charkey){
                return message.channel.send(`You cannot check-in your chosen character!`)
            }
            let team = client.profile.get(message.author.id, "team")
            if(team.includes(charkey)){
                return message.channel.send(`You cannot check-in a charcter on your team!`)
            }
            if(client.profile.get(message.author.id, "fav") == charkey){
                return message.channel.send(`You cannot check-in your favorite character!`)
            }
            client.profile.remove(message.author.id, charkey, "characters")
            client.towns.push(message.author.id, charkey, "hotel")
            message.channel.send(`You have succesfully checked your ${client.characters.get(charkey, "Name")} in to the town hotel.`)
            let gain = Math.round((client.towns.get(message.author.id, "lvl") + 1) * 150)

            setTimeout(() => {
                if(client.towns.get(message.author.id, "hotel").includes(charkey)){
                    client.characters.math(charkey, "+", gain, "Exp")
                }
            }, 86400000);
        }

}