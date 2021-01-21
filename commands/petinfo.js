exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please include the pet you would like to see!`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid pet!`)
    }
    if(!client.profile.has(message.author.id, "pets")){
        client.profile.set(message.author.id, [], "pets")
    }
    let checking = args[0];
    let pets = client.profile.get(message.author.id, "pets")
    if (0 < checking && checking <= pets.length){
        let petkey = pets[checking - 1];
        
        let name = client.pets.get(petkey, "name")
        let desc = client.pets.get(petkey, "description")
        let atk = client.pets.get(petkey, "attack")
        let matk = client.pets.get(petkey, "mattack")
        let spd = client.pets.get(petkey, "speed")
        let lvl = client.pets.get(petkey, "level")
        let hp = client.pets.get(petkey, "health")
        let img = client.pets.get(petkey, "image")

        let Discord = require(`discord.js`)
        let mypets = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`Your ${name}!`)
        .setDescription(`${desc}`)
        .addField(`Level: ${lvl}/10`, `Stats:`)
        .addField(`Remaining Health:`, `${hp}`)
        .addField(`Speed:`, `${spd}`, true)
        .addField(`Attack:`, `${atk}`, true)
        .addField(`Magic Attack:`, `${matk}`, true)
        .setImage(img)
        .setThumbnail(message.author.avatarURL)
        .setFooter(`Use !choosep to equip a pet, pets viewable with !pets.`)
        message.channel.send(mypets)
    }
}