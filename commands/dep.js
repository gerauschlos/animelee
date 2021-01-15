exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(client.battles.has(message.channel.id)){
        if(client.battles.has(message.channel.id, "vault") && client.battles.get(message.channel.id, "vault") == message.author.id){
            if(args.length == 0){
                return message.channel.send(`Please include how much you wish to deposit!`)
            }
            if(isNaN(args[0])){
                return message.channel.send(`This is not a valid amount!`)
            }
            let amount = parseInt(args[0])
            let gold = client.profile.get(message.author.id, "gold")
            if(gold < parseInt(args[0])){
                return message.channel.send(`You dont have enough gold to deposit this amount!`)
            }
            client.profile.math(message.author.id, "-", amount, "gold")
            client.towns.math(message.author.id, "+", amount, "bank")
            client.battles.delete(message.channel.id)
            return message.channel.send(`You have deposited ${amount} gold.`)
        }
    }
    if(!client.profile.has(message.author.id, "guild")){
        return message.channel.send(`You are not in a guild!`)
    }
    if(client.profile.get(message.author.id, "guild") == 0){
        return message.channel.send(`You are not in a guild!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please include how much you wish to deposite to the guild!`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid amount!`)
    }
    let gold = client.profile.get(message.author.id, "gold")
    if(gold < parseInt(args[0])){
        return message.channel.send(`You dont have enough gold to contribute this amount!`)
    }
    if(parseInt(args[0]) < 0){
        return message.channel.send(`This is not a valid amount!`)
    }
    let amount = parseInt(args[0])
    let guild = client.profile.get(message.author.id, "guild")
    let held = client.guild.get(guild, "gold")
    client.guild.math(guild, "+", amount, "gold")
    client.profile.math(message.author.id, "-", amount, "gold")
    message.channel.send(`You have deposited ${amount} in the guild bank! Only leaders/enforcers are able to withdraw from this bank.`)

}