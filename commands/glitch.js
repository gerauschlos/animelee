exports.run = (client, message, args) => {
   if(!client.profile.has(message.author.id)){
       return message.channel.send(`You have not started Animelee!`)
   }
   if(!client.profile.has(message.author.id, "chardetail")){
    client.profile.set(message.author.id, 1, "chardetail")
}
let detail = client.profile.get(message.author.id, "chardetail")
const characters = client.profile.get(message.author.id, "characters");
const prefix = client.config.prefix
   var glitch = []
   var numbers = []
   for(i = 0; i < characters.length; i++){
        let char = characters[i]
        let pos = i + 1
        if(client.characters.get(char, "rarity") == 3){
            glitch.push(char)
            numbers.push(pos)
        }
   }
   let size = 10;let arrayOfArrays=[];
    for(let i = 0;i<glitch.length;i+=size){
    arrayOfArrays.push(glitch.slice(i, i+size));
    }
    var check = 0
    var using = arrayOfArrays[0]
    if(args.length == 1){
    if(isNaN(args)){
        return message.channel.send(`This is not a valid character page!`)
    }
    var check = args[0] - 1
    var using = arrayOfArrays[check]
    if(check > arrayOfArrays.length || check < 0){
        return message.channel.send(`You do not have this page of characters!`)
    }
}
   let Discord = require(`discord.js`)
   let emote = client.emojis.get(`682724871913865223`)
   let about = new Discord.RichEmbed()
   .setColor(`#55ff55`)
   .setTitle(`⚔️Your Glitched Characters⚔️`)
   .setDescription(`Glitched characters boast the highest rarity in Animelee, aswell as the most devastating power!`)
   .addField(`Total Glitch: ${glitch.length}/50`, `To view a character use *!charinfo* from the *!characters* screen.`)
   .setFooter(`Glitched character stats may vary.`)
   for(i = 0; i < using.length; i++){
    var character = using[i]
    const name = client.characters.get(character, "Name")
    const series = client.characters.get(character, "Series")
    const lvl = client.characters.get(character, "Level")
    const hp = client.characters.get(character, "Health")
    var id = (i + 1) + (10 * check)
    var numid = id - 1
    let number = numbers[numid]
     if(detail == 1){
     about.addField(`${id}.**${name}** ${emote}`, `From: \`${series}\`, Lvl: ${lvl}, Health: ${hp} | \`${number}\`` )
     }
     if(detail == 0){
         about.addField(`${id}. **${name}**`, `From: \`${series}\` | \`${number}\``)
     }
   }
   message.channel.send(about)
}