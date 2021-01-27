import { MessageEmbed, User } from "discord.js";
import Characters, { CharacterInstance } from "../models/characters";
import { ProfileInstance } from "../models/profiles";
import { rares } from "../data/levels.json";
import { units } from "../data/units.json";
import { spawns } from "../data/spawns.json";
import Bot from "..";

let applyRarity = (atk: number, matk: number, def: number, mdef: number, spd: number, rarityMin: number, rarityMax: number) => {
    let ress = Math.round((Math.random() * (rarityMax - rarityMin) + rarityMin) * 100) / 100
    let resa = Math.round((Math.random() * (rarityMax - rarityMin) + rarityMin) * 100) / 100
    let resm = Math.round((Math.random() * (rarityMax - rarityMin) + rarityMin) * 100) / 100
    let resd = Math.round((Math.random() * (rarityMax - rarityMin) + rarityMin) * 100) / 100
    let resmd = Math.round((Math.random() * (rarityMax - rarityMin) + rarityMin) * 100) / 100

    return {
        spawnedSpeed: Math.round(ress * spd),
        spawnedMeleeAttack: Math.round(resa * atk),
        spawnedMagicAttack: Math.round(resm * matk),
        spawnedMeleeDefense: Math.round(resd * def),
        spawnedMagicDefense: Math.round(resmd * mdef),
        ress,
        resa,
        resmd,
        resd,
        resm
    };

}

let addCharacter = async (unit_id: number, author_id: string, rarityMin: number, rarityMax: number, rng: number) => {
    let { name: spawnedName,
        image: spawnedImage,
        description: spawnedDescription,
        series: spawnedSeries,
        class: spawnedClass,
        hp: spawnedHealth,
        atk,
        matk,
        def,
        mdef,
        spd,
    } = units[unit_id];

    if (rng == 3) {
        spawnedImage = units[unit_id].gimg
    }

    let {
        spawnedSpeed,
        spawnedMeleeAttack,
        spawnedMagicAttack,
        spawnedMeleeDefense,
        spawnedMagicDefense,
        ress,
        resa,
        resm,
        resd,
        resmd
    } = applyRarity(atk, matk, def, mdef, spd, rarityMin, rarityMax);

    let statTotal = spawnedSpeed + spawnedMeleeAttack + spawnedMagicAttack + spawnedMeleeDefense + spawnedMagicDefense;

    let character: CharacterInstance = await Characters.create({
        profile_id: author_id,
        name: spawnedName,
        image_url: spawnedImage,
        desc: spawnedDescription,
        series: spawnedSeries,
        class: spawnedClass,
        health: spawnedHealth,
        meleeAttack: spawnedMeleeAttack,
        magicAttack: spawnedMagicAttack,
        meleeDefense: spawnedMeleeDefense,
        magicDefense: spawnedMagicDefense,
        speed: spawnedSpeed,
        unit_id: unit_id,
        level: 0,
        exp: 0,
        reinforced: 0,
        rarity: rng
    });

    return { character, ress, resa, resm, resd, resmd, statTotal };
}

