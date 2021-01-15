exports.run = (client, message, args) => {


    if(!client.profile.has(message.author.id)){
        return message.channel.send("You have not started Animelee!")
     };

    if (args.length == 0) {
        message.channel.send("Please include the number of the character you want to favorite from your inventory!");
        return; };

    let checking = args[0];
    let characters = client.profile.get(message.author.id, "characters")
    if (0 < checking && checking <= characters.length){
        let charkey = characters[checking - 1];

     client.profile.set(message.author.id, charkey, "fav")

     const fav = client.profile.get(message.author.id, "fav")

     const name = client.characters.get(charkey, "Name")

     message.channel.send(`You have selected your ${name} as your favorite character!`)
        
    }
}
