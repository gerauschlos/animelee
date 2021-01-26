import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface QuestInstance extends Model {
    id: number;
    profile_id: string;
    current: boolean;
}

export default sequelize.define<QuestInstance>("Quests", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    profile_id: {
        type: new DataTypes.STRING(128)
    },
    current: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});