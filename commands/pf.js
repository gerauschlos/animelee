exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send("You dont have a profile because you havent started!")
     };

     if(args.length == 0) {
    if(!client.profile.has(message.author.id, "dondetail")){
        client.profile.set(message.author.id, 0, "dondetail")
    }
    if(!client.profile.has(message.author.id, "donated")){
        client.profile.set(message.author.id, 0, "donated")
    }
    if(!client.profile.has(message.author.id, "completed")){
        client.profile.set(message.author.id, [], "completed")
    }
    if(!client.profile.has(message.author.id, "sakura")){
        client.profile.set(message.author.id, 0, "sakura")
    }
    var stars = []
    if(client.colo.has(message.author.id) && client.colo.get(message.author.id, "glory") >= 25000){
        stars.push("⭐")
    }
    let detail = client.profile.get(message.author.id, "dondetail")
    let donated = client.profile.get(message.author.id, "donated")
     const gold = client.profile.get(message.author.id, "gold");
     const shards = client.profile.get(message.author.id, "shards");
     const char = client.profile.get(message.author.id, "characters").length
     let chars = client.profile.get(message.author.id, "characters")
     const books = client.profile.get(message.author.id, "books").length
     const glimmer = client.profile.get(message.author.id, "glimmer")
     const kills = client.profile.get(message.author.id, "kills")
     const rank = client.profile.get(message.author.id, "rank")
     let sakura = client.profile.get(message.author.id, "sakura")
     if(rank >= 100){
         stars.push("⭐")
     }
     var total = 0
     for(i=0;i<char;i++){
         let charp = chars[i]
         let rarity = client.characters.get(charp, "rarity")
         if(rarity == 2){
            var total = total + 1
         }
     }
     if(total >= 50){
         stars.push("⭐")
     }
     if(client.profile.get(message.author.id, "completed") >= 50){
         stars.push("⭐")
     }
     let set = Array.from(new Set(chars))
     if(set.length == client.units.units.length){
         stars.push("⭐")
     }
     if(stars.length == 5){
         var stars = ["🌟", "🌟", "🌟", "🌟", "🌟"]
     }
     var starshow = stars.join("")
     if(stars.length == 0){
         var starshow = " "
     }
     var cbt = 0
     let array = client.profile.get(message.author.id, "characters")
     for(i=0;i<array.length;i++){
         let char = array[i]
         let cb = client.characters.get(char, "Atk") + client.characters.get(char, "Matk") + client.characters.get(char, "Def") + client.characters.get(char, "Mdef") + client.characters.get(char, "Spd")
         var cbt = cbt + cb
     }
     var tcbt = 0
        if(client.profile.has(message.author.id, "team")){
            let team = client.profile.get(message.author.id, "team")
            for(i=0;i<team.length;i++){
                let tchar = team[i]
                if(tchar !== 0){
                var tcb = client.characters.get(tchar, "Atk") + client.characters.get(tchar, "Matk") + client.characters.get(tchar, "Def") + client.characters.get(tchar, "Mdef") + client.characters.get(tchar, "Spd")
                }
                else if(tchar == 0){
                    var tcb = 0
                }
                var tcbt = tcbt + tcb
            }
        }
     const Discord = require('discord.js');

     // inside a command, event listener, etc.
     const about = new Discord.RichEmbed()
         .setColor('#0099ff')
         .setTitle(`** ${message.author.username}'s profile!**`)
         .setThumbnail(message.author.avatarURL)
         .addField('World Profile:', `⚔️Held Characters | \`${char}\`/50 \n🎖Player Rank | \`${rank}\` \n🔥Monster Kills | \`${kills}\` \n📖Held books | \`${books}\``, true)
         .addField(`Currencies:`, `⚖️Gold | \`${gold}\` \n💎Crystal Shards | \`${shards}\` \n✨Glimmer | \`${glimmer}\` \n💮Celestial Sakura | \`${sakura}\``, true)
         .addField(`Total Player Combat Power:`, `\`\`\`${cbt} || ${tcbt} (Team Combat Power)\`\`\``)
         if (client.profile.has(message.author.id, "fav")) {
            if(client.profile.get(message.author.id, "fav") !== 0){
            var fav = client.profile.get(message.author.id, "fav")
            var name = client.characters.get(fav, "Name")
            var rarity = client.characters.get(fav, "rarity")
            let emote = client.emojis.get(client.levels.rares[rarity].emote)
            about.addField(`💫Favorite Character`,`${emote} \`${name}\``, true)
            }
        }
         if(detail == 1){
            about.addField(`💸Donated:`, `$\`${donated}\``, true)
         }
         if(client.profile.has(message.author.id, "bio")){
            let bio = client.profile.get(message.author.id, "bio")
             about.setDescription(`\> Hidden Stars Found: \`\`\`${starshow}\`\`\` Total: 5 \n ${bio}`)
         }
         if(!client.profile.has(message.author.id, "bio")){
             about.setDescription(`\> Hidden Stars Found: \`\`\`${starshow}\`\`\` Total: 5`)
         }
         if(client.profile.has(message.author.id, "guild")){
            if(!client.profile.get(message.author.id, "guild") == 0){
                let guild = client.profile.get(message.author.id, "guild")
                let name = client.guild.get(guild, "name")
                about.addField(`🏛Current Guild:`, `${name}`, true)
            }
         }
         if(client.profile.has(message.author.id, "pets")){
             let pets = client.profile.get(message.author.id, "pets")
             let count = pets.length
             about.addField(`🎀Pets:`, `\`${count}\`/10`, true)
         }
         

         about.setTimestamp()
         about.setFooter(message.author.username)

     
     message.channel.send(about);
 }
    if(args.length == 1) {
        if(!message.mentions.users.first()) {
            return message.channel.send(`This is not a valid player!`)
         }
         const men =  message.mentions.users.first().username
         const menid = message.mentions.users.first().id
         const menav = message.mentions.users.first().avatarURL
         var event = "None"
         if(client.profile.get(menid, "event") !== 0){
             var event = "Active with !event"
         }
         let spawn = client.profile.get(menid, "spawns")
         if(!client.profile.has(menid, "completed")){
            client.profile.set(menid, [], "completed")
        }
        if(menid == '617362855775305728'){
            let Discord = require(`discord.js`)
            let melee = new Discord.RichEmbed()
            .setColor(`#ff483b`)
            .setTitle(`Animelee's Animelee Profile`)
            .setDescription(`\> Not-Hidden to me stars \`\`\`🌟🌟🌟🌟🌟🌟🌟\`\`\` Total 5 \nKyaaaa~! Why are you looking over here!`)
            .addField(`World Profile:`, `👥Players | \`${client.profile.keyArray().length}\` \n🧾Servers | \`${client.guilds.keyArray().length}\` \n🃏 Spawn | \`${client.spawns.spawns[spawn].name}\` \n💠Event Status | \`${event}\``, true)
            .addField(`Currencies:`, `⚖️Gold | \`More than you jerk!\` \n💎Crystal Shards | \`∞\` \n✨Glimmer | \`You shouldnt ask a lady!\` \n💮Celestial Sakura | \`2100\``, true)
            .addField(`Optional Fields:`, `💸Donated: \`Yes donate to me more\``)
            .setThumbnail(menav)
            .setFooter(`Animelee is just Animelee! Stop tryna learn more yu skeevy weirdo!`)
            return message.channel.send(melee)
        }
         var stars = []
        if(client.colo.has(menid) && client.colo.get(menid, "glory") >= 25000){
        stars.push("⭐")
        }

         if(!client.profile.has(menid)){
            return message.channel.send("The mentioned player has not started Animelee!")
         };
         if(!client.profile.has(menid, "dondetail")){
             client.profile.set(menid, 0, "dondetail")
         }
         if(!client.profile.has(menid, "donated")){
             client.profile.set(menid, 0, "donated")
         }
         let detail = client.profile.get(menid, "dondetail")
         let donated = client.profile.get(menid, "donated")
         const gold = client.profile.get(menid, "gold");
         const shards = client.profile.get(menid, "shards");
         const char = client.profile.get(menid, "characters").length
         const books = client.profile.get(menid, "books").length
         const glimmer = client.profile.get(menid, "glimmer")
         const kills = client.profile.get(menid, "kills")
         const rank = client.profile.get(menid, "rank")
         if(rank >= 100){
            stars.push("⭐")
        }
        if(client.profile.get(message.author.id, "completed") >= 50){
            stars.push("⭐")
        }
        let chars = client.profile.get(menid, "characters")
        let set = Array.from(new Set(chars))
        for(i=0;i<char;i++){
            let charp = chars[i]
            let rarity = client.characters.get(charp, "rarity")
            if(rarity == 2){
               var total = total + 1
            }
        }
        if(total >= 50){
            stars.push("⭐")
        }
        if(set.length == client.units.units.length){
         stars.push("⭐")
        }
        if(stars.length == 5){
            var stars = ["🌟", "🌟", "🌟", "🌟", "🌟"]
        }
        var starshow = stars.join("")
        if(stars.length == 0){
            var starshow = " "
        }
         const Discord = require('discord.js');
         if(!client.profile.has(menid, "sakura")){
             client.profile.set(menid, 0, "sakura")
         }
        let sakura = client.profile.get(menid, "sakura")
        let array = client.profile.get(menid, "characters")
        var cbt = 0
        for(i=0;i<array.length;i++){
            let char = array[i]
            let cb = client.characters.get(char, "Atk") + client.characters.get(char, "Matk") + client.characters.get(char, "Def") + client.characters.get(char, "Mdef") + client.characters.get(char, "Spd")
            var cbt = cbt + cb
        }
        var tcbt = 0
        if(client.profile.has(menid, "team")){
            let team = client.profile.get(menid, "team")
            for(i=0;i<team.length;i++){
                let tchar = team[i]
                if(tchar !== 0){
                var tcb = client.characters.get(tchar, "Atk") + client.characters.get(tchar, "Matk") + client.characters.get(tchar, "Def") + client.characters.get(tchar, "Mdef") + client.characters.get(tchar, "Spd")
                }
                else if(tchar == 0){
                    var tcb = 0
                }
                var tcbt = tcbt + tcb
            }
        }
     // inside a command, event listener, etc.
     const about = new Discord.RichEmbed()
         .setColor('#0099ff')
         .setTitle('**Your profile!**')
         .setAuthor(men)
         .setThumbnail(menav)
         .addField('World Profile:', `⚔️Held Characters | \`${char}\`/50 \n🎖Player Rank | \`${rank}\` \n🔥Monster Kills | \`${kills}\` \n📖Held books | \`${books}\``, true)
         .addField(`Currencies:`, `⚖️Gold | \`${gold}\` \n💎Crystal Shards | \`${shards}\` \n✨Glimmer | \`${glimmer}\` \n💮Celestial Sakura | \`${sakura}\``, true)
         .addField(`Total Player Combat Power: `,`\`\`\`${cbt} || ${tcbt} (Team Combat Power)\`\`\``)
         if (client.profile.has(menid, "fav")) {
            if(client.profile.get(menid, "fav") !== 0){
            var fav = client.profile.get(menid, "fav")
            var name = client.characters.get(fav, "Name")
            var rarity = client.characters.get(fav, "rarity")
            let emote = client.emojis.get(client.levels.rares[rarity].emote)
            about.addField(`💫Favorite Character`,`${emote} \`${name}\``, true)
            }
        }
         if(detail == 1){
            about.addField(`💸Donated:`, `$\`${donated}\``, true)
         }
         if(client.profile.has(menid, "bio")){
            let bio = client.profile.get(menid, "bio")
             about.setDescription(`\> Hidden Stars Found: \`\`\`${starshow}\`\`\` Total: 5 \n ${bio}`)
         }
         if(!client.profile.has(menid, "bio")){
             about.setDescription(`\> Hidden Stars Found: \`\`\`${starshow}\`\`\` Total: 5`)
         }
         if(client.profile.has(menid, "guild")){
            if(!client.profile.get(menid, "guild") == 0){
                let guild = client.profile.get(menid, "guild")
                let name = client.guild.get(guild, "name")
                about.addField(`🏛Current Guild:`, `${name}`, true)
            }
         }
         if(client.profile.has(menid, "pets")){
             let pets = client.profile.get(menid, "pets")
             let count = pets.length
             about.addField(`🎀Pets:`, `\`${count}\`/10`, true)
         }
     
     message.channel.send(about);
    }
}