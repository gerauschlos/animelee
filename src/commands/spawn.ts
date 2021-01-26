import { Message } from "discord.js";
import Bot from "..";
import Command from "../interfaces/command";
import Characters ,{ CharacterInstance } from "../models/characters";
import Profiles, { ProfileInstance } from "../models/profiles";
import getPrefix from "../util/getPrefix";
import { beginnerSpawn } from "../util/spawnCharacter";

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

        switch (spawnType) {
            case "b":
            case "beginner":
                await beginnerSpawn(bot, msg.author, profile, prefix);
            break;
            case "h":
            case "heroic":
            break;
            case "e":
            case "event":
            break;
            case "s":
            case "selection":
            break;
            case "d":
            case "duplicate":
            break;
            default:
                await msg.channel.send(`That is not a valid spawn! To check current spawns, please try \`${prefix}\``);
            break;
        }
    }
    
}