exports.run = (client, message, args) => {

   const prefix = client.config.prefix


    if(!client.profile.has(message.author.id)){
        return message.channel.send("You have not started Animelee!")
     };

     
     if (args.length == 0) {
        message.channel.send("Please include first the player you would like to pay, and then the amount!");
        return; };

        if(!message.mentions.users.first()) {
         return message.channel.send(`This is not a valid player!`)
      }
     const array = message.mentions.users.first().id

     if(array == message.author.id){
        const nme = message.author.username
        return message.channel.send(`${nme} has committed self-pay. For shame!`)
     }

     if (!client.profile.has(array)){
         return message.channel.send(`The mentioned player has not started Animelee!`)
     }

     if (args.length == 1) {
        return message.channel.send("Please include the amount you would like pay!")
     }

     if (args.length == 2) {
        return message.channel.send("please include the currency you would like the pay with ")
     }
      if (isNaN(args[1])) {
         return message.channel.send(`This is not a valid quantity!`)
     }
     const amount = parseInt(args[1])
     if(amount < 0){
        return message.channel.send(`This is not a valid amount!`)
     }

     const value = args[2]
     let currencies = ["gold", "glimmer", "shards"]
     if(!currencies.includes(value)){
        return message.channel.send(`This is not a valid currency!`)
     }

     if(!client.profile.has(message.author.id, `${value}`)){
        return message.channel.send(`This is not a valid currency, to check your currencies use \`${prefix}bal\``)
     }

     var gold = client.profile.get(message.author.id, `${value}`)

     const paying = message.author.username

     const payed = message.mentions.users.first().username


     if (amount > gold) {
        message.channel.send(`You do not have the ${value} to preform this exchange!`);
        return; };
    
        if(isNaN(amount)){
           return message.channel.send(`The value you have input is not a number! Please make sure there are no spaces, and you have followed the proper format.`)
        }

     client.profile.math(message.author.id, "-", amount, `${value}`)
     client.profile.math(array, "+", amount, `${value}`)

     message.channel.send(`${paying} has given ${payed} \`${amount}\` ${value}!`)

     let Discord = require(`discord.js`)
     let payoccured = new Discord.RichEmbed()
     .setColor(`#0019a6`)
     .setTitle(`Payment has Occured: ${message.guild.name}`)
     .setDescription(`${message.author.username}#${message.author.discriminator} has payed \`${amount}\` ${value} to ${payed}#${message.mentions.users.first().discriminator}`)
     .setFooter(`For Admin use only.`)
     .setTimestamp()
     client.channels.get(`686237243202994262`).send(payoccured)
}