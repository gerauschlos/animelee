exports.run = (client, message, args) => {
    if(message.author.id !== '314385179420393472'){
        return message.channel.send(`Onee-sama says you cant do this!`)
    }
    let array = client.holiday.keyArray()
    for(i=0;i<array.length;i++){
        let key = array[i]
        client.holiday.set(key, 0, "ekills")
        client.holiday.set(key, 0, "claimed")
        client.holiday.set(key, 0, "clears")
        client.holiday.set(key, [0], "quests")
    }
    message.channel.send(`Done Onee-sama!`)
}