exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    let cost = 50000
    let held = client.profile.get(message.author.id, "gold")
    if(cost > held){
        return message.channel.send(`You cannot afford this pet!`)
    }
    if(!client.profile.has(message.author.id, "pets")){
        client.profile.set(message.author.id, [], "pets")
    }
    let pets = client.profile.get(message.author.id, "pets")
    if(pets.length == 10){
        return message.channel.send(`You already have 5 pets!`)
    }
    if(args.length == 0){
        return message.channel.send(`Please include the pet you would like to buy!`)
    }
    let checking = parseInt(args[0])
    if(checking > 2){
        return message.channel.send(`This is not a valid pet! To check pets use !petshop`)
    }
    if(checking < 1){
        return message.channel.send(`This is not a valid pet! To check pets use !petshop`)
    }
    let pushs = checking - 1
    if(checking == 1){
        var pet = client.active.active[0].pet1
    }
    if(checking == 2){
        var pet = client.active.active[0].pet2
    }
    let nme = client.pet.pets[pet].name
    let desc = client.pet.pets[pet].description
    let atk = client.pet.pets[pet].atk
    let matk = client.pet.pets[pet].matk
    let spd = client.pet.pets[pet].spd
    let img = client.pet.pets[pet].img
    let ID = pet
    let atkimg = client.pet.pets[pet].atkimg
    let newpet = client.pets.autonum
    client.pets.set(newpet, {health: 25, name: nme, description: desc, attack: atk, mattack: matk, speed: spd, image: img, atkimage: atkimg, lib: ID, id: newpet, level: 0, exp: 0})
    client.profile.push(message.author.id, newpet, "pets")
    client.profile.math(message.author.id, "-", cost, "gold")
    let discord = require(`discord.js`)
    let bought = new discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`You have just purchased an ${nme}!`)
    .setDescription(`Congratulations on your new pet!`)
    .setImage(img)
    .setFooter(`To check your held pets, use the !pets command.`)
    .setTimestamp()
    message.channel.send(bought)
}