exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    let rank = client.profile.get(message.author.id, "rank")
    if(rank < 90){
        return message.channel.send(`You have not unlocked this feature!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please include the amount you would like to purchase.`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid amount of Experience.`)
    }
    let gold = client.profile.get(message.author.id, "gold")
    let buying = parseInt(args[0])
    if(buying < 0){
        return message.channel.send(`This is not a valid Amount of Experience.`)
    }
    let cost = Math.round(buying * 2)
    if(gold < cost){
        return message.channel.send(`You do not have enough gold!`)
    }
    client.profile.math(message.author.id, "-", cost, "gold")
    let chosen = client.profile.get(message.author.id, "chosen")
    client.characters.math(chosen, "+", buying, "Exp")
    message.channel.send(`${cost} used to purchase ${buying} Exp for your chosen character.`)
}