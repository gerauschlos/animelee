exports.run = (client, message, args) => {
    let Discord = require(`discord.js`)
    let tutorial = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Basic Animelee tutorial!`)
    .setDescription(`Welcome to your animelee adventure! For an easy guide, simply follow these steps.`)
    .addField(`Necessities:`, `1. You will have to spawn your first character! This is accomplished with !spawns, and then !spawn b or !spawn beginner.\n2. Check the new character you have spawned with !characters, and select it with !choose 1.`)
    .addField(`Options:`, `You now have a few options! 1. To begin the story mode, check !quests, and them !embark 1 to set out.\n2. Enemies randomly spawn via spam!\n3. You can battle other players with !challenge @player.`)
    message.channel.send(tutorial)
}