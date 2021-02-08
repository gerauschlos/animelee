import { TextChannel, User, MessageEmbed } from "discord.js";
import { mobs } from '../data/mobs.json';
import Mob from '../models/mobs';
import { classes } from '../data/classes.json';

export default async (author: User, channel: TextChannel, prefix: string): Promise<void> => {
    let randomNumber: number = Math.floor((Math.random() * 400) + 1);
    let mobSpawned: number | null = null;
    let possibleMobs: number[] = [115];

    if (randomNumber == 30) {
        mobSpawned = Math.floor(Math.random() * 42);
    } else if (randomNumber > 10 && randomNumber < 15) {
        mobSpawned = possibleMobs[Math.floor(Math.random() * possibleMobs.length)];
    }

    if (mobSpawned) {
        let mob = mobs[mobSpawned];
        let mobClass = classes[mob.class];
        let spawnEmbed: MessageEmbed = new MessageEmbed()
            .setColor(`#0099ff`)
            .setAuthor(mobClass.name, mobClass.img)
            .setTitle(`**Wild ${mob.name}**`)
            .setDescription(`${mob.description}`)
            .addField(`Health:`, `\`\`\`${mob.hp}\`\`\``)
            .setImage(mob.image)
            .setFooter(`To fight it use the ${prefix}attack command!`)
            .setTimestamp();

        await Mob.create({ 
            id: channel.id,
            health: mob.hp,
            meleeAttack: mob.atk,
            magicAttack: mob.matk,
            meleeDefense: mob.def,
            magicDefense: mob.mdef,
            speed: mob.spd,
            unit_id: mob.id
        });
        await channel.send(`${author} has spawned a ${mob.name}!`);
        await channel.send(spawnEmbed);
    }
}