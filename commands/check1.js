exports.run = (client, message, args) => {
    if(message.author.id == `314385179420393472`){
    let array = client.quests.quests
    var shards = 0
    var gold = 0
    var glimmer = 0
    for(i = 0; i < array.length; i++){
        var shards = client.quests.quests[i].rewards.shards + shards
        var gold = client.quests.quests[i].rewards.gold + gold
        var glimmer = client.quests.quests[i].rewards.glimmer + glimmer
    }
    message.channel.send(`There are ${shards} shards, ${glimmer} glimmer, and ${gold} gold Onee-chan!`)
}
    else{
        message.channel.send(`Psssh like I'd Tell you!`)
    }
}