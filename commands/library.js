exports.run = (client, message, args) => {


    if(!client.profile.has(message.author.id)){
        return message.channel.send("You havent started Animelee!")
     };
     var prefix = client.config.prefix
     var books = client.profile.get(message.author.id, "books")
     const Discord = require('discord.js');

     const library = new Discord.RichEmbed()
     .setColor(`#0099ff`)
     .setTitle(`**📚Your library:**`)
     .setAuthor(message.author.username)
     .setDescription(`All your held, obtained, and gained books will go here. Use the \`${prefix}read\` command to view the contents of any book.`)
     .setThumbnail(`https://i.imgur.com/uKWioAJ.jpg`)

     for (i = 0; i < books.length; i++) {
        const book = books[i]
        const title = client.books.books[book].name
        const desc = client.books.books[book].description
        library.addField(`${i+1}. ${title}`, `${desc}` )
    }
    message.channel.send(library)
}