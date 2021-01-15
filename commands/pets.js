exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "pets")){
        client.profile.set(message.author.id, [], "pets")
    }
    let pets = client.profile.get(message.author.id, "pets")
    let Discord = require(`discord.js`)
    let mypets = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`🐶Your pets!🐱`)
    .setDescription(`To view any pets info use the !petinfo command!`)
    .setFooter(`Check the !petshop every week for more pets!`)
    for (i = 0; i < pets.length; i++) {
        const pet = pets[i]
        const name = client.pets.get(pet, "name")
        const lvl = client.pets.get(pet, "level")
        const hp = client.pets.get(pet, "health")
        mypets.addField(`${i+1}. **${name}**`, `Lvl: ${lvl}, Health: ${hp}` )
    }
    if(client.profile.has(message.author.id, "chosenp") && client.profile.get(message.author.id, "chosenp") !== 0){
        let pet = client.profile.get(message.author.id, "chosenp")
        let img = client.pets.get(pet, "image")
        mypets.setThumbnail(img)
    }
    message.channel.send(mypets)
}