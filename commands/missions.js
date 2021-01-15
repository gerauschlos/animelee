exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`This player has not started Animelee!`)
    }
    if(!client.profile.has(message.author.id, "daily")){
        client.profile.set(message.author.id, [], "daily")
    }
    let wanted = client.profile.get(`617362855775305728`, "wanted")
    let array = []
    let daily = client.profile.get(message.author.id, "daily")
    var total = 0
    let Discord = require(`discord.js`)
    let missions = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Your daily missions!`)
    .setThumbnail(message.author.avatarURL)
    for(i=0;i<daily.length;i++){
        let mission = daily[i]
        let name = client.missions.daily[mission].name
        let gold = client.missions.daily[mission].gold
        let shards = client.missions.daily[mission].shards
        let glimmer = client.missions.daily[mission].glimmer
        missions.addField(`${i+1}. ${name}`, `Rewards: \`${gold}\` gold. \`${shards}\` shards. \`${glimmer}\` glimmer.`)
        var total = total + shards
    }
    for(i=0;i<wanted.length;i++){
        let want = wanted[i]
        let name = client.mobs.mobs[want].name
        array.push(name)
    }
    let arrayshow = array.join(`\n `)
    if(wanted.length !== 0){
    missions.addField(`Wanted Enemies:`, `${arrayshow}`)}
    if(wanted.length == 0){
        missions.addField(`Wanted Enemies:`, `There are no wanted enemies at this time.`)
    }
    if(daily.length == 0){
        missions.addField(`Missions are added each night.`, `You have no available missions.`)
    }
    missions.setDescription(`Total shards available: ${total}`)
    missions.setFooter(`Missions change randomly each night at 12 pm EST.`)
    message.channel.send(missions)
}
