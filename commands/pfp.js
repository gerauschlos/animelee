exports.run = (client, message, args) => {


  if (args.length == 0) {

    const Discord = require('discord.js');

  // inside a command, event listener, etc.
  const exampleEmbed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle(message.author.username)
    .setImage(message.author.avatarURL)
    .setTimestamp()
    .setFooter(message.author.username);
  
  message.channel.send(exampleEmbed);
      }

  else if (args.length == 1) {

    if(!message.mentions.users.first()){
      return message.channel.send(`This is not a valid player!`)
  }
  
    const array = message.mentions.users.first().avatarURL

    const mentioned = message.mentions.users.first().username

    const Discord = require('discord.js');

    const pfp = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle(`${mentioned}`)
    .setImage(array)
    .setTimestamp()
    .setFooter(message.author.username)

    message.channel.send(pfp);
  }

  else {
    message.channel.send(`This is not a valid player!`)
  }
    }