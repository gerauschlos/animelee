exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send("You dont have a profile because you havent started!")
     };
     if(!client.profile.has(message.author.id, "chardetail")){
         client.profile.set(message.author.id, 1, "chardetail")
     }
     let detail = client.profile.get(message.author.id, "chardetail")
    const characters = client.profile.get(message.author.id, "characters");
    const prefix = client.config.prefix

let size = 10;let arrayOfArrays=[];
for(let i = 0;i<characters.length;i+=size){
  arrayOfArrays.push(characters.slice(i, i+size));
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
var fav = "None"
if(client.profile.has(message.author.id, "fav")){
    let favc = client.profile.get(message.author.id, "fav")
    let favn = client.characters.get(favc, "Name")
    let favr = client.characters.get(favc, "rarity")
    if(favr == 0){
        let favemote = client.emojis.get('682724871352221714')
    }
    else if(favr == 1){
        var favemote = client.emojis.get('682724871737835581')
    }
    else if(favr == 2){
        var favemote = client.emojis.get('682724871343440044')
    }
    else if(favr == 3){
        var favemote = client.emojis.get('682724871913865223')
    }
    var fav = `${favemote} \`${favn}\``
}
let total = client.profile.get(message.author.id, "characters").length
let Discord = require(`discord.js`)
let about = new Discord.RichEmbed()
.setColor('#0099ff')
.setTitle('⚔️Your characters⚔️')
.setAuthor(message.author.username, message.author.avatarURL)
.setDescription(`Commands refer to the position of a character in your inventory! When a character is spawned it is added to the end of the list.`)
.setTimestamp()
.setFooter(`To choose a character for battle use ${prefix}choose [character #]! To view the stats of a character use ${prefix}charinfo [character #]`)
.addField(`\> Displaying ${using.length} out of ${total} characters.`, `\> Favorite Character: ${fav}`)
for(i =  0; i < using.length; i++){
    var character = using[i]
    const name = client.characters.get(character, "Name")
    const series = client.characters.get(character, "Series")
    const lvl = client.characters.get(character, "Level")
    const hp = client.characters.get(character, "Health")
    var emote = ''
    var id = (i + 1) + (10 * check)
    if(client.characters.has(character, "rarity")){
        var r = client.characters.get(character, "rarity")
        if(r == 3){
            var emote = client.emojis.get('682724871913865223')
        }
        else if(r == 2){
        var emote = client.emojis.get('682724871343440044')
        }
        else if(r == 1){
       var emote = client.emojis.get('682724871737835581')
        }
        else if(r == 0){
            var emote = client.emojis.get('682724871352221714')
        }
     }
     if(detail == 1){
     about.addField(`${id}.**${name}** ${emote}`, `From: \`${series}\`, Lvl: ${lvl}, Health: ${hp}` )
     }
     if(detail == 0){
         about.addField(`${id}. **${name}**`, `From: \`${series}\``)
     }
 }

 if (!client.profile.has(message.author.id, "fav")){
     about.setThumbnail(``)
 }
 if (client.profile.has(message.author.id, "fav")){
     if(client.profile.get(message.author.id, "fav") !== 0){
     var fav = client.profile.get(message.author.id, "fav")
     var img = client.characters.get(fav, "Image")
 about.setThumbnail(img) }
     }
message.channel.send(about)
 }