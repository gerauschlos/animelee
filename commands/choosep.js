exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "pets")){
        client.profile.set(message.author.id, [], "pets")
    }
    let pets = client.profile.get(message.author.id, "pets")
    if(pets.length == 0){
        return message.channel.send(`You have no pets!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please include the pet you would like to select!`)
    }
    if(args[0] == 0){
        client.profile.set(message.author.id, 0, "chosenp")
        message.channel.send(`Pet unequipped!`)
    } 
    let checking = args[0];
        if (0 < checking && checking <= pets.length){
            let petkey = pets[checking - 1];

            let name = client.pets.get(petkey, "name")
            let img = client.pets.get(petkey, "image")

            client.profile.set(message.author.id, petkey, "chosenp")
            let Discord = require(`discord.js`)
            let chosen = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setTitle(`You have chosen your ${name} to accompany you!`)
            .setDescription(`Your chosen pet will attack enemies depending on their speed!`)
            .setFooter(`To view the info for this pet use !infop.`)
            .setThumbnail(img)
            message.channel.send(chosen)
        }
}