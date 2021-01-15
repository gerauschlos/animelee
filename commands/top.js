exports.run = (client, message, args) => {
    if(args.length == 0){
    const filtered = client.profile.filter(p => p.gold !== 0 && p.user !=="314385179420393472" && p.user !== '617362855775305728').array();
    const sorted = filtered.sort((a, b) => b.gold - a.gold);
    const top = sorted.splice(0, 10);

    const Discord = require(`discord.js`)
    const lead = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Top 10 Gold`)
    .setDescription(`The top 10 wealthiest players in Animelee!`)
    for(let i = 0;i<top.length;i++){
        lead.addField(`**${i+1}.** ${client.users.get(top[i].user).username}`, `${top[i].gold} gold`)
    }
    message.channel.send(lead)
    }
    if(args[0] == "kills" || args[0] == "k"){
        const filtered =client.profile.filter(p => p.kills !== 0 && p.user !=="314385179420393472").array();
        const sorted = filtered.sort((a, b) => b.kills - a.kills);
        const top = sorted.splice(0, 10);
    
        const Discord = require(`discord.js`)
        const lead = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`Top 10 Kills`)
        .setDescription(`The top 10 bloodthirstiest players in Animelee!`)
        for(let i = 0;i<top.length;i++){
            lead.addField(`**${i+1}.** ${client.users.get(top[i].user).username}`, `${top[i].kills} kills`)
        }
        return message.channel.send(lead)
    }
    if(args[0] == "rank" || args[0] == "r"){
        const filtered =client.profile.filter(p => p.rank !== 0 && p.user !=="314385179420393472").array();
        const sorted = filtered.sort((a, b) => b.rank - a.rank);
        const top = sorted.splice(0, 10);
    
        const Discord = require(`discord.js`)
        const lead = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`Top 10 Player Rankings!`)
        .setDescription(`The top 10 highest ranked players in Animelee!`)
        for(let i = 0;i<top.length;i++){
            lead.addField(`**${i+1}.** ${client.users.get(top[i].user).username}`, `${top[i].rank} rank`)
        }
        message.channel.send(lead)
    }
    if(args[0] == "combat" || args[0] == "c"){
        let array = client.profile.keyArray()
        let cbarray = []
        for(i=0;i<array.length;i++){
            let prof = array[i]
            let chars = client.profile.get(prof, "characters")
            var cbt = 0
            for(i=0;i<chars.length;i++){
                let char = chars[i]
                let cb = client.characters.get(char, "Atk") + client.characters.get(char, "Matk") + client.characters.get(char, "Def") + client.characters.get(char, "Mdef") + client.characters.get(char, "Spd")
                var cbt = cbt + cb
            }
        cbarray.push(cbt)
        }
        let sorted = cbarray.sort(function(a, b){return a - b});
        let top = sorted.splice(1, 10)
        let Discord = require(`discord.js`)
        let topcb = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`Top 10 Player Combat powers!`)
        .setDescription(`The top 10 players with the highest total combat powers in Animelee!`)
        for(let i = 0;i<top.length;i++){
            topcb.addField(`**${i+1}.** Finding...`, `${top[i]} Total Combat Power`)
        }
        message.channel.send(topcb)
    }
}