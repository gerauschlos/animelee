import { Client, Collection } from 'discord.js';
import messageEvent from './events/message';
import readyEvent from './events/ready';

export default class Bot extends Client {
    public commands = new Collection();

    constructor() {
        super();
    }

    private loadEvents = (): void => {
        this.on("message", messageEvent);
        this.on("ready", readyEvent);
    }
}

const bot = new Bot();