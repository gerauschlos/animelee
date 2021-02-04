import { Message, MessageEmbed } from "discord.js";
import Bot from "..";
import Command from "../interfaces/command";
import Characters ,{ CharacterInstance } from "../models/characters";
import Profiles, { ProfileInstance } from "../models/profiles";
import getPrefix from "../util/getPrefix";
import { beginnerSpawn, duplicateSpawn, eventSpawn, heroicSpawn, selectionSpawn } from "../util/spawnCharacter";

export default class Spawn implements Command {
    name: string = "spawn";
    run = async (bot: Bot, msg: Message, args: string[]): Promise<void> => {
        const prefix: string = await getPrefix(msg.guild!.id);
        let profile: ProfileInstance | null = await Profiles.findOne({ where: {
            id: msg.author.id
        } });
        let characters: CharacterInstance[] = await Characters.findAll({ where: { profile_id: msg.author.id }});

        if (!profile) {
            await msg.channel.send("You cannot spawn because you have not started");
            return;
        } else if (characters.length >= 50) {
            await msg.channel.send(`You have reached your character limit! To continue spawning please clear one from your inventory with \`${prefix}dis\``)
            return;
        }

        let spawnType: string = args[0];
        let message: string | MessageEmbed;

        switch (spawnType) {
            case "b":
            case "beginner":
                message = await beginnerSpawn(bot, msg.author, profile, prefix);
            break;
            case "h":
            case "heroic":
                message = await heroicSpawn(bot, msg.author, profile, prefix);
            break;
            case "e":
            case "event":
                message = await eventSpawn(bot, msg.author, profile, prefix);
            break;
            case "s":
            case "selection":
                if (![0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,45,46].includes(Number(args[1]))) {
                    message = `This character is not available to selection spawn!`;
                } else {
                    message = await selectionSpawn(bot, msg.author, profile, prefix, Number(args[1]));
                }
            break;
            case "d":
            case "duplicate":
                message = await duplicateSpawn(bot, msg.author, profile, prefix);
            break;
            default:
                message = `That is not a valid spawn! To check current spawns, please try \`${prefix}\``;
            break;
        }

        await msg.channel.send(message);
    }
}