exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    let active = client.active.active[0].pet1
    let active2 = client.active.active[0].pet2
    let nme1 = client.pet.pets[active].name
    let desc1 = client.pet.pets[active].description
    let img1 = client.pet.pets[active].img
    let nme2 = client.pet.pets[active2].name
    let desc2 = client.pet.pets[active2].description
    let img2 = client.pet.pets[active2].img
    let Discord = require(`discord.js`)
    const petshop = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`The PetShop!`)
    .setDescription(`Your only place for anime pets!`)
    .setThumbnail(img1)
    .setImage(img2)
    .addField(`1. ${nme1} || Price: 50000`, `${desc1}`)
    .addField(`2. ${nme2} || Price: 50000`, `${desc2}`)
    .setFooter(`To buy one of the following pets, use the !buyp command!`)
    message.channel.send(petshop)
}