exports.run = (client, message, args) => {
    if(message.author.id !== '314385179420393472'){
        return message.channel.send(`Onee-sama says you cant use this command!`)
    }
    if(client.profile.has(`617362855775305728`)){
        client.profile.delete(`617362855775305728`)
    }
    let now = Date.now()
    client.profile.set(`617362855775305728`, {spawns: 1, pet1: 3, pet2: 6, raid: [], wpet1: 17, wpet2: 2, wmat1: "diamonds", wmat2: "tridents", wkey1: 8, wkey2: 7, event: 0, updatedlast: now})
    message.channel.send(`All done setting up Onee-sama!`)
}