exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee`)
    }
    if(!client.profile.has(message.author.id, "chardetail")){
        client.profile.set(message.author.id, 0, "chardetail")
    }
    let current = client.profile.get(message.author.id, "chardetail")
    if(current == 0){
        client.profile.set(message.author.id, 1, "chardetail")
        var status = `On`
    }
    if(current == 1){
        client.profile.set(message.author.id, 0, "chardetail")
        var status = `Off`
    }
    message.channel.send(`Character details have been turned ${status}`)
}