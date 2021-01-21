exports.run = (client, message, args) => {
    if(message.author.id !== '314385179420393472'){
        return message.channel.send(`You cannot use this command.`)
    }
    let array = client.profile.keyArray()
    for(i = 0; i < array.length; i++){
        let key = array[i]
        if(client.profile.has(key, "pets")){
           client.profile.remove(key, 11, "pets")
        }
    }
    message.channel.send(`${array.length} players have recieved rewards!`)
}