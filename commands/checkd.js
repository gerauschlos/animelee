exports.run = (client, message, args) => {
    for(i = 0; i < client.holiday.keyArray().length; i++){
        let profile = client.holiday.keyArray()[i]
        client.holiday.set(profile, 0, "ekills")
        client.holiday.set(profile, 0, "claimed")
        client.holiday.set(profile, 0, "clears")
    }
    message.channel.send(`done`)
}