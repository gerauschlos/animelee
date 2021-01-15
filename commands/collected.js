exports.run = (client, message, args) => {


    if(!client.profile.has(message.author.id)){
        return message.channel.send("You have not started Animelee!")
     };

     const check = client.profile.get(message.author.id, "characters").length
     if(check == 0){
         return message.channel.send(`You have no characters!`)
     }

    if(args.length == 0) {
    const chars = client.profile.get(message.author.id, "characters")
    let set = Array.from(new Set(chars))
    const charlength = set.length
    const prefix = client.config.prefix

    const Discord = require(`discord.js`)
    const collected = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle(`Your collected:`)
    .setDescription(`${charlength}/ 22 characters.`)

    return message.channel.send(collected)
    }

    if(args.length == 1) {
        const check2 = client.profile.get(message.mentions.users.first().id).length
        if(check2 == 0){
            return message.channel.send(`This player has no characters!`)
        }
        if(!message.mentions.users.first()){
           return message.channel.send(`This is not a valid player!`)
        }
            const arraymen = message.mentions.users.first().id


            if(!client.profile.has(arraymen)) {
               return message.channel.send(`This player has not started Animelee!`)}

         else {

        const mentioned = message.mentions.users.first().username

        const chars = client.profile.get(arraymen, "characters")
        let set = Array.from(new Set(chars))
        const charlength = set.length
        const prefix = client.config.prefix

        const Discord = require(`discord.js`)
        const collected = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`${mentioned}\`s collected:`)
        .setDescription(`${charlength}/ 22 characters.`)

     return message.channel.send(collected)
    }}
    else {
        return message.channel.send(`This is not a valid player!`)
    }
}