exports.run = (client, message, args) => {
    if(message.author.id !== `314385179420393472`){
        return message.channel.send(`Onee-sama says you cant use this command!`)
    }
    let players = client.profile.keyArray()
    for(i=0;i<players.length;i++){
        let player = players[i]
        client.profile.set(player, 0, "ng")
    }
    message.channel.send(`All done onee-sama!`)
}