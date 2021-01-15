exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    const Discord = require(`discord.js`)
    const gold = client.profile.get(message.author.id, "gold")
    const buy = parseInt(args[0])
    const items = client.items.items
    const prefix = client.config.prefix

    const store = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`**Item store**`)
    .setDescription(`Your market place for items of all kind! Available gold: \`${gold}\``)
    .setThumbnail(`https://i.imgur.com/a17ul4F.gif`)
    .setFooter(`To purchase an item, use \`${prefix}buy\``)

    for (i = 0; i < 6; i++) {
        const item = items[i]
        const title = client.items.items[i].name
        const desc = client.items.items[i].price
        store.addField(`${i+1}. ${title}`, `For \`${desc}\` gold.` )
    }
    message.channel.send(store)
    

}