import { Guild, Message, TextChannel } from "discord.js";
import Bot from "..";
import Command from "../interfaces/command";
import config from "../data/config.json";
import spawnMob from "../util/spawnMob";
import serverModel, { ServerInstance } from '../models/server';

const triggers = {
    "anime": "*Sneezes*.. I feel asthough ive been talked about..",
    "instrument": "Well thats humerus, my favorite is the Trombone",
    "kawai": "Ew",
    "bears": "Beets. Battlestar Galactia.",
    "SUPER": "HOT",
    "uwu": "Nyaaa~",
    "sao": "ew",
    "games": "Why do you need games if you have me UwU",
    "0099ff": "Shhhh dont give out my secrets...",
    "android": "Well done, android. The Enrichment Center once again reminds you that Android Hell is a real place",
    "bots": "HaAhHA.. nO No.. YoU DoNT nEEd AnY oThER bOT."
}

let getPrefix = (server: ServerInstance | null): string => server?.prefix || config.prefix;

export default async (bot: Bot, message: Message): Promise<void> => {
    // Ignore other bots and messages outside of a server
    if (message.author.bot || !message.guild) return;
    // Ignore message if it is in a DMChannel or NewsChannel
    if (!(message.channel instanceof TextChannel)) return;
    
    let server: ServerInstance | null = await serverModel.findOne({ where: {id: message.guild.id} });
    let prefix: string = getPrefix(server);

    // give the bot name if it was mentioned
    if (message.mentions.users.has(bot.user!.id)) {
        await message.channel.send(`The prefix for Animelee is ${prefix}`);
        return;
    }

    // if toggle auto is turned on in this server
    if (server?.toggleAuto) {
        for (const [key, value] of Object.entries(triggers)) {
            if (message.content.includes(key)) {
                await message.channel.send(value);
                break;
            }
        }
    }
    
    spawnMob(message.author, message.channel, prefix);

    // Run the command triggered, if the correct prefix is used
    if (message.content.indexOf(prefix) == 0) {
        const args: string[] = message.content.split(" ").slice(1);
        const cmdName: string | undefined = message.content.split(" ").shift()?.slice(1);

        const cmd: Command | undefined = bot.commands.get(cmdName);

        if (cmd) {
            cmd.run(bot, message, args);
        }
    }
}