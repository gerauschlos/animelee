exports.run = (client, message, args) => {
    if(client.profile.has(message.author.id)){
       return message.channel.send("you already have a profile")
    };

    const prefix = client.config.prefix
    client.profile.set(message.author.id, 100, "shards");
    client.profile.set(message.author.id, 500, "gold");
    client.profile.set(message.author.id, 0, "glimmer")
    client.profile.set(message.author.id, [], "items");
    client.profile.set(message.author.id, [], "characters");
    client.profile.set(message.author.id, [], "books")
    client.profile.set(message.author.id, [0], "quests");
    client.profile.set(message.author.id, 0, "rank")
    client.profile.set(message.author.id, 0, "kills")
    client.profile.push(message.author.id, 0, "books");
    client.profile.push(message.author.id, 1, "books");
    client.profile.set(message.author.id, 0, "questing")
    client.profile.set(message.author.id, message.author.id, "user")
    client.profile.set(message.author.id, 0, "ng")
    client.profile.set(message.author.id, 0, "record")
    client.profile.set(message.author.id, [], "daily")

    const Discord = require('discord.js');

// inside a command, event listener, etc.
    const exampleEmbed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Welcome, to Animelee!!')
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Animelee combines animee and rpg fans alike, for a unique fun-filled experience!')
    .setThumbnail(client.user.avatarURL)
    .addField('Starting', `Now that youve started on your Animelee adventure, be sure to check over \`${client.config.prefix}tutorial\`!`)
    .addField(`Story:`, `You awaken to find yourself in a bareen camp, you are unsure what you did to arrive in this area other than you had just started up a new mobile game: "Animelee".`)
    .addField('Resources:', 'You ransack the old camp for materials, being somewhat savy in how to survive in another world stories. You find 2 books, 500 gold coins, and 100 glowing shards.')
    .setImage(message.author.avatarURL)
    .setTimestamp()
    .setFooter(`To continue your Animelee journey, head over to \`${prefix}spawns\` to summon your first character!`);

  message.channel.send(exampleEmbed);
  const newquest = new Discord.RichEmbed()
  .setColor(`#0099ff`)
  .setTitle('You have a new quest!')
  .setDescription('After gathering your materials and not finding any food or water you head out in search of civilization!')
  .addField('Received quest', `"A Mysterious World"`)
  .setTimestamp()

  message.channel.send(newquest)
    }