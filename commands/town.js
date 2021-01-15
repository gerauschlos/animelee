exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    let rank = client.profile.get(message.author.id, "rank")
    if(rank < 100){
        return message.channel.send(`You have not unlocked town features yet!`)
    }
    if(!client.towns.has(message.author.id)){
        return message.channel.send(`Your town has not been built!`)
    }
    var shrine = `Abandoned shrine`
    var store = `Abandoned Store`
    let miko = client.towns.get(message.author.id, "miko")
    var storecheck = client.towns.get(message.author.id, "store")
    if(miko > 0){
        var shrine = 'Great Hana Shrine'
    }
    if(storecheck > 0){
        var store = `Luxary Boutiques`
    }
    let town = client.towns.get(message.author.id)
    let Discord = require(`discord.js`)
    let towne = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Your Town`)
    .setDescription(`Towns are upgradable home bases, featuring npc's, places, and many more options!`)
    .setThumbnail(message.author.avatarURL)
    .addField(`Town Level: ${client.towns.get(message.author.id, "lvl")}`, `Incoming raids: 🎴`)
    .addField(`**Options:**`, `⛩️${shrine} | \`${client.towns.get(message.author.id, "rep")}\` Reputation \n🕌${store} \n🏦Town Bank | \`${client.towns.get(message.author.id, "bank")}\` gold \n🏢Character Hotel | \`${client.towns.get(message.author.id, "hotel").length}\`/150\n🕋Petcare | \`${client.towns.get(message.author.id, "petcare").length}\`/50 \n🏔️Mine | Lvl \`${client.towns.get(message.author.id, "mine")}\` \n🏯Gallery | \`0\`/50 \n🎋Garden | \`${client.towns.get(message.author.id, "plants").length}\`/15 \n \n⏫Upgrade Town: \`${(client.towns.get(message.author.id, "lvl") + 1) * 5000}\` gold`)
    .setImage(`https://i.imgur.com/wp3Ib4n.png`)
    .setFooter(`React with the appropriate option to continue.`)
    message.channel.send(towne).then(sentEmbed => {
        sentEmbed.react('⛩️')
        .then(() => sentEmbed.react('🕌'))
        .then(() => sentEmbed.react('🏦'))
        .then(() => sentEmbed.react('🏢'))
        .then(() => sentEmbed.react('🕋'))
        .then(() => sentEmbed.react('🏔️'))
        .then(() => sentEmbed.react('🏯'))
        .then(() => sentEmbed.react('🎋'))
        .then(() => sentEmbed.react(`⏫`))

        var filter = (reaction, user) => {
            return ['⛩️', '🕌', '🏦', '🏢', '🕋', '🏔️', '🏯', '🎋', '⏫'].includes(reaction.emoji.name) && user.id == message.author.id;
        };
        var collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
        collector.on('collect', (reaction, reactionCollector) => {
            var reacted = reaction.emoji.name

            if(reacted == '🕌'){
                if(storecheck == 0){
                    return message.channel.send(`You find an empty store, abandoned for some time now.`)
                }
                else{
                    let selling = [0,1,2,3,4,5,7,8,9]
                    client.battles.set(message.channel.id, message.author.id, "store")
                    let boutiques = new Discord.RichEmbed()
                    .setColor(`#ffff00`)
                    .setTitle(`The Luxary Boutiques`)
                    .setDescription(`The more permanent residence of the Baron!`)
                    .setThumbnail(`https://i.imgur.com/a17ul4F.gif`)
                    .addField(`Use !buy to purchase any goods while in the shop.`, `Held Gold: ${client.profile.get(message.author.id, "gold")}`)
                    for(i = 0; i < selling.length; i++){
                        var iteml = selling[i]
                        var item = client.items.items[iteml]
                        boutiques.addField(`${i+ 1}. \`${item.price}\` gold.`, `${item.name}`)
                    }
                    boutiques.addField(`Options:`, `1️⃣ | Offer Rock-Encrusted Coin \n2️⃣ | Talk`)
                    boutiques.setFooter(`You can leave the town at any time with !exit.`)
                    message.channel.send(boutiques).then(sentEmbed => {
                        sentEmbed.react('1️⃣')
                        .then(() => sentEmbed.react('2️⃣'))

                        var filter = (reaction, user) => {
                            return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
                        };
                        var collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                        collector.on('collect', (reaction, reactionCollector) => {
                            var reacted = reaction.emoji.name

                        if(reacted == '1️⃣'){
                            client.battles.delete(message.channel.id)
                            client.battles.set(message.channel.id, message.author.id, "boutique")
                            let rocke = new Discord.RichEmbed()
                            .setColor(`#9559f0`)
                            .setTitle(`Rock-Encrusted Coin Exchange.`)
                            .setThumbnail(`https://i.imgur.com/a17ul4F.gif`)
                            .setDescription(`The baron has only seen coins like this once before, hell buy them for you whatever it takes.`)
                            .addField(`Duplications:`, `1. 10000 coins: Catalyst of Chosen Character. \n2. 5000 coins: Quest Bypass.`)
                            .addField(`Characters:`, `1. 7000 coins: Tio Klaurus. \n2. 5000 coins: Alphonse Elric.`)
                            .addField(`Materials:`, `1. 25 coins: 20 Any Material. \n2. 50 coins: 50 Any Material.`)
                            .addField(`Items:`, `1. 200 coins: Healing Potion M. \n2. 100 coins: Illusonary Prism. \n3. 50 coins: 10 Shards.`)
                            .setFooter(`To exit from the boutique use !exit at any time.`)
                            message.channel.send(rocke)
                        }
                        if(reacted == '2️⃣'){
                            if(client.profile.has(message.author.id, "record")){
                                if(client.profile.get(message.author.id, "record") > 0){
                                    client.towns.set(message.author.id, 2, "store")
                                }
                            }
                            let phase = client.towns.get(message.author.id, "store")
                            if(phase == 3){
                                var dia = client.npc.npcs[2].line2
                            }
                            else{
                            var dia = client.npc.npcs[0].dialogue[phase].line1}
                            let talkstore = new Discord.RichEmbed()
                            .setColor(`#0099ff`)
                            .setTitle(`Barron Eisflen`)
                            .setDescription(`${dia}`)
                            .setThumbnail(`https://i.imgur.com/a17ul4F.gif`)
                            .setFooter(`Use !town to return to town, or !exit.`)
                            if(phase == 2){
                                talkstore.addField(`Options:`, `1️⃣| Refuse \n 2️⃣| Offer 10% of held shards`)
                            }
                            message.channel.send(talkstore).then(sentEmbed => {
                                sentEmbed.react(`1️⃣`)
                                .then(() => sentEmbed.react(`2️⃣`))
                                var filter = (reaction, user) => {
                                    return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
                                }
                                var collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                                collector.on(`collect`, (reaction, reactionCollector) => {
                                    var reacted = reaction.emoji.name
                                    if(reacted == '1️⃣'){
                                        let storerefuse = new Discord.RichEmbed()
                                        .setColor(`#0099ff`)
                                        .setTitle(`Barron Eisflen`)
                                        .setDescription(`Oh i see.. well, what a shame.`)
                                        .setFooter(`The Barron will Remember that.`)
                                        .setThumbnail(`https://i.imgur.com/a17ul4F.gif`)
                                        client.towns.set(message.author.id, 3, "store")
                                        message.channel.send(storerefuse)
                                    }
                                })
                            })
                        }
                    })
                    })
                }
            }
            else if(reacted == '⛩️'){
                let miko = client.towns.get(message.author.id, "miko")
                if(miko == 0){
                    let ashrine = new Discord.RichEmbed()
                    .setTitle(`The abandoned Town Shrine.`)
                    .setImage(`https://i.imgur.com/BtQ3jIz.gif`)
                    .setDescription(`Said to be shrubbed in Sakura always in bloom, the shrine patiently awaits a host.`)
                    .setFooter(`Return a shrine maiden to the shrine to access shrine features.`)
                    return message.channel.send(ashrine)
                }
                else{
                    let tonext = client.towns.get(message.author.id, "pray")
                    let now = Date.now()
                    let dif = tonext - now
                    var left = Math.round(dif/3600000)
                    if(dif < 0){
                        var left = 0
                    }
                    let rep = client.towns.get(message.author.id, "rep")
                    let bshrine = new Discord.RichEmbed()
                    .setColor(`#ff69b4`)
                    .setTitle(`Great Hana Shrine`)
                    .setDescription(`The rejuvinated shrine offers a wide host of spiritual and physical treatment.`)
                    .setImage(`https://i.imgur.com/BtQ3jIz.gif`)
                    .setThumbnail(`https://i.imgur.com/9WPQnwN.png`)
                    .addField(`Your Reputation: ${rep}`, `Time till next pray: ${left} Hours.`)
                    .addField(`Options:`, `1️⃣ | Pray at Shrine \n2️⃣ | Talk`)
                    .setFooter(`You can use !town to return, or !exit to leave.`)
                    message.channel.send(bshrine).then(sentEmbed => {
                        sentEmbed.react('1️⃣')
                        .then(() => sentEmbed.react('2️⃣'))

                        var filter = (reaction, user) => {
                            return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
                        };
                        var collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                        collector.on('collect', (reaction, reactionCollector) => {
                            var reacted = reaction.emoji.name

                            if(reacted == '1️⃣'){
                                if(client.towns.get(message.author.id, "pray") > Date.now()){
                                    return message.channel.send(`You cannot pray again so soon!`)
                                }
                                else{
                                    let lvl = client.towns.get(message.author.id, "lvl")
                                    let repgain = (lvl + 1) * 10
                                    let expgain = (lvl + 1) * 100
                                    let characters = client.profile.get(message.author.id, "characters")
                                    for(i = 0; i < characters.length; i++){
                                        let char = characters[i]
                                        client.characters.set(char, 100, "Health")
                                        client.characters.math(char, "+", expgain, "Exp")
                                    }
                                    client.towns.math(message.author.id, "+", repgain, "rep")
                                    client.towns.set(message.author.id, now, "pray")
                                    client.towns.math(message.author.id, "+", 86400000, "pray")
                                    let pray = new Discord.RichEmbed()
                                    .setColor(`#ff69b4`)
                                    .setTitle(`You prayed at the Shrine!`)
                                    .setDescription(`The trees shake to the rising wind, the petals gently rest on the ground around you.`)
                                    .addField(`Reputation Increased! +${repgain}`, `All characters have been healed, and gained ${expgain} Exp!`)
                                    .setThumbnail(`https://i.imgur.com/JjpkCds.gif`)
                                    .setImage(`https://i.imgur.com/lcWANbm.gif`)
                                    .setFooter(`Prayer can be preformed once again in 24 Hours.`)
                                    return message.channel.send(pray)
                                }
                            }
                            else if(reacted == '2️⃣'){
                                let desc = client.npc.npcs[1].dialogue[miko].line1
                                let maiden = new Discord.RichEmbed()
                                .setColor(`#f56c62`)
                                .setTitle(`Miko of Valir`)
                                .setDescription(`${desc}`)
                                .setThumbnail(`https://i.imgur.com/9WPQnwN.png`)
                                .setFooter(`Use !town to return to town, or !exit.`)

                                return message.channel.send(maiden)
                            }
                        })
                    })
                }
            }
            else if(reacted == '🏦'){
                let loan = client.towns.get(message.author.id, "loan")
                let loandue = Math.round(client.towns.get(message.author.id, "banknext") / 86400000)
                let bank = new Discord.RichEmbed()
                .setColor(`#ffffff`)
                .setTitle(`Town Bank`)
                .setDescription(`The town bank will loan you gold, or hold onto deposites for safe-keeping.`)
                .setThumbnail(`https://i.imgur.com/ixhhwDW.png`)
                if(loan !== 0){
                    bank.addField(`⚠️**Warning, you have an outstanding loan due, it will be deducted from your balance in ${loandue} days, if you do not have enough money in your balance you will lose reputation!**⚠️`)
                }
                bank.addField(`Balance:`, `\`\`\`${client.towns.get(message.author.id, "bank")}\`\`\``)
                bank.addField(`Options:`, `1️⃣ | Deposit/Withdrawl Money \n2️⃣ | View Loans`)
                bank.setFooter(`You can !town to return to town or !exit.`)

                message.channel.send(bank).then(sentEmbed => {
                    sentEmbed.react('1️⃣')
                    .then(() => sentEmbed.react('2️⃣'))

                    var filter = (reaction, user) => {
                        return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
                    };
                    var collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                    collector.on('collect', (reaction, reactionCollector) => {
                        var reacted = reaction.emoji.name

                        if(reacted == '1️⃣'){
                            client.battles.delete(message.channel.id)
                            client.battles.set(message.channel.id, message.author.id, "vault")
                            let vault = new Discord.RichEmbed()
                            .setTitle(`${message.author.username}'s Bank Vault`)
                            .setColor(`#ffffff`)
                            .setDescription(`You can now use !dep and !with to remove and add money to your account!`)
                            .setThumbnail(`https://i.imgur.com/yxQ62kG.jpg`)
                            .addField(`Current Balance:`, `\`\`\`${client.towns.get(message.author.id, "bank")}\`\`\``)
                            .setFooter(`You can use !town to return or !exit.`)

                           return message.channel.send(vault)
                        }
                        else if(reacted == '2️⃣'){
                            if(loan !== 0){
                                return message.channel.send(`You cannot take out a loan when one is already due!`)
                            }
                            let loan1 = Math.round((client.towns.get(message.author.id, "lvl") + 1) * ((client.towns.get(message.author.id, "rep") + 1) * 100))
                            let time1 = 7

                            let loan2 = Math.round((client.towns.get(message.author.id, "lvl") + 1) * ((client.towns.get(message.author.id, "rep") + 5) * 100))
                            let time2 = 14 

                            let loan3 = Math.round((client.towns.get(message.author.id, "lvl") + 1) * ((client.towns.get(message.author.id, "rep") + 10) * 100))
                            let time3 = 30

                            let loane = new Discord.RichEmbed()
                            .setColor(`#ffffff`)
                            .setTitle(`Your Available Loans`)
                            .setDescription(`Loans will be taken out of your bank balance automatically once the time has passed, be sure you have enough by then!`)
                            .addField(`Available loans:`, `1️⃣ | \`${loan1}\` due by ${time1} days. \n2️⃣ | \`${loan2}\` due by ${time2} days \n3️⃣ | \`${loan3}\` due by ${time3} days `)
                            .setThumbnail(`https://i.imgur.com/ixhhwDW.png`)
                            .setFooter(`You can use !town to return or !exit.`)

                            return message.channel.send(loane)

                        }

                    })
                })
            }
            else if(reacted == '🏢'){
                let res = client.towns.get(message.author.id, "hotel")
                let vaca = 150 - res.length
                let gain = Math.round((client.towns.get(message.author.id, "lvl") + 1) * 150)
                let hotel = new Discord.RichEmbed()
                .setColor(`#7aff8c`)
                .setTitle(`Town Character Hotel`)
                .setDescription(`The character hotel allows you to store unused characters while still alowing them to gain exp.`)
                .addField(`\`${vaca}\`/150 Rooms Available.`, `Exp gain: \`${gain}\``)
                .addField(`Options:`, `1️⃣ | View Residence`)
                .setFooter(`You can use !town to return or !exit.`)
                .setThumbnail(`https://i.imgur.com/jjLVSBn.jpg`)
                message.channel.send(hotel).then(sentEmbed => {
                    sentEmbed.react('1️⃣')

                    var filter = (reaction, user) => {
                        return ['1️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
                    };
                    var collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                    collector.on('collect', (reaction, reactionCollector) => {
                        var reacted = reaction.emoji.name

                        if(reacted == '1️⃣'){
                            let size = 25;let arrayOfArrays=[];
                            for(let i = 0;i<res.length;i+=size){
                            arrayOfArrays.push(res.slice(i, i+size));
                            }
                            let rooms = new Discord.RichEmbed()
                            .setColor(`#7aff8c`)
                            .setTitle(`Your Rooms`)
                            .setThumbnail(`https://i.imgur.com/jjLVSBn.jpg`)
                            .setDescription(`From here you are able to take back characters into your inventory by using !checkout and !checkin.`)
                            .setFooter(`You can use !town to return or !exit.`)
                            for(i = 0; i < arrayOfArrays.length; i++){
                                var using = arrayOfArrays[i]
                                var wing = i
                                var array = []
                                for(i = 0; i < using.length; i++){
                                    let char = using[i]
                                    let name = client.characters.get(char, "Name")
                                    let pos = i + (wing * 50) + 1
                                    let topush = `${pos}.\`${name}\``
                                    array.push(topush)
                                }
                                let arrayshow = array.join(" | ")
                                rooms.addField(`Wing ${wing + 1}:`, `${arrayshow}`)
                            }
                            message.channel.send(rooms)
                        }
                    })
                })
            }
            else if(reacted == '🕋'){
                let pets = client.towns.get(message.author.id, "petcare")
                let vac = 40 - pets
                let petcare = new Discord.RichEmbed()
                .setColor(`#fc9700`)
                .setTitle(`Town Petcare`)
                .setDescription(`Petcare will hold onto your pet, and give it exp based on level.`)
                .addField(`Gainable Exp: ${client.towns.get(message.author.id, "lvl") + 1}`, `Vacancy: \`${vac}\`/40`)
                .addField(`Options:`, `1️⃣ | View Care.`)
                .setFooter(`You can use !town to return or !exit.`)
                .setImage(`https://i.imgur.com/EF74LDZ.png`)
                message.channel.send(petcare).then(sentEmbed => {
                    sentEmbed.react('1️⃣')

                    var filter = (reaction, user) => {
                        return ['1️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
                    };
                    var collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                    collector.on('collect', (reaction, reactionCollector) => {
                        var reacted = reaction.emoji.name

                        if(reacted == '1️⃣'){
                            let size = 20;let arrayOfArrays=[];
                            for(let i = 0;i<pets.length;i+=size){
                            arrayOfArrays.push(pets.slice(i, i+size));
                            }
                            client.battles.delete(message.channel.id)
                            client.battles.set(message.channel.id, message.author.id, "petcare")
                            let petcares = new Discord.RichEmbed()
                            .setColor(`#fc9700`)
                            .setTitle(`Your Stored Pets`)
                            .setDescription(`Here are where your stored pets are kept.`)
                            .addField(`You can now use !checkin and !checkout to take or deposit pets here.`, `Vacancy: \`${vac}\`/40`)
                            .setThumbnail(`https://i.imgur.com/EF74LDZ.png`)
                            .setFooter(`You can use !town to return or !exit.`)
                            for(i = 0; i < arrayOfArrays.length; i++){
                                var using = arrayOfArrays[i]
                                var wing = i
                                var array = []
                                for(i = 0; i < using.length; i++){
                                    let pet = using[i]
                                    let name = client.pets.get(pet, "name")
                                    let pos = i + (wing * 20) + 1
                                    let topush = `${pos}.\`${name}\``
                                    array.push(topush)
                                }
                                let arrayshow = array.join(" | ")
                                petcares.addField(`Pen: ${wing + 1}:`, `${arrayshow}`)
                            }
                            message.channel.send(petcares)
                        }
                    })
                    })
            }
            else if(reacted == '🏔️'){
                let mine = client.towns.get(message.author.id, "mine")
                let now = Date.now()
                let minenext = client.towns.get(message.author.id, "minenext")
                let gaing = (mine +  1) * 1000
                let schance = Math.round(10/(100 - (mine * 10)) * 100) / 100
                let shards = (mine + 1) * 5
                let cost = Math.round((mine + 1) * 1500)
                let costg = mine + 1
                let mines = new Discord.RichEmbed()
                .setColor(`#691f2d`)
                .setTitle(`Town Outskirts Mine`)
                .setDescription(`The mine allows for gradual accumulation of gold, with rare chances at shards.`)
                .addField(`Mine Level:`, `\`\`\`${mine}\`\`\``)
                .addField(`Upgrade cost: ${cost} gold`, `${costg} glimmer`)
                .addField(`Options:`, `1️⃣ | Begin Mining \n2️⃣ | Upgrade Mine`)
                .setImage(`https://i.imgur.com/HkRzaL2.png`)
                .setFooter(`You can use !town to return or !exit.`)
                message.channel.send(mines).then(sentEmbed => {
                    sentEmbed.react('1️⃣')
                    .then(() => sentEmbed.react('2️⃣'))

                    var filter = (reaction, user) => {
                        return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
                    };
                    var collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                    collector.on('collect', (reaction, reactionCollector) => {
                        var reacted = reaction.emoji.name

                        if(reacted == '1️⃣'){
                            if(minenext > now){
                                return message.channel.send(`You cannot mine again so soon!`)
                            }
                            let minestart = new Discord.RichEmbed()
                            .setColor(`#691f2d`)
                            .setTitle(`Begin Mining?`)
                            .setDescription(`Mining allows you to recieve gold with a low chance of shards in 12 hours!`)
                            .addField(`Max gold gain: ${gaing}`, `Shard Chance: ${schance} for \`${shards}\` Shards.`)
                            .addField(`Options:`, `1️⃣ | Start`)
                            .setThumbnail(`https://i.imgur.com/HkRzaL2.png`)
                            .setFooter(`You can use !town to return or !exit.`)
                            message.channel.send(minestart).then(sentEmbed => {
                                sentEmbed.react('1️⃣')
            
                                var filter = (reaction, user) => {
                                    return ['1️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
                                };
                                var collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                                collector.on('collect', (reaction, reactionCollector) => {
                                    var reacted = reaction.emoji.name

                                    if(reacted == '1️⃣'){
                                        client.towns.set(message.author.id, now, "minenext")
                                        client.towns.math(message.author.id, "+", 43200000, "minenext")
                                        message.channel.send(`Mining Started! `)
                                        setTimeout(() => {
                                            let check = Math.round(Math.random() * 100)
                                            let returnm = new Discord.RichEmbed()
                                            .setColor(`#691f2d`)
                                            .setTitle(`Your miners have returned!`)
                                            .setDescription(`You have gained ${gaing} gold!`)
                                            .setThumbnail(`https://i.imgur.com/HkRzaL2.png`)
                                            .setFooter(`Mining Can now be preformed again!`)
                                            if(check < (mine + 1) * 10){
                                                returnm.addField(`Bonus reward found!`, `${shards} Shards.`)
                                                client.profile.math(message.author.id, "+", shards, "shards")
                                            }
                                            client.profile.math(message.author.id, "+", gaing, "gold")
                                            const user = client.users.find(user =>user.id === message.author.id)
                                            user.send(returnm)
                                        }, 43200000);
                                    }
                                })
                            })
                        }
                        else if(reacted == '2️⃣'){
                            if(client.profile.get(message.author.id, "gold") < cost){
                                return message.channel.send(`You do not have enough gold to upgrade your mine.`)
                            }
                            if(client.profile.get(message.author.id, "glimmer") < costg){
                                return message.channel.send(`You do not have enough glimmer to upgrade your mine.`)
                            }
                            else{
                                client.profile.math(message.author.id, "-", cost, "gold")
                                client.profile.math(message.author.id, "-", costg, "glimmer")
                                client.towns.math(message.author.id, "+", 1, "mine")

                                message.channel.send(`Mine Upgraded!`)
                            }
                        }
                    })
                })
            }
            else if(reacted == '🏯'){
                let gal = client.towns.get(message.author.id, "display")
                let size = 25;let arrayOfArrays=[];
                for(let i = 0;i<gal.length;i+=size){
                arrayOfArrays.push(gal.slice(i, i+size));
                }
                let gallery = new Discord.RichEmbed()
                .setColor(`#3bed97`)
                .setTitle(`Your Gallery!`)
                .setDescription(`Your gallery is where your achievement items will automatically go when collected!`)
                .setFooter(`You can use !town to return or !exit.`)
                .setImage(`https://i.imgur.com/2fPegQT.png?1`)
                for(i = 0; i < arrayOfArrays.length; i++){
                    let array = arrayOfArrays[i]
                    let Shelf = i + 1
                    let show = []
                    for(i = 0; i < array.length; i++){
                        let item = array[i]
                        let name = client.items.items[item].name
                        show.push(name)
                    }
                    let showshow = show.join(" | ")
                    gallery.addField(`Shelf: ${Shelf}`, `\`\`\`${showshow}\`\`\``)
                }
                message.channel.send(gallery)
            }
            else if(reacted == '🎋'){
                let garden = client.towns.get(message.author.id, "plants")
                let array = []
                let gardene = new Discord.RichEmbed()
                .setColor(`#005c2f`)
                .setTitle(`Your Garden`)
                .setDescription(`Collect plants found throughout !explore for yoyr garden!`)
                .setFooter(`You can use !town to return or !exit.`)
                .setImage(`https://i.imgur.com/urVdJBG.png`)
                for(i = 0; i < garden.length; i++){
                    let plant = garden[i]
                    let name = client.items.plants[plant].emote
                    array.push(name)
                }
                let show = array.join(" | ")
                gardene.addField(`Garden:`, `\`${show}\``)
                message.channel.send(gardene)
            }
            else if(reacted == '⏫'){
                let updrage = new Discord.RichEmbed()
                .setColor(`#0099ff`)
                .setTitle(`Town Upgrade options`)
                .setDescription(`Use these options to change and customize your town!`)
                .addField(`Options:`, `1️⃣ | Upgrade town \n2️⃣ | Set Town Description `)
                .setFooter(`You can use !town to return or !exit.`)
                .setThumbnail(`https://i.imgur.com/wp3Ib4n.png`)
                .setAuthor(message.author.username, message.author.avatarURL)
                message.channel.send(updrage).then(sentEmbed => {
                    sentEmbed.react('1️⃣')
                    .then(() => sentEmbed.react('2️⃣'))


                    var filter = (reaction, user) => {
                        return ['1️⃣','2️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
                    };
                    var collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                    collector.on('collect', (reaction, reactionCollector) => {
                        var reacted = reaction.emoji.name

                    if(reacted == '1️⃣'){
                        var cost = (client.towns.get(message.author.id, "lvl") + 1) * 5000
                        let upgrade = new Discord.RichEmbed()
                        .setColor(`#0099ff`)
                        .setTitle(`Town-wide upgrade`)
                        .setDescription(`Town upgrades increase your ability to do things within the town!`)
                        .addField(`Next upgrade ${client.towns.get(message.author.id, "lvl") + 1}`, `Cost: ${cost} gold.`)
                        .addField(`Options:`, `1️⃣ | Complete upgrade`)
                        .setFooter(`You can use !town to return or !exit.`)
                        .setThumbnail(`https://i.imgur.com/wp3Ib4n.png`)
                        message.channel.send(upgrade).then(sentEmbed => {
                            sentEmbed.react('1️⃣')

                            var filter = (reaction, user) => {
                                return ['1️⃣'].includes(reaction.emoji.name) && user.id == message.author.id;
                            };
                            var collector = sentEmbed.createReactionCollector(filter, { time: 150000 });
                        collector.on('collect', (reaction, reactionCollector) => {
                        var reacted = reaction.emoji.name

                        if(reacted == '1️⃣'){
                            if(client.profile.get(message.author.id, "gold") < cost){
                                return message.channel.send(`You cannot afford this upgrade!`)
                            }
                            client.profile.math(message.author.id, "-", cost, "gold")
                            client.towns.math(message.author.id, "+", 1, "lvl")
                            return message.channel.send(`Your town is now level ${client.towns.get(message.author.id, "lvl")}`)
                        }

                        })
                        })
                    }
        })
        })
    }
        })
    })
}