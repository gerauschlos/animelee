import { Client, Collection, Message } from 'discord.js';
import { readdirSync } from 'fs';
import messageEvent from './events/message';
import readyEvent from './events/ready';
import Command from './interfaces/command';
import config from './data/config.json';

export default class Bot extends Client {
    public commands: Collection<string | undefined, Command> = new Collection();

    constructor() {
        super();
        this.loadEvents();
        this.loadCommands();
    }

    private loadEvents = (): void => {
        this.on("message", (message: Message) => messageEvent(this, message));
        this.on("ready", () => readyEvent(this));
    }

    private loadCommands = (): void => {
        readdirSync("./commands").forEach((fileName: string) => {
            let cmd: Command = require(`./commands/${fileName}`);
            this.commands.set(cmd.name, cmd);
        });
    }
}

const bot = new Bot();

bot.login(config.token);