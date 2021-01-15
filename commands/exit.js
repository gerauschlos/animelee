exports.run = (client, message, channel) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(client.battles.has(message.channel.id)){
    if(client.battles.has(message.channel.id, "raid")){
        return message.channel.send(`You cannot exit a raid!`)
    }
}
    if(client.profile.get(message.author.id, "questing") !== 0){
        const quest = client.profile.get(message.author.id, "questing")
        client.battles.delete(quest)
        client.profile.set(message.author.id, 0, "questing")
        message.channel.send(`Battle exited!`)
    }
    if(client.battles.has(message.author.id)){
        client.battles.delete(message.author.id)
    }
    if(client.colo.has(message.channel.id)){
        let p2 = client.colo.get(message.channel.id, "second")
        let p1 = client.colo.get(message.channel.id, "first")
        let c1 = client.profile.get(p1, "chosen")
        let c2 = client.profile.get(p2, "chosen")
        client.characters.set(c2, 100, "Health")
        client.characters.set(c1, 100, "Health")
        client.colo.delete(message.channel.id)
        client.colo.set(p1, 0, "turn")
        client.colo.set(p2, 0, "turn")
    }
    if(client.battles.has(message.channel.id)){
    client.battles.delete(message.channel.id)
    const chosen = client.profile.get(message.author.id, "chosen")
    client.characters.set(chosen, 100, "Health")
    return message.channel.send(`You have exited from battle!`)
    }

}