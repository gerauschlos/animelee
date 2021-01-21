exports.run = (client, message, args) => {

    

    if(!client.profile.has(message.author.id)){
        return message.channel.send("You have not started Animelee!")
     };

    const Discord = require('discord.js');

    const chars = client.profile.get(message.author.id, "characters")
    let set = Array.from(new Set(chars))
    const charlength = set.length
    const prefix = client.config.prefix

    const col = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Collections Guide')
    .setDescription(`Base Generation:`)
    .addField(`${charlength}/22`, `To check your characters please use \`${prefix}characters\``)
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(`Characters:`, `0 : Altair
    1 : Sirius
    2 : Artoria Pendragon
    3 : Magane Chikujoin
    4 : Evangelion Unit 01
    5 : Evangelion Unit 13
    6 : Nero Claudius
    7 : Sebastion Michaelis
    8 : 2B
    9 : Nezuko Kamado
    10 : Albedo
    11 : Ainz Ooal Gown
    13 : Mikasa Ackerman
    14 : Lupisregina Beta
    15 : Gurren Lagaan
    16 : Lelouch Lamperouge
    17 : Mai Sakurajima
    18 : Homura Akemi
    19 : Nanachi
    20 : Death the Kid
    21 : Sayaka Miki`)
    message.channel.send(col)
}