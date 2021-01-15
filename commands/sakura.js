exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(client.profile.get(message.author.id, "questing") !== 0){
        return message.channel.send(`You cannot access the Sakura Shop while in battle!`)
    }
    if(!client.profile.has(message.author.id, "sakura")){
        client.profile.set(message.author.id, 0, "sakura")
    }
    if(client.battles.has(message.channel.id)){
        client.battles.delete(message.channel.id)
    }
    client.battles.set(message.channel.id, message.author.id, "sakura")
    let Discord = require(`discord.js`)
    let sakura = new Discord.RichEmbed()
    .setColor(`#240070`)
    .setTitle(`Celestial Sakura Shop`)
    .setThumbnail(`https://i.imgur.com/cdYlbaK.gif`)
    .setDescription(`Celestial Sakura is Obtained from donations, and is exchangeable here for a wide array for sough after items! \nYour Celestial Sakura: \`\`\`${client.profile.get(message.author.id, "sakura")}\`\`\``)
    .addField(`Character Options: (Character Garanteed Glitch Rarity.)`, `\> 1. |💮 x250| Kurumi Tokisaki {\`Date A Live\`} \n \> 2. |💮 x250| C: Strelitzia {\`Darling In The FranXX\`} \n \> 3. |💮 x150| Event character Voucher.`)
    .addField(`Currency Options:`, `\> 4. |💮 x1| 500 shards \n \> 5. |💮 x8| 5000 shards \n \> 6. |💮 x1| 25000 gold \n \> 7. |💮 x8| 250000 gold`)
    .addField(`Material Options:`, `\> 8. |💮 x1| 10 of each material`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setFooter(`All characters bought through Celestial Sakura are garanteed to be glitch rarity. To buy any of these use !buy after this command, NOTE: IF USED AFTER ANYTHING SPAWNS IN THE CHANNEL, OR AN !EXIT IT WILL NOT COUNT.`)
    message.channel.send(sakura)
}