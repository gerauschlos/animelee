exports.run = (client, message, args) => {
    if(message.author.id !== '314385179420393472'){
        return message.channel.send(`Onee-sama says you cannot use this command!`)
    }
    var owned = 0
    let array = []
    let chars = client.characters.keyArray()
    for(i=0;i<chars.length;i++){
        let char = chars[i]
        let profiles = client.profile.keyArray()
        for(i=0;i<profiles.length;i++){
            let profile = profiles[i]
            let held = client.profile.get(profile, "characters")
            var owned = 2
            if(held.has(char)){
                var owned = 1
            }
        }
        if(owned == 2){
            array.push(char)
        }
    }
    message.channel.send(`There are ${array.length} unowned characters found.`)
    array.join(", ")
    message.channel.send(array)

}