exports.run = (client, message, args) => {
    if(message.author.id !== `314385179420393472`){
        return message.channel.send(`Hey your not an admin-chan..`)
    }
    if(args.length == 0){
        return message.channel.send(`Include the ID you are searching for.`)
    }
    let searching = parseInt(args[0])
    let profiles = client.profile.keyArray()
    for(i = 0; i < profiles.length; i++){
        let profile = profiles[i]
        if(client.profile.has(profile, "characters")){
            let characters = client.profile.get(profile, "characters")
            if(characters.includes(searching)){
                message.channel.send(`${searching} has been found in the inventory of player ${profile}`)
            }
        }
    }
}