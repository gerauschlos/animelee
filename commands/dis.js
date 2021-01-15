exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send("You have not started Animelee!")
     };
    if(args.length == 0){
        return message.channel.send(`Please include the # of the character you would like dismantled!`)
    }
     let checking = args[0];
     let characters = client.profile.get(message.author.id, "characters")
     if (0 < checking && checking <= characters.length){
         let charkey = characters[checking - 1];

         if(client.profile.get(message.author.id, "fav") == charkey){
             return message.channel.send(`You cannot dismantle your favorited character! Please select a new favorite first.`)
         }

         if(client.profile.get(message.author.id, "chosen") == charkey){
             return message.channel.send(`You cannot dismantle your chosen character! Please chose a new one first.`)
         }

         if(characters.length == 1){
             return message.channel.send(`You cannot dismantle your only character! Please obtain a new one first.`)
         }
         if(client.profile.has(message.author.id, "team")){
             let team = client.profile.get(message.author.id, "team")
             if(team.includes(charkey)){
                 return message.channel.send(`You cannot dismantle a character in your team!`)
             }
         }
         for(i = 0; i < client.items.passives.length; i++){
             let pass = client.items.passives[i].from
             let id = client.items.passives[i].id
             let name = client.items.passives[i].name
             let idc = client.characters.get(charkey, "Lib")
             if(pass.includes(idc)){
                 if(!client.profile.has(message.author.id, "pouch")){
                     client.profile.set(message.author.id, [], "pouch")
                 }
                 client.profile.push(message.author.id, id, "pouch")
                 message.channel.send(`You have discovered a ${name} remnant from the undone character!`)
             }
         }
        client.profile.remove(message.author.id, charkey, "characters")
        const name = client.characters.get(charkey, "Name")
        client.characters.delete(charkey)
        message.channel.send(`You have dismantled ${name} and recieved 50 shards!`)
        client.profile.math(message.author.id, "+", 50, "shards")
     }
}