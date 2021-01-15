exports.run = (client, message, args) => {
    let authorized = client.profile.get(`617362855775305728`, "authorized")
    if(!authorized.includes(message.author.id)){
        return message.channel.send(`Onee-sama says you cant use this command!`)
    }
    let Discord = require(`discord.js`)
    let warning = new Discord.RichEmbed()
    .setColor(`#C0C0C0`)
    .setTitle(`Animelee Player Warning Interface`)
    .setDescription(`Please type the player ID you wish to warn.`)
    .setFooter(`For moderation use only.`)
    .setTimestamp()
    message.channel.send(warning)
    const filter = m => authorized.includes(m.author.id)
    const collector = message.channel.createMessageCollector(filter, { time: 15000 });

    collector.on('collect', m => {
    if(!client.profile.has(m.content)){
        return message.channel.send(`This is not a valid player.`)
    }
    let player = m.content
    let target = new Discord.RichEmbed()
    .setColor(`#C0C0C0`)
    .setTitle(`Warning On Player: ${client.users.get(player).username}`)
    .setDescription(`Please type one of the following as a reason:`)
    .addField(`Valid Reasons:`, `-Alt \n -Macro \n -Scam \n -Exploit \n -Harrassement/NSFW \n -Other`)
    .setFooter(`For Moderation use Only.`)
    .setTimestamp()
    collector.stop()
    message.channel.send(target)
});
    let viable = ["Alt", "alt", "Macro", "macro", "Scam", "scam", "Exploit", "exploit", "harrassement", "Harrassement", "NSFW", "other", "Other"]
    const filter = m => viable.includes(m.content)
    const collector = message.channel.createMessageCollector(filter, { time: 15000 });

    collector.on('collect', m => {
    if(m.content == "Alt" || m.content == "alt"){
        var text = `You \`${client.users.get(player).username}\` have been warned by Animelee staff for suspected use of Alternate Accounts. This is against Animelee's Rules of Conduct and can result in a ban. This includes the use of bank accounts. If you believe this to be a mistake or would like to appeal the warning please use the !server command to seek out Animelee staff.`
    }
    if(m.content == "Macro" || m.content == "macro"){
        var text = `You \`${client.users.get(player).username}\` have been warned by Animelee staff for suspected use of a Macro. This is against Animelee's Rules of Conduct and can result in a ban. This includes the use of tap recording programs. If you believe this to be a mistake or would like to appeal the warning please use the !server command to seek out Animelee staff.`
    }
    if(m.content == "Scam" || m.content == "scam"){
        var text = `You \`${client.users.get(player).username}\` have been warned by Animelee staff for suspected Scamming. This is against Animelee's Rules of Conduct and can result in a ban. This includes: Fraudulent Transactions, Misinformation with the intent to make a profit, etc. If you believe this to be a mistake or would like to appeal the warning please use the !server command to seek out Animelee staff.`
    }
    if(m.content == "Exploit" || m.content == "exploit"){
        var text = `You \`${client.users.get(player).username}\` have been warned by Animelee staff for suspected Exploitation. This is against Animelee's Rules of Conduct and can result in a ban. This includes: Exploitation of glitches for personal gain. Repeated use of glitches or bugs without reporting them. etc. If you believe this to be a mistake or would like to appeal the warning please use the !server command to seek out Animelee staff.`
    }
    if(m.content == "harrassement" || m.content == "Harrassement"){
        var text = `You \`${client.users.get(player).username}\` have been warned by Animelee staff for suspected Harrassement. This is against Animelee's Rules of Conduct and can result in a ban. This only includes harrassement within Animelee official servers and does not include private servers. If you believe this to be a mistake or would like to appeal the warning please use the !server command to seek out Animele staff.`
    }
    if(m.content == "NSFW"){
        var text = `You \`${client.users.get(player).username}\` have been warned by Animelee staff for suspected NSFW content. This is against Animelee's RUles of Conduct and can result in a ban. This only includes NSFW within ANimelee official servers, or use of NSFW content such as imgaes within bot functions. If you believe this to be a mistake or would like to appeal the warning please use the !server command to seek out Animelee staff.`
    }
    if(m.content == "Other" || m.content == "other"){
        collector.stop()
        message.channel.send(`Please include the reason for this warning in your own words`)
        const filter = m => viable.includes(m.author);
    const collector = message.channel.createMessageCollector(filter, { time: 15000 });

    collector.on('collect', m => {
	var text = m.content
    });
    collector.stop()
    let sample = new Discord.RichEmbed()
    .setColor(`#C0C0C0`)
    .setTitle(`Sample Warning:`)
    .setDescription(`(What the warned person will see.)`)
    .addField(`Warning Recieved For:`, `${text}`)
    .setThumbnail(client.user.avatarURL)
    .setFooter(`For Moderation Use Only.`)
    .setTimestamp()
    message.channel.send(sample)


    }
 });


    }