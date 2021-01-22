import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

interface ProfileInstance extends Model {
    id: string,
    shards: number,
    gold: number,
    glimmer: number,
    timesCompleted: number
}

export default sequelize.define<ProfileInstance>("Profile", {
    id: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    shards: {
        type: DataTypes.INTEGER
    },
    gold: {
        type: DataTypes.INTEGER
    },
    glimmer: {
        type: DataTypes.INTEGER
    },
    timesCompleted: {
        type: DataTypes.INTEGER
    }
});