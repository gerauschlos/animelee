import { Message } from "discord.js";
import Bot from "..";

export default interface Command {
    readonly name: string;
    run(bot: Bot, msg: Message, args: string[]) : Promise<void>;
}