exports.run = (client, message, args) => {
    if(message.author.id !== '314385179420393472'){
        return message.channel.send(`Onee-sama says you cant use this command!`)
    }
    let profiles = client.profile.keyArray()
    for(i=0;i<profiles.length;i++){
        let profile = profiles[i]
        if(client.profile.has(profile, "shards")){
            client.profile.math(profile, "+", 1000, "shards")
        }
    }
    message.channe.send(`Done onee-sama!`)
}