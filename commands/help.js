exports.run = (client, message, args) => {


  const Discord = require('discord.js');

  const prefix = client.config.prefix
  if(args.length == 0){
  // inside a command, event listener, etc.
  const exampleEmbed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Bot Help!')
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('A basic command rundown')
    .setThumbnail('https://i.imgur.com/RPzIIwR.png?2')
    .addField('**__User Profile Commands__**', `\`${prefix}help profile\` for your user profile commands!`)
    .addField('**__Battle commands__**', `\`${prefix}help battle\` for battle commands!`)
    .addField(`**__Spawn commands__**`, `\`${prefix}help spawns\` for spawn help and commands!`)
    .addField(`**__Economy Commands__**`, `\`${prefix}help econ\` for economy command help and list!`)
    .addField(`**__Story Commands__**`, `\`${prefix}help story\` for story command help and list!`)
    .addField(`**__Questing commands__**`, `\`${prefix}help quests\` for questing commands!`)
    .addField(`**__Guild Commands__**`, `\`${prefix}help guild\` for guild commands!`)
    .addField(`**__Expedition Help__**`, `\`${prefix}help exped\` for expedition commands!`)
    .addField(`**__Rarity Help__**`, `\`${prefix}help rarity\` for rarity help!`)
    .addField(`**__Other__**`, `\`${prefix}help other\` for commands not found in the other categories.`)
    .setTimestamp()
    .setFooter(message.author.username);
  
  message.channel.send(exampleEmbed);
      }

  if(args[0] == "profile" || args[0] == "Profile"){
    const profilehelp = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Profile Help!`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`For viewing your own and others profiles!`)
    .addField(`**${prefix}pf**`, `This command will display the profile for you or the mentioned player!`)
    .addField(`**${prefix}bal**`, `This command will display the amount of each currency you currently own!`)
    .addField(`**${prefix}pfp**`, `This will display your or the mentioned players profile pictures/ avatars.`)
    .addField(`**${prefix}characters**`, `This will show you the characters you have!`)
    .addField(`**${prefix}charinfo**`, `This will show you the info of one of your held characters, usage: \`${prefix}charinfo [#of character]\``)
    .addField(`**${prefix}chose**`, `This will set the chosen character as the default for battles, quests, and exp gains, usage: \`${prefix}chose [#of character]\``)
    .addField(`**${prefix}info**`, `This will display the stats and info for your currently chosen character.`)
    .addField(`**${prefix}fav**`, `This sets the selected character as your "favorite" it will be displayed in your characters page and profile, usage: \`${prefix}fav [#of character]\``)
    .addField(`**${prefix}toggledetail**`, `Toggles character details from appearing in !characters.`)
    .addField(`**${prefix}toggledonated**`, `Toggles donated amount from appearing on the person profile.`)
    .addField(`**${prefix}team**`, `Will display a player's team.`)
    .addField(`**${prefix}teamset**`, `Allows you to change the characters on your team. Usage: !teamset [character] [slot, 1 - 3]`)
    .addField(`**${prefix}pouch**`, `Shows the held passives of the player.`)
    message.channel.send(profilehelp)
  } 

  if(args[0] == "spawns" || args[0] == "Spawns"){
    const spawnhelp = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Spawn help!`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`For spawning and viewing spawns!`)
    .addField(`**${prefix}spawns**`, `This will display all the spawns currently available to pursue!`)
    .addField(`**${prefix}spawn**`, `This will preform the selected spawn, usage: \`${prefix}spawn [name or first letter of the spawn]\``)
    .addField(`**${prefix}spawninfo**`, `This will display the information for the spawn, all characters available in it, etc`)
    .addField(`**${prefix}claims**`, `If an event spawn streak of 10 is achieved, will allow you to claim a free character from within the spawn.`)

    message.channel.send(spawnhelp)
  }

  if(args[0] == "econ" || args[0] == "Econ"){
    const econhelp = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Economy Help!`)
    .setAuthor(message.author.usrname, message.author.avatarURL)
    .setDescription(`For paying, buying, and giving currency!`)
    .addField(`**${prefix}bal**`, `This command will display the amount of each currency you currently own!`)
    .addField(`**${prefix}pay**`, `This command will give the mentioned player the specified amount of gold, usage: \`${prefix}pay [@player] [amount] [currency]\``)
    .addField(`**${prefix}dis**`, `This will dismantle the selected character, replacing them with 50 shards in the inventory of the owner, usage: \`${prefix}dis [#of character]\``)
    .addField(`**${prefix}give**`, `This will give the mentioned player the character you sepcify, aslong as it isnt favorited or chosen.`)
    .addField(`**${prefix}trade**`, `Trades the chosen character with the mentioned player's.`)
    .addField(`**${prefix}store**`, `Will display the item store.`)
    .addField(`**${prefix}buy**`, `For buying items from the store!`)
    .addField(`**${prefix}use**`, `Aslong as item is consumable, will use its effect.`)
    .addField(`**${prefix}buyp**`, `For buying pets from the !petshop.`)

    message.channel.send(econhelp)
  }

  if(args[0] == "story" || args[0] == "Story"){ 
    const storyhelp = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Story help!`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`For learning more about the story, enemies, and characters of Animelee`)
    .addField(`**${prefix}library**`, `This will display all available books in your collection!`)
    .addField(`**${prefix}read**`, `This will allow you to read the books in your library. Usage: \`${prefix}read [#of book]\``)
    .addField(`**${prefix}necro**`, `Will display lists of all enemies in the bot.`)
    .addField(`**${prefix}viewn**`, `Will display the stats for the indicated monster, as listed in \`${prefix}necro\``)

    message.channel.send(storyhelp)
  }

  if(args[0] == "battle" || args[0] == "Battle"){
    const battlehelp = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Battle help!`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`For learning about the combat, quests, and PvP of Animelee`)
    .addField(`**${prefix}attack**`, `This will attack any monster currently spawned in the channel! Usage: \`${prefix}attack [attack #(1 - 3)]\``)
    .addField(`**${prefix}attacks**`, `Displays all the attacks available for your character.`)
    .addField(`**${prefix}exit**`, `This will exit the current battle from the channel.`)
    .addField(`**${prefix}heal**`, `If you have a health potion in your inventory, this will use the weakest one on your chosen character!`)
    .addField(`**${prefix}challenge`, `This will challenge the mentioned player to a 1v1.`)
    message.channel.send(battlehelp)
  }

  if(args[0] == "quests" || args[0] == "Quests"){
    const questhelp = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Quest help!`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`For embarking, completing, and continuing quests`)
    .addField(`**${prefix}quests**`, `Will display available quests!`)
    .addField(`**${prefix}embark**`, `For embarking on the mentioned quest, usage: \`${prefix}embark [quest #]\``)
    .addField(`**${prefix}continue**`, `Continues to the next wave of a quest.`)
    .addField(`**${prefix}exit**`, `Will leave the quest`)
    .addField(`**${prefix}event**`, `Shows off any events currently ongoing.`)
    message.channel.send(questhelp)
  }

  if(args[0] == "guild" || args[0] == "Guild"){
    const guildhelp = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Guild help!`)
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`For all guild commands!`)
    .addField(`**${prefix}gcreate**`, `This will begin guild creation, creating a guild requires 1000 gold and at least 1000 glory in the colosseum.`)
    .addField(`**${prefix}guild**`, `This will show the information for your current guild!`)
    .addField(`**${prefix}ginvite**`, `This will invite the mentioned player to join your guild!`)
    .addField(`**${prefix}gleave**`, `This will leave your current guild! Not usable if you are the leader!`)
    .addField(`**${prefix}disband**`, `For beginning disband options, only available if you are the leader!`)
    .addField(`**${prefix}dep**`, `For depositing the specified amount into the guild bank.`)
    .addField(`**${prefix}with**`, `For withdrawing from the guild bank, only usable by leaders or sub leaders.`)
    .addField(`**${prefix}grename**`, `Allows for the leader to rename their guild.`)
    .addField(`**${prefix}gkick**`, `Allows the leader to kick the mentioned player from the guild (only applies to those in the same guild.)`)
    message.channel.send(guildhelp)
  }
  if(args[0] == "exped" || args[0] == "Exped"){
    const expedhelp = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Expedition help!`)
    .setDescription(`Locations to explore are unlocked as story progress is made through !quests.`)
    .addField(`**${prefix}expd**`, `Will display all explorable locations you have unlocked.`)
    .addField(`**${prefix}locinfo**`, `This will display information for the indicated location.`)
    .addField(`**${prefix}explore**`, `Will randomly spawn either: An enemy from the indicated location, an item, or shards.`)
    .addField(`**${prefix}mats**`, `This will display all your held materials.`)
    message.channel.send(expedhelp)
  }
  if(args[0] == "other" || args[0] == "Other"){
    const otherhelp = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Miscallaneous Command help!`)
    .setDescription(`If a command is not listed anywhere, be sure to use !suggest to leave a note of it in our main server.`)
    .addField(`**${prefix}give**`, `Will give the mentioned player the indicated character. Usage: \`!give [@player] [character to give from inventory]\`.`)
    .addField(`**${prefix}clear**`, `Will clear out the passives equipped on the character.`)
    .addField(`**${prefix}givep**`, `Will give the mentioned player the indicated pet. Usage: !givep [@player] [pet number in inventory]`)
    .addField(`**${prefix}choosep**`, `Allows for the choosing of the indicated pet. Usage: !choosep [pet number in inventory.]`)
    .addField(`**${prefix}pets**`, `Displays a player's pets.`)
    .addField(`**${prefix}credits**`, `Displays Animelee credits.`)
    .addField(`**${prefix}invite**`, `Allows for access to the Animelee invite link, to invite melee to your very own server?`)
    .addField(`**${prefix}about**`, `Displays general information about Animelee.`)
    .addField(`**${prefix}server**`, `Will provide a link to Animelee's Official Server.`)
    message.channel.send(otherhelp)
  }
  if(args[0] == "rarity" || args[0] == "Rarity"){
    let rarityhelp = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Animelee Rarity Explanations!`)
    .setDescription(`Animelee runs off of 4 basic rarities, each has its own categorization!`)
    .addField(`**Overview**`, `- When a character is spawned, it will get a random rarity. These rarities are, in order of weakest to strongest; Shadow, Phantom, Reflection, Glitch.
    - That rarity corresponds to a range of multipliers.
    - This multiplier will multiply your base stats by that multiplier. (Base stats visible in !view)`)
    .addField(`${client.emojis.get('682724871352221714')}Shadow Rarity:`, `Multiplier Range: \`0.60× - 0.80×\` \nStats Gained per Lvl: \`4\``)
    .addField(`${client.emojis.get(`682724871737835581`)}Phantom Rarity:`, `Multiplier Range: \`0.75× - 0.95×\` \nStats Gained per Lvl: \`4.5\``)
    .addField(`${client.emojis.get('682724871343440044')}Reflection Rarity:`, `Multiplier Range: \`0.90× - 1.25×\` \nStats Gained per Lvl: \`5\``)
    .addField(`${client.emojis.get(`682724871913865223`)}Glitch Rarity:`, `Multiplier Range: \`1.05× - 1.50×\` \nStats Gained per Lvl: \`6\``)
    .setFooter(`You can view the chances at obtaining any given rarity by using !spawninfo.`)
    message.channel.send(rarityhelp)
  }
  if(args[0] == "classes" || args[0] == "Classes"){
    let classhelp = new Discord.RichEmbed()
    .setColor(`#0099ff`)
    .setTitle(`Animelee Classes explanation!`)
    .setDescription(`[WIP] Classes for characters and Enemies!`)
    .addField(`**${client.emojis.get(`709125247504351263`)} Melee**`, `Encompassing characters that revolve around short ranged, weapon combat.`)
    .addField(`**${client.emojis.get(client.classes.classes[1].emote)} Ranged**`, `${client.classes.classes[1].description}`)
    .addField(`**${client.emojis.get(client.classes.classes[2].emote)} Magus**`, `${client.classes.classes[2].description}`)
    .addField(`**${client.emojis.get(client.classes.classes[3].emote)} Tank**`, `${client.classes.classes[3].description}`)
    .addField(`**${client.emojis.get(client.classes.classes[4].emote)} Divine**`, `${client.classes.classes[4].description}`)
    .addField(`**${client.emojis.get(client.classes.classes[5].emote)} Mortal**`, `${client.classes.classes[5].description}`)
    .addField(`**${client.emojis.get(client.classes.classes[6].emote)} Demonic**`, `${client.classes.classes[6].description}`)
    .addField(`**${client.emojis.get(client.classes.classes[7].emote)} Monster**`, `${client.classes.classes[7].description}`)
    .setFooter(`All of the above are subject to change before implementation! Suggestions still appreciated!`)
    message.channel.send(classhelp)
  }
    } 
