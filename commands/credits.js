exports.run = (client, message, args) => {
    const Discord = require(`discord.js`)
    const credits = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Animelee Credits`)
    .addField(`**Developer:**`, `Kawaisoup`)
    .addField(`**Dev Help:**`, `Metalcupcake, Karma, Nenrikido, Caleb`)
    .addField(`**Creative Team:**`, `Kawaisoup, Saphyrius`)
    .addField(`**Sprites:**`, `Duelyst, Gothicvania Collection, Szadzi art`)
    .addField(`**Tools:**`, `DigitOcean, Visual Studio Code, Imgur, Ezgif`)
    .addField(`**Characters:**`, `This is a fan creation, Animelee does not own any of the characters used within the bot. All licenses rest with their respective companies. Please support Official releases.`)
    .setTimestamp()
    message.channel.send(credits)
}