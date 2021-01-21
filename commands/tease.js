exports.run = (client, message, args) => {
    if(message.author.id == '229601796442685440' || message.author.id == '314385179420393472'){
        message.delete()
        let Discord = require(`discord.js`)
        let teaser = new Discord.RichEmbed()
        .setColor(`#4a0002`)
        .setTitle(`Glitch detected.. e-int not found.. Encription Failed.`)
        .setThumbnail(`https://i.imgur.com/OjdRl2A.gif`)
        .setDescription(`*Displaying... privatized... Log Access__ Log 0000550*`)
        .addField(`Dear K`, `Apologies for taking so long to reply. As you know, I was on vacation. And then I had to take an extra hour figuring out what the hell you were saying. You don't need to use all that tech lingo. You could just straight up say what has been happening. It's not like anyone can see what you have been messaging me`)
        .addField(`Communitcation buffering...`, `Anyways, I do believe we could use this as a feature. No matter how unstable it may be, as long as we make it look intended, it's fine. All we need to do is set it up so this "glitch" will happen to some random characters. A manmade glitch. From there, we just add extra rarities into the mix. This way, the real glitches will just look intended. So for now, loop through all the characters and assign random rarities. Then, make some glitched, and make some rarities stronger than others. This will be our solution for now until we can find the real cause behind the glitches.`)
        .addField(`Interface Reseting..`, `\> Goodbye for now. Just push out the update. It will work out. \nEl Psy Congroo \n-M`)
        .setFooter(`Transmission Terminated`)
        .setTimestamp()
        message.channel.send(teaser)        
    }
}