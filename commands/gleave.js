exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "guild")){
        return message.channel.send(`You are not in a guild to leave!`)
    }
    if(client.profile.get(message.author.id, "guild") == 0){
        return message.channel.send(`You are not in a guild to leave!`)
    }
    let guild = client.profile.get(message.author.id, "guild")
    if(client.guild.get(guild, "leader") == message.author.id){
        return message.channel.send(`You cannot leave your own guild without appointing a new leader!`)
    }
    if(client.battles.has(guild)){
        return message.channel.send(`You cannot leave the guild during a battle!`)
    }
    client.profile.set(message.author.id, 0, "guild")
    let members = client.guild.get(guild, "members")
    var index = members.indexOf(message.author.id);
    if (index > -1) {
       var newroster = members.splice(index, 1);
       client.guild.set(guild, members, "members")
    }
    let Discord = require(`discord.js`)
    let leave = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`You are now a solo player!`)
    .setDescription(`You will no longer be able to access the guild bank!`)
    message.channel.send(leave)
}