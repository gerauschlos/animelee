exports.run = (client, message, args) => {
    if (message.author.id == 314385179420393472) {
            client.profile.deleteAll()
            client.characters.deleteAll()
            client.battles.deleteAll()
    console.log("Full Reset Successful")
    message.channel.send("You have cleared all profile data") }
    else{
        return message.channel.send(`You cannot use this command!`)
    }
}