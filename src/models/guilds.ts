import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface GuildInstance extends Model {
    name: string;
    leader: string;
    gold: number;
    wins: number;
    losses: number;
    description: string;
    points: number;
}

export default sequelize.define<GuildInstance>("Guilds", {
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    leader: DataTypes.STRING,
    gold: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    points: DataTypes.INTEGER
});