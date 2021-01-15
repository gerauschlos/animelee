exports.run = (client, message, args) => {
    if(message.author.id !== '314385179420393472'){
        return message.channel.send(`You cannot use this command!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please include the id of the player.`)
    }
    if(args.length == 1){
        return message.channel.send(`Please include the amount donated!`)
    }
    let check = args[0]
    let amount = parseInt(args[1])
    if(!client.profile.has(check)){
        return message.channel.send(`This is not a valid user!`)
    }
    if(isNaN(args[1])){
        return message.channel.send(`This is not a valid amount!`)
    }
    if(!client.profile.has(check, "sakura")){
        client.profile.set(check, 0, "sakura")
    }
    if(!client.profile.has(check, "donated")){
        client.profile.set(check, amount, "donated")
    }
    if(client.profile.has(check, "donated")){
        client.profile.math(check, "+", amount, "donated")
    }
    if(amount == 1){
        client.profile.math(check, "+", 1, "sakura")
    }
    if(amount == 5){
        client.profile.math(check, "+", 8, "sakura")
    }
    if(amount == 10){
        client.profile.math(check, "+", 20, "sakura")
    }
    if(amount == 20){
        client.profile.math(check, "+", 50, "sakura")
    }
    const Discord = require(`discord.js`)
    const donated = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`You have input a $${amount} donation to user: ${check}!`)
    .setDescription(`A dm has been sent to them with confirmation.`)
    .setTimestamp()
    message.channel.send(donated)
    const user = client.users.find(user =>user.id === check)
    user.send("Thank you for your donation to Animelee! Rewards have been distributed!")
}