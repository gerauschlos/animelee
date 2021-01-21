exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "guild")){
        return message.channel.send(`You are not in a guild!`)
    }
    if(client.profile.get(message.author.id, "guikd") == 0){
        return message.channel.send(`You are not in a guild!`)
    }
    if(!client.battles.has(message.channel.id)){
        return message.channel.send(`There is no raid to join here!`)
    }
    if(!client.battles.has(message.channel.id, "raid")){
        return message.channel.send(`There is no raid to join here!`)
    }
    let guild = client.profile.get(message.author.id, "guild")
    if(guild !== client.battles.get(message.channel.id, "raid")){
        return message.channel.send(`You cannot join another guild's raid!`)
    }
    if(!client.profile.has(message.author.id, "chosen")){
        return message.channel.send(`Please choose a character before joining!`)
    }
    let parts = client.battles.get(message.channel.id, "participants")
    if(parts.includes(message.author.id)){
        return message.channel.send(`You have already joined this raid!`)
    }
    if(client.battles.get(message.channel.id, "inter") !== 0){
        return message.channel.send(`This raid has already started!`)
    }
    client.battles.push(message.channel.id, message.author.id, "participants")
    client.battles.push(message.channel.id, message.author.id, "active")
    client.battles.set(message.author.id, 0, "turn")
    client.profile.set(message.author.id, message.channel.id, "questing")
    message.channel.send(`You have joined the raid!`)
}