export let beginnerSpawn = async (bot: Bot, author: User, profile: ProfileInstance, prefix: string): Promise<MessageEmbed | string> => {
    if (profile.shards < 100) {
        return `You do not have the shards to preform this spawn!`;
    } else {
        profile.shards -= 100;
        await profile.save();
    }

    let chance: number = Math.round(Math.random() * 100);
    let unit_id: number = Math.floor(Math.random() * 22);
    let rng: number = 0;

    if (profile.donated > 0) {
        chance = Math.round(Math.random() * 105);
    }

    if (50 <= chance && chance < 85) {
        rng = 1;
    } else if (chance < 97) {
        rng = 2;
    } else if (chance <= 110) {
        rng = 3;
    }

    let { name: rarityName, min: rarityMin, max: rarityMax, color: rarityColor, emote: rarityEmote } = rares[rng];
    let { character, ress, resa, resm, resd, resmd, statTotal } = await addCharacter(unit_id, author.id, rarityMin, rarityMax, rng);

    let emote = bot.emojis.resolve(rarityEmote);

    return new MessageEmbed()
        .setColor(rarityColor)
        .setTitle(`**:crossed_swords:Congratulations!:crossed_swords:**`)
        .setAuthor(author.username, author.avatarURL()!)
        .setDescription(`You preformed a Beginner spawn and summoned ${character.name} for \`100\` Shards!`)
        .setThumbnail('https://i.imgur.com/k8mdsJe.gif')
        .addField(`**Spawned character:**`, `${character.name} Lvl \`${character.level}\`- \`${statTotal}\` Total.`)
        .addField(`|${emote}| ${rarityName} Rarity Bonus: `, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
        .setImage(character.image_url)
        .setTimestamp()
        .setFooter(`Spawned by ${author.username}! To check your characters now use the ${prefix}characters command`);
}

export let heroicSpawn = async (bot: Bot, author: User, profile: ProfileInstance, prefix: string): Promise<MessageEmbed | string> => {
    if (profile.shards < 500) {
        return `You do not have the shards to preform this spawn!`;
    } else {
        profile.shards -= 500;
        await profile.save();
    }

    let chance: number = Math.round(Math.random() * 100);
    let unit_id: number = Math.floor(Math.random() * 43);
    let rng: number = 0;

    if (profile.donated > 0) {
        chance = Math.round(Math.random() * 105);
    }

    if (35 <= chance && chance < 65) {
        rng = 1;
    } else if (chance < 90) {
        rng = 2;
    } else if (chance <= 110) {
        rng = 3;
    }

    let { name: rarityName, min: rarityMin, max: rarityMax, color: rarityColor, emote: rarityEmote } = rares[rng];
    let { character, ress, resa, resm, resd, resmd, statTotal } = await addCharacter(unit_id, author.id, rarityMin, rarityMax, rng);

    let emote = bot.emojis.resolve(rarityEmote);

    return new MessageEmbed()
        .setColor(rarityColor)
        .setTitle(`**Congratulations!**`)
        .setAuthor(author.username, author.avatarURL()!)
        .setDescription(`You preformed a Heroic spawn and summoned ${character.name} for \`500\` Shards!`)
        .setThumbnail('https://i.imgur.com/yKGPPbZ.gif')
        .addField(`**Spawned character:**`, `${character.name} Lvl \`${character.level}\`- \`${statTotal}\` Total.`)
        .addField(`|${emote}| ${rarityName} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
        .setImage(character.image_url)
        .setTimestamp()
        .setFooter(`Spawned by ${author.username}! To check your characters now use the ${prefix}characters command`);
}

export let eventSpawn = async (bot: Bot, author: User, profile: ProfileInstance, prefix: string): Promise<string | MessageEmbed> => {
    let eventSpawn: number | null = null;

    if (!eventSpawn) {
        return "There is no event spawn up at this time!";
    } else if (profile.shards < Number(spawns[eventSpawn].cost)) {
        return "You do not have the shards to preform this spawn!";
    } else {
        profile.shards -= Number(spawns[eventSpawn].cost);
        await profile.save();
    }

    let chance: number = Math.round(Math.random() * 100);
    let unit_id: number = Math.floor(Math.random() * 43);
    let rng: number = 0;

    if (profile.donated > 0) {
        chance = Math.round(Math.random() * 105);
    }

    if (35 <= chance && chance < 65) {
        rng = 1;
    } else if (chance < 90) {
        rng = 2;
    } else if (chance <= 110) {
        rng = 3;
    }

    let { name: rarityName, min: rarityMin, max: rarityMax, color: rarityColor, emote: rarityEmote } = rares[rng];
    let { character, ress, resa, resm, resd, resmd, statTotal } = await addCharacter(unit_id, author.id, rarityMin, rarityMax, rng);

    let emote = bot.emojis.resolve(rarityEmote);

    return new MessageEmbed()
        .setColor(rarityColor)
        .setTitle(`**Congratulations!** You preformed an Event spawn and summoned ${character.name}!!`)
        .setAuthor(author.username, author.avatarURL()!)
        .setDescription(`You have used \`${spawns[eventSpawn].cost}\` Shards!`)
        .setThumbnail(spawns[eventSpawn].image)
        .addField(`**Spawned character:**`, `${character.name} Lvl \`${character.level}\`- \`${statTotal}\` Total.`)
        .addField(`|${emote}| ${rarityName} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
        .setImage(character.image_url)
        .setTimestamp()
        .setFooter(`Spawned by ${author.username}! To check your characters now use the ${prefix}characters command`);
}

export let duplicateSpawn = async (bot: Bot, author: User, profile: ProfileInstance, prefix: string): Promise<string | MessageEmbed> => {
    if (profile.shards < 2000) {
        return `You do not have the shards to preform this spawn!`;
    } else {
        profile.shards -= 2000;
        await profile.save();
    }

    let chosenCharacter: CharacterInstance | null = await Characters.findOne({ where: { profile_id: profile.id, isChosen: true } });

    if (!chosenCharacter) {
        return "You have to be chose a character before doing a duplicate spawn.";
    }

    let chance: number = Math.round(Math.random() * 100);
    let unit_id: number = chosenCharacter.unit_id;
    unit_id = [58, 57].includes(unit_id) ? (Math.round(Math.random() * 10) == 5 ? unit_id : Math.round(Math.random() * 22)) : unit_id;
    let rng: number = 0;

    if (profile.donated > 0) {
        chance = Math.round(Math.random() * 105);
    }

    if (35 <= chance && chance < 70) {
        rng = 1;
    } else if (chance < 97) {
        rng = 2;
    } else if (chance <= 110) {
        rng = 3;
    }

    let { name: rarityName, min: rarityMin, max: rarityMax, color: rarityColor, emote: rarityEmote } = rares[rng];
    let { character: duplicate, ress, resa, resm, resd, resmd, statTotal } = await addCharacter(unit_id, author.id, rarityMin, rarityMax, rng);

    let emote = bot.emojis.resolve(rarityEmote);

    return new MessageEmbed()
        .setColor(rarityColor)
        .setTitle(`**Congratulations!** You preformed a Duplicate spawn and summoned ${duplicate.name}!!`)
        .setAuthor(author.username, author.avatarURL()!)
        .setDescription(`You have used \`2000\` shards`)
        .setThumbnail(`https://i.imgur.com/RJdIOaG.gif`)
        .addField(`**Spawned character:**`, `${duplicate.name} Lvl \`${duplicate.level}\`- \`${statTotal}\` Total.`)
        .addField(`|${emote}| ${rarityName} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
        .setImage(duplicate.image_url)
        .setTimestamp()
        .setFooter(`Spawned by ${author.username}! To check your characters now use the ${prefix}characters command`);
}

export let selectionSpawn = async (bot: Bot, author: User, profile: ProfileInstance, prefix: string, unit_id: number): Promise<string | MessageEmbed> => {
    if (profile.glimmer < 10) {
        return `You do not have enough glimmer to preform this spawn!`;
    } else {
        profile.glimmer -= 10;
        await profile.save();
    }

    let chance: number = Math.round(Math.random() * 100);
    let rng: number = 0;

    if (profile.donated > 0) {
        chance = Math.round(Math.random() * 105);
    }

    if (35 <= chance && chance < 65) {
        rng = 1;
    } else if (chance < 90) {
        rng = 2;
    } else if (chance <= 110) {
        rng = 3;
    }

    let { name: rarityName, min: rarityMin, max: rarityMax, color: rarityColor, emote: rarityEmote } = rares[rng];
    let { character, ress, resa, resm, resd, resmd, statTotal } = await addCharacter(unit_id, author.id, rarityMin, rarityMax, rng);

    let emote = bot.emojis.resolve(rarityEmote);

    return new MessageEmbed()
        .setColor(rarityColor)
        .setTitle(`**Congratulations!** You preformed a Selection spawn and summoned ${character.name}!!`)
        .setAuthor(author.username, author.avatarURL()!)
        .setDescription(`You have used \`10\` glimmer!`)
        .setThumbnail(`https://i.imgur.com/RJdIOaG.gif`)
        .addField(`**Spawned character:**`, `${character.name} Lvl \`${character.level}\`- \`${statTotal}\` Total.`)
        .addField(`|${emote}| ${rarityName} Rarity Bonus:`, `\`\`\`Speed: | ${ress}\`\`\` \`\`\`Attack: | ${resa}\`\`\` \`\`\`Mattack: | ${resm}\`\`\` \`\`\`Defense: | ${resd}\`\`\` \`\`\`Mdefense: | ${resmd}\`\`\``)
        .setImage(character.image_url)
        .setTimestamp()
        .setFooter(`Spawned by ${author.username}! To check your characters now use the ${prefix}characters command`);
}