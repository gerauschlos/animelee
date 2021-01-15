exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    const bio = args.join(" ")
    if(bio.length > 100){
    return message.channel.send("Keep your bio under 100 characters!")
}
client.profile.set(message.author.id, bio, "bio")
message.channel.send(`Your bio has been set to \`${bio}\``)

}