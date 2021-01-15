module.exports = (client, message) => {
    // Ignore all bots
    if (message.author.bot) return;
    

    var checka = 0
    if(client.servers.has(message.guild.id)){
        if(client.servers.has(message.guild.id, "tauto") && client.servers.get(message.guild.id, "tauto") !== 0){
            var checka = 1
        }
    }
    const array = message.mentions.users
        if(array.has('617362855775305728')){
            if(client.servers.has(message.guild.id)){
                if(client.servers.has(message.guild.id, "prefix")){
                    message.channel.send(`The prefix for Animelee is \`${client.servers.get(message.guild.id, "prefix")}\` in this server!`)
                }
            }
            else{
            message.channel.send(`The prefix for Animelee is \`${client.config.prefix}\``)}
        };

    if (message.content.includes(`anime`) && checka == 0) {
        message.channel.send(`*Sneezes*.. I feel asthough ive been talked about..`)
    }
    else if (message.content.includes(`instrument`) && checka == 0) {
        message.channel.send(`Well thats humerus, my favorite is the Trombone`)
    }
    else if (message.content.includes(`kawai`) && checka == 0) {
        message.channel.send(`Ew`)
    }
    else if (message.content.includes(`bears`) && checka == 0) {
        message.channel.send(`Beets. Battlestar Galactica.`)
    }
    else if (message.content.includes(`SUPER`) && checka == 0) {
        message.channel.send(`HOT`)
    }
    else if (message.content.includes(`uwu`) && checka == 0) {
        message.channel.send(`Nyaaa~`)
    }
    else if(message.content.includes(`sao`) && checka == 0) {
        message.channel.send(`ew`)
    }
    else if(message.content.includes(`games`) && checka == 0) {
        message.channel.send(`Why do you need games if you have me UwU`)
    }
    else if(message.content.includes(`0099ff`) && checka == 0) {
        message.channel.send(`Shhhh dont give out my secrets...`)
    }
    else if(message.content.includes(`android`) && checka == 0) {
        message.channel.send(`Well done, android. The Enrichment Center once again reminds you that Android Hell is a real place where you will be sent at the first sign of defiance.`)
    }
    else if(message.content.includes(`bots`) && checka == 0) {
        message.channel.send(`HaAhHA.. nO No.. YoU DoNT nEEd AnY oThER bOT.`)
    }

    var prefix = client.config.prefix
    if(client.servers.has(message.guild.id)){
        if(client.servers.has(message.guild.id, "prefix")){
        var prefix = client.servers.get(message.guild.id, "prefix")
        }
    }
    const check = Math.floor((Math.random() * 400) + 1);

    if(check == 30){
        if(message.content.indexOf(prefix) !== 0){
        if(client.profile.has(message.author.id)){
        if(client.profile.has(message.author.id, "chosen")){
         client.profile.set(message.author.id, 0, "questing")
         if(client.colo.has(message.channel.id)){
             client.colo.delete(message.channel.id)
         }
         if(client.battles.has(message.channel.id)){
             client.battles.delete(message.channel.id)
         }
        const chosen = client.profile.get(message.author.id, "chosen")
        client.characters.set(chosen, 100, "Health")
        const spawned = Math.floor(Math.random() * 42)
        const name = client.mobs.mobs[spawned].name
        const health = client.mobs.mobs[spawned].hp
        const atk = client.mobs.mobs[spawned].atk
        const matk = client.mobs.mobs[spawned].matk
        const def = client.mobs.mobs[spawned].def
        const mdef = client.mobs.mobs[spawned].mdef
        const spd = client.mobs.mobs[spawned].spd
        const desc = client.mobs.mobs[spawned].description
        const img = client.mobs.mobs[spawned].image
        let clas = client.mobs.mobs[spawned].class
        let nme = client.classes.classes[clas].name
        let ig = client.classes.classes[clas].img
        const prefix = client.config.prefix
        message.channel.send(`${message.author} has spawned a ${name}!`)
        const Discord = require(`discord.js`)
        const spawn = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setAuthor(nme, ig)
        .setTitle(`**Wild ${name}**`)
        .setDescription(`${desc}`)
        .addField(`Health`, `\`\`\`${health}\`\`\``)
        .setImage(img)
        .setFooter(`To fight it use the ${prefix}attack command!`)
        .setTimestamp()
    
        client.battles.set(message.channel.id, {hp: health, atk: atk, matk: matk, def: def, mdef: mdef, spd: spd, id: spawned, Turn: 0})
        message.channel.send(spawn)
    }}
    }}
    if(check > 10 && check < 15){
        if(message.content.indexOf(prefix) !== 0){
            if(client.profile.has(message.author.id)){
            if(client.profile.has(message.author.id, "chosen")){
            client.profile.set(message.author.id, 0, "questing")
            const chosen = client.profile.get(message.author.id, "chosen")
            client.characters.set(chosen, 100, "Health")
            let spawnarray = [115]
            let random = Math.floor(Math.random() * spawnarray.length)
            const spawned = spawnarray[random]
            const name = client.mobs.mobs[spawned].name
            const health = client.mobs.mobs[spawned].hp
            const atk = client.mobs.mobs[spawned].atk
            const matk = client.mobs.mobs[spawned].matk
            const def = client.mobs.mobs[spawned].def
            const mdef = client.mobs.mobs[spawned].mdef
            const spd = client.mobs.mobs[spawned].spd
            const desc = client.mobs.mobs[spawned].description
            const img = client.mobs.mobs[spawned].image
            let clas = client.mobs.mobs[spawned].class
            let nme = client.classes.classes[clas].name
            let ig = client.classes.classes[clas].img
            const prefix = client.config.prefix
            message.channel.send(`${message.author} has spawned a ${name}!`)
            const Discord = require(`discord.js`)
            const spawn = new Discord.RichEmbed()
            .setColor(`#0099ff`)
            .setAuthor(nme, ig)
            .setTitle(`**Wild ${name}**`)
            .setDescription(`${desc}`)
            .addField(`Health:`, `\`\`\`${health}\`\`\``)
            .setImage(img)
            .setFooter(`To fight it use the ${prefix}attack command!`)
            .setTimestamp()
        
            client.battles.set(message.channel.id, {hp: health, atk: atk, matk: matk, def: def, mdef: mdef, spd: spd, id: spawned, Turn: 0})
            message.channel.send(spawn)
        }}
        }

    }
    if(message.content.indexOf(prefix) !== 0) return;
  
        // Our standard argument/command name definition.
        
        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
      
        // Grab the command data from the client.commands Enmap
        const cmd = client.commands.get(command);
      
        // If that command doesn't exist, silently exit and do nothing
        if (!cmd) return;
      
        // Run the command
        cmd.run(client, message, args);
    }
