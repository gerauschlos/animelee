exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee`)
    }
    if(isNaN(args[0])){
        return message.channel.send(`This is not a valid pet.`)
    }
    let price = 50000
    if(args.length == 0){
        return message.channel.send(`Include 1, for pet 1, or 2 for pet 2.`)
    }
    let checking = parseInt(args[0])
    if(checking < 0 || checking > 2){
        return message.channel.send(`This is not a valid pet`)
    }
    if(checking == 1){
        var checked = client.active.active[0].pet1
        if(client.battles.has(message.channel.id)){
        if(client.battles.has(message.channel.id, "trader") && message.author.id == client.battles.get(message.channel.id, "traded")){
            var checked = client.active.active[0].wpet1
        }
    }}
    if(checking == 2){
        var checked = client.active.active[0].pet2
        if(client.battles.has(message.channel.id)){
        if(client.battles.has(message.channel.id, "trader") && message.author.id == client.battles.get(message.channel.id, "traded")){
            var checked = client.active.active[0].wpet2
        }
    }}
    let gold = client.profile.get(message.author.id, "gold")
    if(price > gold){
        var can = "❌"
    }
    if(price <= gold){
        var can = "✅"
    }
    if(client.battles.has(message.channel.id)){
    if(client.battles.has(message.channel.id, "trader") && message.author.id == client.battles.get(message.channel.id, "traded")){
        let myitems = client.profile.get(message.author.id, "items")
        let held = myitems.reduce((total,x) => (x==6 ? total+1 : total), 0)
        if(held < 75){
            var can = "❌"
        }
        if(held >= 75){
            var can = "✅"
        }
    }}
    let Discord = require(`discord.js`)
    let img = client.pet.pets[checked].img
    let petv = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`${client.pet.pets[checked].name}`)
    .setDescription(`${client.pet.pets[checked].description}`)
    .addField(`Purchasable: ${can}`, `Health: \`\`\`25\`\`\``)
    .addField(`Speed:`, `${client.pet.pets[checked].spd}`, true)
    .addField(`Attack:`, `${client.pet.pets[checked].atk}`, true)
    .addField(`Mattack:`, `${client.pet.pets[checked].matk}`, true)
    .addField(`Ability:`, `${client.pet.pets[checked].attack}`)
    .setImage(img)
    message.channel.send(petv)
}