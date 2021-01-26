import config from '../data/config.json';
import Server from "../models/servers";

export default async (guild_id: string): Promise<string> => (await Server.findOne({where: {id: guild_id}}))?.prefix || config.prefix;