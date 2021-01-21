exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started animelee!`)
    }
    if(!client.profile.has(message.author.id, "chosen")){
        return message.channel.send(`Please choose a character first!`)
    }
    var chosen = client.profile.get(message.author.id, "chosen")
    var charid = client.characters.get(chosen, "Lib")
    var charimg = client.characters.get(chosen, "Image")
    if(args.length == 1){
        let check = parseInt(args[0])
        if(0 <= check && check < client.units.units.length){
            var charid = check
            var charimg = client.units.units[charid].image
        }
    }
    var a1 = client.units.units[charid].abilities[0]
    var a2 = client.units.units[charid].abilities[1]
    var a3 = client.units.units[charid].abilities[2]
    let t1 = a1.type
    if(t1 == 1){
        var ty1 = "Physical"
    }
    if(t1 == 2){
        var ty1 = "Magic"
    }
    let t2 = a2.type
    if(t2 == 1){
        var ty2 = "Physical"
    }
    if(t2 == 2){
        var ty2 = "Magic"
    }
    let t3 = a3.type
    if(t3 == 1){
        var ty3 = "Physical"
    }
    if(t3 == 2){
        var ty3 = "Magic"
    }
    let a1bar = Math.round(a1.crit_chance/10) * 2
    let a2bar = Math.round(a2.crit_chance/10) * 2
    let a3bar = Math.round(a3.crit_chance/10) * 2
    let a1barm = Math.round(a1.miss_chance/10) * 2
    let a2barm = Math.round(a2.miss_chance/10) * 2

    var a1barshow = []
    for(i = 0; i < a1bar; i++){
        a1barshow.push("▉")
    }
    if(a1.crit_chance < 5){
        var a1barshow = ["▒▒"]
    }
    if(a1.crit_chance == 0){
        var a1barshow = ["░░"]
    }
    var a2barshow = []
    for(i = 0; i < a2bar; i++){
        a2barshow.push("▉")
    }
    if(a2.crit_chance < 5){
        var a2barshow = ["▒▒"]
    }
    if(a2.crit_chance == 0){
        var a2barshow = ["░░"]
    }
    var a3barshow = []
    for(i = 0; i < a3bar; i++){
        a3barshow.push("▉")
    }
    if(a3.crit_chance < 5){
        var a3barshow = ["▒▒"]
    }
    if(a3.crit_chance == 0){
        var a3barshow = ["░░"]
    }
    var a1barmshow = []
    for(i = 0; i < a1barm; i++){
        a1barmshow.push("▉")
    }
    if(a1.miss_chance < 5){
        var a1barmshow = ["▒▒"]
    }
    if(a1.miss_chance == 0){
        var a1barmshow = ["░░"]
    }
    var a2barmshow = []
    for(i=0;i<a2barm;i++){
        a2barmshow.push("▉")
    }
    if(a2.miss_chance < 5){
        var a2barmshow = ["▒▒"]
    }
    if(a2.miss_chance == 0){
        var a2barmshow = ["░░"]
    }

    var options = {
        limit: 1000 * 1000,
        min: 1,
        max: 3,
        page: 1
    }
    var { min, max, page, limit } = options;
    var pages = {
        1: {title: `${a1.name}`, color: 0x0099ff, description: `${a1.description}`, thumbnail: { url: charimg}, fields: [{name: `Ap`, value: `\`${a1.Ap}\``}, {name: `Times hit`, value: `\`${a1.hits}\``}, {name: `Critical Chance:`, value: `${client.emojis.get(`685621618743050260`)} |\`${a1barshow.join("")}\``},{name: `Graze Chance:`, value: `${client.emojis.get(`685621521644781576`)} |\`${a1barmshow.join("")}\``},{name: `Type:`, value: `\`${ty1}\``}]},
        2: {title: `${a2.name}`, color: 0x0099ff, description: `${a2.description}`, thumbnail: { url: charimg}, fields: [{name: `Ap`, value: `\`${a2.Ap}\``}, {name: `Times hit`, value: `\`${a2.hits}\``}, {name: `Critical Chance:`, value: `${client.emojis.get(`685621618743050260`)} |\`${a2barshow.join("")}\``},{name: `Graze Chance:`, value: `${client.emojis.get(`685621521644781576`)} |\`${a2barmshow.join("")}\``},{name: `Type:`, value: `\`${ty2}\``}]},
        3: {title: `Ultimate attack: ${a3.name}`, color: 0x0099ff, description: `${a3.description}`, thumbnail:{ url:charimg}, fields: [{name: `Ap`, value: `\`${a3.Ap}\``}, {name: `Cooldown`, value: `\`${a3.cd}\``}, {name: `Times hit`, value: `\`${a3.hits}\``}, {name: `Critical Chance:`, value: `${client.emojis.get(`685621618743050260`)} |\`${a3barshow.join("")}\``}, {name: `Type:`, value: `\`${ty3}\``}]}
    }
    message.channel.send({ embed: pages[options.page] }).then(sentEmbed => {
        sentEmbed.react('◀')
       .then(() => sentEmbed.react('▶'))
       .then(() => sentEmbed.react('🇽'))

       var filter = (reaction, user) => {
        return ['◀', '▶', '🇽'].includes(reaction.emoji.name) && user.id == message.author.id;
    }


    var collector = sentEmbed.createReactionCollector(filter, { time: 1500000 });

    collector.on('collect', (reaction, reactionCollector) => {
    var reacted = reaction.emoji.name

    if(reacted == `▶`) {
            if (page != max){
            page = page + 1;
             return sentEmbed.edit({ embed: pages[page] })
    }
        else {
            message.channel.send(`This is the last ability!`)
        }
}
    if(reacted == '◀') {
        if (page != min) {
        page = page - 1;
        return sentEmbed.edit({ embed: pages[page] })
        .catch(console.error)
    }
        else {
            message.channel.send(`This is the first ability!`)
        }        
}
    if(reacted == '🇽') {
        message.channel.send(`You have closed the attacks viewer.`)
        return sentEmbed.delete();
    }
    })
    })
}
