exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(args.length == 0){
        return message.channel.send(`Include the item from your pouch you would like to equip!`)
    }
    if(args.length == 1){
        return message.channel.send(`Include the character you would like to equip this item to!`)
    }
    if(client.profile.get(message.author.id, "questing") !== 0){
        return message.channel.send(`You cannot equip a passive mid-battle!`)
    }
    let pas = parseInt(args[0])
    let char = parseInt(args[1])
    let pass = client.profile.get(message.author.id, "pouch")
    let chars = client.profile.get(message.author.id, "characters")
    if(0 < pas && pas <= pass.length){
        if(0 < char && char <= chars.length){
            let paskey = pass[pas - 1]
            let charkey = chars[char - 1]
            let abs = client.characters.get(charkey, "Abilities")
            if(abs.length == 2){
                return message.channel.send(`This character already has 2 passive items equiped.`)
            }
            client.characters.push(charkey, paskey, "Abilities")
            client.profile.remove(message.author.id, paskey, "pouch")
            message.channel.send(`The passive ${client.items.passives[paskey].name} has been equipped to ${client.characters.get(charkey, "Name")}!`)
        }
    }
}