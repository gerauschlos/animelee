import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface ProfileInstance extends Model {
    profile_id: string;
    shards: number;
    gold: number;
    glimmer: number;
    rank: number;
    donated: number;
    timesCompleted: number;
}

export default sequelize.define<ProfileInstance>("Profiles", {
    profile_id: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    rank: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    shards: {
        type: DataTypes.INTEGER,
        defaultValue: 100
    },
    gold: {
        type: DataTypes.INTEGER,
        defaultValue: 500
    },
    glimmer: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    donated: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    timesCompleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});