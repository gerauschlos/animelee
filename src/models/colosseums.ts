import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface ColosseumInstance extends Model {
    channel_id: string;
    player_one: string;
    player_two: string;
    whoseTurn: string;
}

export default sequelize.define<ColosseumInstance>("Colosseums", {
    channel_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    player_one: {
        type: DataTypes.STRING
    },
    player_two: {
        type: DataTypes.STRING
    },
    whoseTurn: DataTypes.STRING
});