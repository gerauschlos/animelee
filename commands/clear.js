exports.run = (client, message, args) => {
    if(!client.profile.get(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "chosen")){
        return message.channel.send(`Please choose a character first.`)
    }
    let chosen = client.profile.get(message.author.id, "chosen")
    let pass = client.characters.get(chosen, "Abilities")
    if(pass.length == 1){
        let pas = pass[0]
        client.characters.remove(chosen, pas, "Abilities")
        client.profile.push(message.author.id, pas, "pouch")
    }
    if(pass.length == 2){
        let pas = pass[0]
        let pas1 = pass[1]
        client.characters.remove(chosen, pas, "Abilities")
        client.characters.remove(chosen, pas1, "Abilities")
        client.profile.push(message.author.id, pas, "pouch")
        client.profile.push(message.author.id, pas1, "pouch")
    }
    message.channel.send(`Passives removed from your chosen character!`)
}