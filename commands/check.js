exports.run = (client, message, args) =>{
    if(message.author.id == `314385179420393472`){
        for(i = 0; i < 70; i++){
            client.profile.push(message.author.id, 6, "items", true)
        }
        client.profile.math(message.author.id, "+", 100, "horns")
        client.profile.math(message.author.id, "+", 100, "souls")
        client.profile.math(message.author.id, "+", 100, "lances")
        client.profile.math(message.author.id, "+", 100, "nightmares")
        client.profile.math(message.author.id, "+", 100, "tridents")
        client.profile.math(message.author.id, "+", 100, "souldust")
        client.profile.math(message.author.id, "+", 100, "wings")
        client.profile.math(message.author.id, "+", 100, "souldew")
        client.profile.math(message.author.id, "+", 100, "diamonds")
        message.channel.send(`All done Onee-sama!`)
    }
}