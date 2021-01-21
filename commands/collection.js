exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }

    const Discord = require('discord.js');

    const chars = client.profile.get(message.author.id, "characters")
    let set = Array.from(new Set(chars))
    const charlength = set.length
    const prefix = client.config.prefix

    const keep = message.author.avatarURL


        const options = {
            limit: 1000 * 1000,
            min: 1,
            max: 5, // there will be 2 pages
            page: 1
        }

        var { min, max, page, limit } = options;
        const pages = {
            1: { title: `Collection Guide`, description: `Generation 1`, thumbnail: {url: `${keep}`}, fields: [{name: `${charlength}/61 Characters Collected`, value: `Use ${prefix}characters to see your characters!
            0 : Altair
            1 : Sirius
            2 : Artoria Pendragon
            3 : Magane Chikujoin
            4 : Evangelion Unit 01
            5 : Evangelion Unit 13
            6 : Nero Claudius
            7 : Sebastion Michaelis
            8 : 2B
            9 : Nezuko Kamado
            10 : Albedo
            11 : Ainz Ooal Gown
            12: Milim Nava
            13 : Mikasa Ackerman
            14 : Lupisregina Beta
            15 : Gurren Lagaan
            16 : Lelouch Lamperouge
            17 : Mai Sakurajima
            18 : Homura Akemi
            19 : Nanachi
            20 : Death the Kid
            21 : Sayaka Miki
            30 : Altair Reborn
            31 : Ghetsis
            32 : Joker
            45: Himiko Toga
            46: Naruto Uzumaki
            49: Satsuki Kiryuin
            50: Tanya Degurechaff
            53: Guts
            54: Zeref Dragneel
            55: Naofumi Iwatani
            56: Kaede Honjou
            `}, {name: "Note:", value: "*Spawnlists directly refer to this character key! Be sure to stay informed as to what characters appear in which spawns.*"}],color: 0x0099ff },
            2: {title: "Collection Guide Continued", description: "Generation 1", thumbnail: {url: `${keep}`}, fields: [{name: `${charlength}/61 Characters Collected`, value: `Use ${prefix}characters to see your characters!
            57: Kurumi Tokisaki
            58: C: Strelitzia
            59: Escanor
            60: Trevor Belmont
            61: Megumin,
            64: Yuji Itadori
            65: Yami Sukehiro
            66: Akatsuki
            67: Seiya Ryuuguuyin
            68: Hajime Nagumo
            `},{name: "Note", value: "*Spawnlists directly refer to this character key! Be sure to stay informed as to what characters appear in which spawns!"}], color: 0x0099ff},
            3: {title: "Event", description: "Characters only obtainable from events!", color: 0x0099ff, fields: [{name: "Characters may re-appear!", value: `Use ${prefix}characters to see your characters!
            22: Blair
            28: Asuna Yuuki
            29: Lazengann
            43: Padoru
            44: Christmas idol nico
            47: Maple
            48: Chris Yukine
            51: Ichigo Kurosaki
            52: Rukia Kuchiki
            62: Yuichiro Hyakuya
            63: Mikaela Hyakuya`}, {name: "Note:", value: "*Spawnlists directly refer to this character key! Be sure to stay informed as to what characteers appear in which spawns.*"}]},
            4: { title: `Expansion 1`, description: `The first Animelee expansion roster!`, color: 0x0099ff, fields: [{name: "Total: 5", value: `Use ${prefix}characters to see your characters!
            23: All for One
            24: Dio
            25: Jibril
            26: Alucard
            27: Meliodas
             `}, {name: "Note:", value: "*Spawnlists directly refer to this character key! Be sure to stay informed as to what characters appear in which spawns.*"}]},
            5: {title: "Expansion 2", description: `The second Animelee expansion roster!`, color: 0x0099ff, fields: [{name: "Total: 9", value: `Use ${prefix}characteers to see your characters!
            34: N
            35: Kaneki Ken
            36: God Yato
            37: Shichika Yasuri
            38: Issei Hyoudou
            39: Rias Gremory
            40: Saitama
            41: Goku Black
            42: Astolfo`}, {name: "Note:", value: "*Spawnlists directly refer to this character key! Be sure to stay informed as to what characters appear in which spawns.*"}]}
        }



    // inside a command, event listener, etc.

         message.channel.send({ embed: pages[options.page] }).then(sentEmbed => {
            sentEmbed.react('◀')
           .then(() => sentEmbed.react('▶'))
           .then(() => sentEmbed.react('🇽'))

           const filter = (reaction, user) => {
            return ['◀', '▶', '🇽'].includes(reaction.emoji.name) && user.id == message.author.id;
        };


        const collector = sentEmbed.createReactionCollector(filter, { time: 1500000 });

        collector.on('collect', (reaction, reactionCollector) => {
        const reacted = reaction.emoji.name

        if(reacted == `▶`) {
                if (page != max){
                page = page + 1;
                 return sentEmbed.edit({ embed: pages[page] })
        }
            else {
                message.channel.send(`This is the end of the book!`)
            }
    }
        if(reacted == '◀') {
            if (page != min) {
            page = page - 1;
            return sentEmbed.edit({ embed: pages[page] })
            .catch(console.error)
        }
            else {
                message.channel.send(`This is the first page of the book!`)
            }        
    }
        if(reacted == '🇽') {
            message.channel.send(`You have closed the collection Guide.`)
            return sentEmbed.delete();
        }
        });

        collector.on('end', collected => {
            return sentEmbed.delete();
        })
        })
}
