exports.run = (client, message, args) => {

    const chosen = client.profile.get(message.author.id, "chosen")
    const hp = client.characters.get(chosen, "Health")
    if(hp == 100){
        return message.channel.send(`Your character is already at max health.`)
    }
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    const inventory = client.profile.get(message.author.id, "items")
    if(!inventory.includes(3)){
        return message.channel.send(`You do not have any health items!`)
    }
    if(!client.profile.has(message.author.id, "chosen")){
        return message.channel.send(`Please choose the character you would like healed!`)
    }
    const Discord = require(`discord.js`)
    const heal = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('You have used a healing potion!')
    .setDescription(`Your character has regained 40 health. To check character health use \`!info\``)
    .setThumbnail(`https://i.imgur.com/MjQZy63.gif`)
    message.channel.send(heal)
    client.profile.remove(message.author.id, 3, "items")
    let newhp = hp + 40
    client.characters.set(chosen, newhp, "Health")
    if(newhp > 100){
        client.characters.set(chosen, 100, "Health")
    }
    

}