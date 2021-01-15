exports.run = (client, message, args) => {

    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    let pass = 1
    var prefix = client.config.prefix
    var quests = client.profile.get(message.author.id, "quests")
    var qlength = quests.length
    if(qlength == 0){
        client.profile.set(message.author.id, [0], 'quests')
    }
    const Discord = require('discord.js');

    const library = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`**🧭Your quests**`)
    .setAuthor(message.author.username)
    .setDescription(``)
    .setThumbnail(`https://i.imgur.com/KTYMTvA.jpg`)
    .setFooter(`Use ${prefix}embark (# of quest) to begin your quest!`)
    if(quests < client.quests.quests.length){
    for (i = 0; i < quests.length; i++) {
       const quest = quests[i]
       const title = client.quests.quests[quest].name
       const desc = client.quests.quests[quest].objective
       library.addField(`${i+1}. ${title}`, `${desc}` )
   }}
   if(client.holiday.has(message.author.id) && pass == 1){
   for(i = 0; i < client.holiday.get(message.author.id, "quests").length; i++){
       let equests = client.holiday.get(message.author.id, "quests")
       let equest = equests[i]
       let etitle = client.quests.events[equest].name
       let edesc = client.quests.events[equest].objective
       library.addField(`2. ${etitle}`, `${edesc}`)
   }}
   message.channel.send(library)
}