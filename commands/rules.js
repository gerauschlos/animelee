exports.run = (client, message, args) => {
    const Discord = require(`discord.js`)
    const rules = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Animelee Rules of Conduct`)
    .setDescription(`Breaking these rules may result in bot penalties or Bans.`)
    .addField(`1.`, `No macro, screen recorder, or such enhanced grinding methods allowed.`)
    .addField(`2.`, `Using multiple accounts to claim quest, starting, colo, or event rewards is not allowed.`)
    .addField(`3.`, `Scamming of any kind will not be tolerated, this includes but is not limited to: Taking anything under pretenses of a trade and not following through, promising one thing and delivering another.`)
    .addField(`4.`, `Exploiting obvious glitches, without reporting it is not allowed.`)
    .addField(`5`, `Extensive, excplicit, and unwarranted harrasment of other users of the bot will result in anything from a ban to a suspension.`)
    .addField(`6`, `Setting explicitely nsfw, excessively profane, or toxic content (homophobic, insulting, sexist, etc.) in any field the bot allows you to customize will not be tolerated.`)
    message.channel.send(rules)

}