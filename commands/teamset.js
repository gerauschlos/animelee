exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please follow this usage: !teams [character number] [slot number(1/2/3)]`)
    }
    if(args.length == 1){
        return message.channel.send(`Please follow this usage: !teams [character number] [slot number(1/2/3)]`)
    }
    if(client.profile.get(message.author.id, "questing") !== 0){
        return message.channel.send(`You cannot change teams mid quest!`)
    }
    if(isNaN(args[0]) || isNaN(args[1])){
        return message.channel.send(`This is not a valid number!`)
    }
    let checking = parseInt(args[0])
    let slot = parseInt(args[1])
    let characters = client.profile.get(message.author.id, "characters")

    if(0 < checking && checking <= characters.length){
        let charkey = characters[checking - 1]
        if(!client.profile.has(message.author.id, "team")){
            client.profile.set(message.author.id, [0,0,0], "team")
        }
        if(slot > 3){
            return message.channel.send(`This is not a valid slot!`)
        }
        let team = client.profile.get(message.author.id, "team")
        if(slot !== 1 && team[0] == charkey){
            team.splice(0, 1, 0)
        }
        if(slot !== 2 && team[1] == charkey){
            team.splice(1, 1, 0)
        }
        if(slot !== 1 && team[2] == charkey){
            team.splice(2, 1, 0)
        }
        let spl = slot - 1
        team.splice(spl, 1, charkey)
        let newteam = client.profile.get(message.author.id, "team")
        client.profile.set(message.author.id, newteam, "team")
        message.channel.send(`Character set in team slot ${slot}! To view your team use !team.`)
    }
}