import config from '../data/config.json';
import { ServerInstance } from "../models/server";

export default (server: ServerInstance | null): string => server?.prefix || config.prefix;