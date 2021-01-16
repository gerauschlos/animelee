import { Message } from "discord.js";
import Bot from "..";

export default async (bot: Bot, message: Message): Promise<void> => {
    // Ignore other bots and messages outside of a server
    if (message.author.bot && !message.guild) return;

    if 
}