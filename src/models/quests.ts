import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface QuestInstance extends Model {
    quest_id: number;
    profile_id: string;
    active: boolean;
    current: boolean;
}

export default sequelize.define<QuestInstance>("Quests", {
    quest_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    profile_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    current: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});