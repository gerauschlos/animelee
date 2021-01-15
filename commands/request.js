exports.run = (client, message, args) => {

if(!args[0]){
    return message.channel.send("Please put a character ID")
}
if(!args[1]){
    return message.channel.send("Please put the character owner")
}
client.channels.get("645022577621860352").send(`Character id: ${args[0]}\nfor: ${args[1]}`)
}