const Discord = require("discord.js");
const { prefix, token } = require('./config.json');
const Enmap = require("enmap");
const fs = require("fs")



const client = new Discord.Client();
const config = require("./config.json");
client.characters = new Enmap({name: "Characters"})
client.profile = new Enmap({name: "UserProfile"})
client.battles = new Enmap({name: "Battles"})
client.holiday = new Enmap({name: "Events"})
client.colo = new Enmap({name: "Colosseum"})
client.guild = new Enmap({name: "Guilds"})
client.pets = new Enmap({name: "Pets"})
client.servers = new Enmap({name: "Servers"})
client.towns = new Enmap({name: "towns"})
client.config = config;

client.units = require("./units.json")
client.books = require("./books.json")
client.spawns = require("./spawns.json")
client.active = require("./active.json")
client.mobs = require("./mobs.json")
client.levels = require("./levels.json")
client.abilities = require("./abilities.json")
client.quests = require("./quests.json")
client.items = require("./items.json")
client.pet = require("./pet.json")
client.locs = require("./locs.json")
client.npc = require("./npc.json")
client.classes = require("./classes.json")
client.missions = require("./missions.json")

client.clean = async (client, text) => {
  if (text && text.constructor.name == "Promise")
    text = await text;
  if (typeof evaled !== "string")
    text = require("util").inspect(text, {depth: 1});

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
    .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

  return text;
};

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);