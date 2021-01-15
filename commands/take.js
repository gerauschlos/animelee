exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(client.battles.has(message.channel.id)){
        if(client.battles.has(message.channel.id, "cot")){
            client.profile.push(message.author.id, 17, "items", true)
            client.battles.delete(message.channel.id)
            return message.channel.send(`Thought Cradle Obtained.`)
        }
    }
    let quest = client.profile.get(message.author.id, "questing")
    if(quest == 0 || quest !== 95){
        return message.channel.send(`There is nothing to take here!`)
    }
    if(quest == 95){
        client.profile.push(message.author.id, 15, "items", true)
        message.channel.send(`You obtain a small, warm egg sitting by the ground.`)
        return client.profile.set(message.author.id, 0, "questing")
        }
    }