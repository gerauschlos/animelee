exports.run = (client, message, args) => {
    if(message.author.id !== '314385179420393472'){
        return
    }
    if(args.length == 0){
        return
    }
    let said = args.join(" ")
    message.channel.send(`${said}`)
    message.delete()
}