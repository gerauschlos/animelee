exports.run = (client, message, args) => {
    if(message.author.id == '314385179420393472'){
        message.channel.send(`Logged ${args[0]} ${args[1]} Onee-chan!`)
    }
}