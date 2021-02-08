import { Message, MessageEmbed } from "discord.js";
import { UniqueConstraintError } from "sequelize/types";
import Command from "../interfaces/command";
import Profile from "../models/profiles";
import Quest from "../models/quests"
import getPrefix from "../util/getPrefix";
import Book from "../models/books";
import Bot from "..";

export default class Start implements Command {
    name: string = "start";
    run = async (bot: Bot, msg: Message): Promise<void>  => {
        try {
            await Profile.create({
                profile_id: msg.author.id
            });
        } catch (e) {
            if (e instanceof UniqueConstraintError) {
                await msg.channel.send("You already have a profile");
            } else {
                await msg.channel.send("Something went wrong");
                console.log(e);
            }
            return;
        }

        await Quest.create({ quest_id: 0, profile_id: msg.author.id });
        await Book.create({ book_id: 1, profile_id: msg.author.id });

        let prefix = getPrefix(msg.guild!.id);
        
        let welcomeEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Welcome, to Animelee!!')
            .setAuthor(msg.author.username, msg.author.avatarURL()!)
            .setDescription('Animelee combines animee and rpg fans alike, for a unique fun-filled experience!')
            .setThumbnail(bot.user!.avatarURL()!)
            .addField('Starting', `Now that youve started on your Animelee adventure, be sure to check over \`${prefix}tutorial\`!`)
            .addField(`Story:`, `You awaken to find yourself in a bareen camp, you are unsure what you did to arrive in this area other than you had just started up a new mobile game: "Animelee".`)
            .addField('Resources:', 'You ransack the old camp for materials, being somewhat savy in how to survive in another world stories. You find 2 books, 500 gold coins, and 100 glowing shards.')
            .setImage(msg.author.avatarURL()!)
            .setTimestamp()
            .setFooter(`To continue your Animelee journey, head over to \`${prefix}spawns\` to summon your first character!`);

        let newQuestEmbed = new MessageEmbed()
            .setColor(`#0099ff`)
            .setTitle('You have a new quest!')
            .setDescription('After gathering your materials and not finding any food or water you head out in search of civilization!')
            .addField('Received quest', `"A Mysterious World"`)
            .setTimestamp();

        await msg.channel.send(welcomeEmbed);
        await msg.channel.send(newQuestEmbed);
    }
}