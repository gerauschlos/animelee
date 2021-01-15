exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "donated")){
        client.profile.set(message.author.id, 0, "donated")
    }
    if(!client.profile.has(message.author.id, "dondetail")){
        client.profile.set(message.author.id, 0, "dondetail")
    }
    let detail = client.profile.get(message.author.id, "dondetail")
    if(detail == 0){
        client.profile.set(message.author.id, 1, "dondetail")
        var status = "On"
    }
    if(detail == 1){
        client.profile.set(message.author.id, 0, "dondetail")
        var status = "Off"
    }
    message.channel.send(`You have turned donated details ${status}.`)
}