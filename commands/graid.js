exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "guild")){
        return message.channel.send(`You are not in a guild!`)
    }
    if(client.profile.get(message.author.id, "guild") == 0){
        return message.channel.send(`You are not in a guild!`)
    }
    let guild = client.profile.get(message.author.id, "guild")
    if(message.author.id !== client.guild.get(guild, "leader")){
        return message.channel.send(`You do not have the Authority to start a guild raid`)
    }
if(!client.guild.has(guild, "next")){
    let tonext = Date.now() + 86400000
    client.guild.set(guild, tonext, "next")
}
if(client.guild.get(guild, "next") > Date.now()){
    let remainings = (client.guild.get(guild, "next") - Date.now())/1000
    let remainingm = Math.floor(remainings/60)
    let remainingh = Math.floor(remainingm/60)
    return message.channel.send(`Your next Guild raid is not available yet! It will be Available in ${remainingh} hours.`)
}
let members = client.guild.get(guild, "members")
let array =  [73,74,75,76,77,78,79,80,81]
let spawned = array[Math.floor(Math.random() * array.length)];

let Discord = require(`discord.js`)
let raid = new Discord.RichEmbed()
.setColor(`#0099ff`)
.setTitle(`You are about to embark on a raid!`)
.setDescription(`Once you embark on a raid you will not be able to continue questing until its complete!`)
.addField(`Guild raids are cooperative based enemy encounters that end when all players have died or time runs out!`, `It is recomened players do not embark on raids without active members`)
.addField(`Raids can be undertaken once every 24 hours!`, `**Rewards:** \n \`50\` shards per completion \n \`2000\` gold.`)
.setFooter(`All players wishing to participate in the raid must type !join within 30 seconds!`)
.setTimestamp()
message.channel.send(raid).then(sentEmbed => {
    sentEmbed.react('✅')
   const filter = (reaction, user) => {
    return ['✅'].includes(reaction.emoji.name) && client.guild.get(guild, "leader") == user.id
};
const collector = sentEmbed.createReactionCollector(filter, { time: 30000 });

    collector.on('collect', (reaction, reactionCollector) => {
    const reacted = reaction.emoji.name

    if(reacted == '✅'){
        if(client.battles.has(message.channel.id)){
            client.battles.delete(message.channel.id)
        }
        message.channel.send(`Raid will begin **30** Seconds!! All players must !join before then!`)
        client.battles.set(message.channel.id, guild, "raid")
        client.battles.set(message.channel.id, [message.author.id], "participants")
        client.battles.set(message.channel.id, [message.author.id], "active")
        client.battles.set(message.channel.id, [], "attacks")
        client.battles.set(message.channel.id, [], "dead")
        client.battles.set(message.channel.id, 0, "inter")
        client.battles.set(message.author.id, 0, "turn")
        client.battles.set(message.channel.id, 0, "stage")
    }
    collector.on('end', collected => {
        client.battles.set(message.channel.id, 1, "inter")
        let nme = client.mobs.mobs[spawned].name
        let desc = client.mobs.mobs[spawned].description
        let health = client.mobs.mobs[spawned].hp
        let atk = client.mobs.mobs[spawned].atk
        let matk = client.mobs.mobs[spawned].matk
        let def = client.mobs.mobs[spawned].def
        let mdef = client.mobs.mobs[spawned].mdef
        let img = client.mobs.mobs[spawned].image
        client.battles.set(message.channel.id, health, "hp")
        client.battles.set(message.channel.id, atk, "atk")
        client.battles.set(message.channel.id, matk, "matk")
        client.battles.set(message.channel.id, def, "def")
        client.battles.set(message.channel.id, def, "def")
        client.battles.set(message.channel.id, mdef, "mdef")
        client.battles.set(message.channel.id, 100, "spd")
        client.battles.set(message.channel.id, spawned, "id")
        client.battles.set(message.channel.id, 0, "turn")
        let parts = client.battles.get(message.channel.id, "participants")
        let parl = parts.length
        let guildnme = client.guild.get(guild, "name")
        let spd = 100
        message.channel.send(`Raid is Beginning!`)
        let start = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`A ${nme} has spawned from the guild!!`)
        .setDescription(`${desc}`)
        .addField(`Band together and attack the enemy for your guild!`, `Enemy Health: \`\`\`${health}\`\`\``)
        .addField(`Joined: \`${parl}\`/5`, `For: \`${guildnme}\``)
        .setImage(img)
        .setFooter(`Every player can attack once before the boss!`)
        message.channel.send(start)
    })

    })
})
}