exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee.`)
    }
    if(!client.profile.has(message.author.id, "guild") || client.profile.get(message.author.id, "guild") == 0){
        return message.channel.send(`You are not in a guild.`)
    }
    let guild = client.profile.get(message.author.id, "guild")
    let name = client.guild.get(guild, "name")
    client.battles.delete(message.channel.id)
    client.battles.set(message.channel.id, guild, "gshop")
    let Discord = require(`discord.js`)
    let guildshop = new Discord.RichEmbed()
    .setColor(`#FFFF00`)
    .setTitle(`${name}'s Guild Shop`)
    .setDescription(`Spend Guild points to gain perks and items. Your guild points: \`${client.guild.get(guild, "points")}\``)
    .addField(`Boosts:`, `1. 12 Hour EXP boost | 5 points \n2. 12 Hour Gold boost | 5 points`, true)
    .addField(`Items:`, `3. Prismatic light stone | 10 points \n4. EXP-share | 20 points \n5. Champion's grail | 50 points | 1,000,000 Gold`, true)
    .addField(`Note:`, `All guild items are provided to all members of the guild! (Only guild leader can spend guild points)`)
    .setFooter(`Guild shop items can be re-purchased however one cannot have more than one of each, Champions grail goes only to guild leader for use, Boosts do not-stack.`)
    .setTimestamp()
    message.channel.send(guildshop)
}