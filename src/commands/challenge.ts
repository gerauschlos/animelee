import { Collection, Message, MessageEmbed, MessageReaction, ReactionCollector, User } from "discord.js";
import { Op } from "sequelize/types";
import Bot from "..";
import Command from "../interfaces/command";
import Characters, { CharacterInstance } from "../models/characters";
import Colosseums from "../models/colosseums";
import Quests from "../models/quests";

let anyOngoingQuests = async (...profile_ids: [string, string]): Promise<boolean> => {
    let quest = await Quests.findOne({
        where: {
            [Op.or]: [
                { profile_id: profile_ids[0] },
                { profile_id: profile_ids[1] }
            ],
            active: true
        }
    });

    return !!quest;
}

export default class Challenge implements Command {
    name: string = "challenge";
    run = async (bot: Bot, msg: Message, args: string[]): Promise<void> => {
        let character_one: CharacterInstance | null = await Characters.findOne({ where: { profile_id: msg.author.id, isChosen: true } });
        let character_two: CharacterInstance | null = await Characters.findOne({ where: { profile_id: msg.mentions.users.first()?.id || "string", isChosen: true } });

        if (!character_one) {
            await msg.channel.send("You do not have a chosen character set!");
        } else if (!character_two) {
            await msg.channel.send("The player you challenged does not have a chosen character yet!");
        } else if (!msg.guild?.members.resolve(character_two.profile_id)) {
            await msg.channel.send("That is not a valid player!")
        } else if (character_one.profile_id == character_two.profile_id) {
            await msg.channel.send("You cannot challenge yourself!");
        } else if (await anyOngoingQuests(character_one.profile_id, character_two.profile_id)) {
            await msg.channel.send("One of you are currently in a quest!");
        } else {
            let user_two: User = msg.mentions.users.first()!;

            let embed = new MessageEmbed()
                .setColor(`#0099ff`)
                .setTitle(`🔥${msg.author.username} has challenged ${user_two.username} to a battle!🔥`)
                .setDescription(`To continue with the battle, ${user_two.username} must confirm the challenge by reacting with ✅!`)
                .addField(`${msg.author.username}'s ${character_one.name}:`, `Level: ${character_one.level}, Equipped Items: N/A`)
                .addField(`**VS**`, `${user_two.username}'s ${character_two.name} Level: ${character_two.level}, Equipped Items: N/A`)
                .setThumbnail(character_one.image_url)
                .setImage(character_two.image_url)
                .setTimestamp();

            let sentEmbed: Message = await msg.channel.send(embed);
            await sentEmbed.react('✅');
            await sentEmbed.react('⛔');

            let filter = (r: MessageReaction, u: User) => ['✅', '⛔'].includes(r.emoji.name) && u == user_two;
            let collector: ReactionCollector = sentEmbed.createReactionCollector(filter, {time: 150000 });

            collector.on("collect", async (reaction: MessageReaction) => {
                let emoji: string = reaction.emoji.name;

                if (emoji == '⛔') {
                    await msg.channel.send(`Match has been canceled!`);
                } else {
                    if (await anyOngoingQuests(character_one!.profile_id, character_two!.profile_id)) {
                        await msg.channel.send("One of you started a quest! Challenge cancelled!");
                    } else {
                        let first_move: User = character_one!.speed > character_two!.speed ? msg.author : user_two;
                        let second_move: User = first_move == msg.author ? msg.author : user_two;

                        character_one!.health = 300;
                        character_two!.health = 300;

                        await Promise.all([character_one!.save(), character_two!.save()]);

                        await Colosseums.create({
                            channel_id: msg.channel.id,
                            player_one: msg.author.id,
                            player_two: user_two.id,
                            whoseTurn: first_move.id
                        });

                        let embed = new MessageEmbed()
                            .setColor(`#0099ff`)
                            .setTitle(`Welcome, to the Colosseum!`)
                            .setDescription(`You watch as a colosseum rises from the earth, behold the ancient tomb of True Warriors!`)
                            .addField(`First move: ${first_move.username}`, `Second move: ${second_move.username}.`)
                            .setImage(`https://i.imgur.com/55tVmGn.png`)
                            .addField(`Note:`, `*To begin, use !attack [1 - 3]*`);

                        await msg.channel.send("Battle Comencing!");
                        await msg.channel.send(embed);
                    }
                }
            });

            collector.on("end", async (collected: Collection<string, MessageReaction>) => {
                if (collected.size == 0) {
                    await msg.channel.send("Challenged Timed out!");
                }
            });
        }
    }
}