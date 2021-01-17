import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import messageEvent from './events/message';
import readyEvent from './events/ready';
import Command from './interfaces/command';

export default class Bot extends Client {
    public commands: Collection<string, Command> = new Collection();

    constructor() {
        super();
        this.loadEvents();
        this.loadCommands();
    }

    private loadEvents = (): void => {
        this.on("message", messageEvent);
        this.on("ready", readyEvent);
    }

    private loadCommands = (): void => {
        readdirSync("./commands").forEach(fileName => {
            let cmd: Command = require(`./commands/${fileName}`);
            this.commands.set(cmd.name, cmd);
        });
    }
}

const bot = new Bot();
bot.login();