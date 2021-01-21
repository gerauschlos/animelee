exports.run = (client, message, args) => {
    const prefix = client.config.prefix
    const max = client.units.units.length
    const number = parseInt(args[0])
        if(args.length == 0){
            return message.channel.send(`Include the character you would like to see, to view a list of all characters please see \`${prefix}collection\``)
        }
        if(args.length > 3){
            return message.channel.send(`This is not a valid character! To view a list of all characteers please see \`${prefix}collection\``)
        }
        if(number > max){
            return message.channel.send(`This is not a valid character! To view a list of all characters please see \`${prefix}collection\``)
        }
        var checking = parseInt(args[0])
        if(isNaN(args[0])){
            if(args.includes("altair")){
                var checking = 0
            }
            if(args.includes("sirius")){
                var checking = 1
            }
            if(args.includes("artoria")){
                var checking = 2
            }
            if(args.includes("magane")){
                var checking = 3
            }
            if(args.includes("eva 01")){
                var checking = 4
            }
            if(args.includes("eva 13")){
                var checking = 5
            }
            if(args.includes("nero")){
                var checking = 6
            }
            if(args.includes("sebastion")){
                var checking = 7
            }
            if(args.includes("2B")){
                var checking = 8
            }
            if(args.includes("nezuko")){
                var checking = 9
            }
            if(args.includes("albedo")){
                var checking = 10
            }
            if(args.includes("ainz")){
                var checking = 11
            }
            if(args.includes("milim")){
                var checking = 12
            }
            if(args.includes("mikasa")){
                var checking = 13
            }
            if(args.includes("lupis")){
                var checking = 14
            }
            if(args.includes("gurren")){
                var checking = 15
            }
            if(args.includes("lelouch")){
                var checking = 16
            }
            if(args.includes("mai")){
                var checking = 17
            }
            if(args.includes("homura")){
                var checking = 18
            }
            if(args.includes("nanachi")){
                var checking = 19
            }
            if(args.includes("kid")){
                var checking = 20
            }
            if(args.includes("sayaka")){
                var checking = 21
            }
            if(args.includes("blair")){
                var checking = 22
            }
            if(args.includes("asuna")){
                var checking = 28
            }
            if(args.includes("lazengann")){
                var checking = 29
            }
            if(args.includes("afo")){
                var checking = 23
            }
            if(args.includes("dio")){
                var checking = 24
            }
            if(args.includes("jibril")){
                var checking = 25
            }
            if(args.includes("alucard")){
                var checking = 26
            }
            if(args.includes("meliodas")){
                var checking = 27
            }
            if(args.includes("reborn")){
                var checking = 30
            }
            if(args.includes("ghetsis")){
                var checking = 31
            }
            if(args.includes("joker")){
                var checking = 32
            }
            if(args.includes("himiko")){
                var checking = 45
            }
            if(args.includes("naruto")){
                var checking = 46
            }
            if(args.includes("n")){
                var checking = 34
            }
            if(args.includes("kaneki")){
                var checking = 35
            } if(args.includes("yato")){
                var checking = 36
            }
            if(args.includes("shichika")){
                var checking = 37
            }
            if(args.includes("issei")){
                var checking = 38
            }
            if(args.includes("rias")){
                var checking = 39
            }
            if(args.includes("saitama")){
                var checking = 40
            }
            if(args.includes("goku")){
                var checking = 41
            }
            if(args.includes("astolfo")){
                var checking = 42
            }
            if(args.includes("padoru")){
                var checking = 43
            }
            if(args.includes("nico")){
                var checking = 44
            }
            if(args.includes("himiko")){
                var checking = 45
            }
            if(args.includes("naruto")){
                var checking = 46
            }
            if(args.includes("maple")){
                var checking = 47
            }
            if(args.includes("chris")){
                var checking = 48
            }
            if(args.includes("satsuki")){
                var checking = 49
            }
            if(args.includes("tanya")){
                var checking = 50
            }
            if(args.includes("ichigo")){
                var checking = 51
            }
            if(args.includes("rukia")){
                var checking = 52
            }
            if(args.includes("guts")){
                var checking = 53
            }
            if(args.includes("zeref")){
                var checking = 54
            }
            if(args.includes("naofumi")){
                var checking = 55
            }
            if(args.includes("kaede")){
                var checking = 56
            }
            if(args.includes("kurumi")){
                var checking = 57
            }
            if(args.includes("strelitzia")){
                var checking = 58
            }
            if(args.includes("escanor")){
                var checking = 59
            }
            if(args.includes("trevor")){
                var checking = 60
            }
            if(args.includes("megumin")){
                var checking = 61
            }
            if(args.includes("yuichiro")){
                var checking = 62
            }
            if(args.includes("mikaela")){
                var checking = 63
            }
            if(args.includes("yuji")){
                var checking = 64
            }
            if(args.includes("yami")){
                var checking = 65
            }
            if(args.includes("akatsuki")){
                var checking = 66
            }
            if(args.includes("seiya")){
                var checking = 67
            }
            if(args.includes("hajime")){
                var checking = 68
            }
        }
        if (0 <= checking && checking <= max){
            let charkey = client.units.units[checking]
    
            const name = charkey.name
            const Hp = charkey.hp
            const Atk = charkey.atk
            const Matk = charkey.matk
            const Def = charkey.def
            const Mdef = charkey.mdef
            const Spd = charkey.spd

            var gender = charkey.gender
            if(isNaN(gender)){
                var gender = parseInt(gender)
            }
            if(gender == 1){
                var gendershow = 'Male'
            }
            if(gender == 2){
                var gendershow = 'Female'
            }
            if(gender == 3){
                var gendershow = 'Other'
            }

            let total = Atk + Matk + Def + Mdef + Spd
    
            const Discord = require('discord.js');
            const exampleEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle(`⚔️${name}⚔️`)
            .setDescription(charkey.description)
            .setImage(charkey.image)
            if(args[1] == 'g'){
                exampleEmbed.setImage(charkey.gimg)
                exampleEmbed.setColor(`#55ff55`)
                exampleEmbed.setThumbnail(`https://i.imgur.com/77ZicIS.gif`)
            }
            exampleEmbed.addField(`Series origin:`, `${charkey.series}`)
            exampleEmbed.addField(`Gender: ${gendershow}`, `Total Stats (All roles 1.00): \`${total}\``)
            exampleEmbed.addField(`Health:`, `\`\`\`${Hp}\`\`\``, true)
            exampleEmbed.addField(`Speed:`, `\`\`\`${Spd}\`\`\``, true)
            exampleEmbed.addField(`Attack:`, `\`\`\`${Atk}\`\`\``, true)
            exampleEmbed.addField(`Magic Attack:`, `\`\`\`${Matk}\`\`\``, true )
            exampleEmbed.addField(`Defense:`, `\`\`\`${Def}\`\`\``, true)
            exampleEmbed.addField(`Magic Defense:`, `\`\`\`${Mdef}\`\`\``, true)
            exampleEmbed.addField(`Abilities:`, `${charkey.abilities[0].name}, ${charkey.abilities[1].name}, ${charkey.abilities[2].name} `)
            exampleEmbed.setTimestamp()
            exampleEmbed.setFooter(`Collection number: ${checking}.`)
          
          message.channel.send(exampleEmbed);
        }

        
        
}