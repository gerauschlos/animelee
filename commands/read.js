exports.run = (client, message, args) => {

    const Discord = require('discord.js');

    const prefix = client.config.prefix

    if (args.length == 0) {
      return  message.channel.send(`You cant read the nothing! Please select the book you would like to read from your \`${prefix}library\`.`)
    }
    
    let checking = args[0];
    let books = client.profile.get(message.author.id, "books")
    if (0 < checking && checking <= books.length){
        let bookey = books[checking - 1];
        const options = {
            limit: 1000 * 1000,
            min: 1,
            max: client.books.books[bookey].pages.length, // there will be 2 pages
            page: 1
        }
        const book = client.books.books[bookey].name
        const textA = client.books.books[bookey].pages[0].text
        const textB = client.books.books[bookey].pages[1].text
        const textC = client.books.books[bookey].pages[2].text
        const textD = client.books.books[bookey].pages[3].text
        const textE = client.books.books[bookey].pages[4].text
        const textF = client.books.books[bookey].pages[5].text

        const imgA = client.books.books[bookey].pages[0].img
        const imgB = client.books.books[bookey].pages[1].img
        const imgC = client.books.books[bookey].pages[2].img
        const imgD = client.books.books[bookey].pages[3].img
        const imgE = client.books.books[bookey].pages[4].img
        const imgF = client.books.books[bookey].pages[5].img

        const titleA = client.books.books[bookey].pages[0].title
        const titleB = client.books.books[bookey].pages[1].title
        const titleC = client.books.books[bookey].pages[2].title
        const titlteD = client.books.books[bookey].pages[3].title
        const titleE = client.books.books[bookey].pages[4].title
        const titleF = client.books.books[bookey].pages[5].title

        var { min, max, page, limit } = options;
        

       const pages = {
            1: { title: titleA, description: textA, image: {url: imgA},color: 0x0099ff }, 
            2: { title: titleB, description: textB, image: {url: imgB}, color: 0x0099ff },
            3: { title: titleC, description: textC, image: {url: imgC}, color: 0x0099ff },
            4: { title: titlteD, description: textD, image: {url: imgD}, color: 0x0099ff },
            5: { title: titleE, description: textE, image: {url: imgE}, color: 0x0099ff },
            6: { title: titleF, description: textF, image: {url: imgF}, color: 0x0099ff },
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
            message.channel.send(`You have closed the book you were reading.`)
            return sentEmbed.delete();
        }
        });

        collector.on('end', collected => {
	    console.log(`Collected ${collected.size} items`);
        })
        })
}
    else {
        message.channel.send(`You do not have a book \`${checking}\`.`)
    }
}