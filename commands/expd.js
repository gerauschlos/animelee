exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    let rank = client.profile.get(message.author.id, "rank")
    let Discord = require(`discord.js`)
    if(rank < 5){
        var locs = []
    }
    if(4 < rank){
        var locs = [0]
    }
    if(10 < rank){
        var locs = [0,1]
    }
    if(16 < rank){
        var locs = [0,1,2]
    }
    if(19 < rank){
        var locs = [0,1,2,3]
    }
    if(23 < rank){
        var locs = [0,1,2,3,4]
    }
    if(32 < rank){
        var locs = [0,1,2,3,4,5]
    }
    if(40 < rank){
        var locs = [0,1,2,3,4,5,6]
    }
    if(53 < rank){
        var locs = [0,1,2,3,4,5,6,7]
    }
    if(67 < rank){
        var locs = [0,1,2,3,4,5,6,7,8]
    }
    if(70 < rank){
        var locs = [0,1,2,3,4,5,6,7,8,9]
    }
    if(89 < rank){
        var locs = [0,1,2,3,4,5,6,7,8,9,11]
    }
    if(client.active.active[0].event == 1){
        locs.push(10)
    }
    let expds = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Your unlocked locations!`)
    .setDescription(`Unlock new locations by completing quests!`)
    .setThumbnail(`https://i.imgur.com/P6IgR6u.png?1`)
    .addField(`Exploring different locations allows you to to challenge enemies and claim items for reduced price!`, `Expeditions cost 100 gold, location info can be seen in !locinfo.`)
    for (i = 0; i < locs.length; i++){
        let loc = locs[i]
        let nme = client.locs.locs[loc].name
        let desc = client.locs.locs[loc].description
        let req = client.locs.locs[loc].req
        let quest = client.quests.quests[req].name
        expds.addField(`${i+1}. ${nme}`, `*Unlocked after \`${quest}\`*`)
    }
    expds.setFooter(`To head to a location use !explore [expedition #]`)
    message.channel.send(expds)
    
}