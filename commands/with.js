exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(client.battles.has(message.channel.id)){
        if(client.battles.has(message.channel.id, "vault") && client.battles.get(message.channel.id, "vault") == message.author.id){
            if(args.length == 0){
                return message.channel.send(`Please include the amount you would like to withdraw!`)
            }
            if(isNaN(args[0])){
                return message.channel.send(`This is not a valid amount!`)
            }
            let gold = client.towns.get(message.author.id, "bank")
            if(parseInt(args[0]) > gold){
                return message.channel.send(`You do not have enough gold to withdraw this amount!`)
            }
            let amount = parseInt(args[0])
            let newgold = gold - amount
            client.towns.set(message.author.id, newgold, "bank")
            client.profile.math(message.author.id, "+", amount, "gold")
            client.battles.delete(message.channel.id)
            return message.channel.send(`You have withdrawn ${amount} gold!`)
        }
    }
    if(!client.profile.has(message.author.id, "guild")){
        return message.channel.send(`You are not in a guild!`)
    }
    if(client.profile.get(message.author.id, "guild") == 0){
        return message.channel.send(`You are not in a guild!`)
    }
    let guild = client.profile.get(message.author.id, "guild")
    if(client.guild.get(guild, "leader") !== message.author.id){
        return message.channel.send(`You do not have the authority to withdraw gold from the guild!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please include the amount you would like to withdraw!`)
    }
    let gold = client.guild.get(guild, "gold")
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid amount!`)
    }
    if(parseInt(args[0]) > gold){
        return message.channel.send(`You do not have enough gold to withdraw this amount!`)
    }
    let amount = parseInt(args[0])
    let newgold = gold - amount
    client.guild.set(guild, newgold, "gold")
    client.profile.math(message.author.id, "+", amount, "gold")
    message.channel.send(`You have withdrawn ${amount} gold from the guild bank!`)
}