import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface ColosseumInstance extends Model {
    id: string,
    player_one: string,
    player_two: string,
    whoseTurn: string
}

export default sequelize.define<ColosseumInstance>("Colosseums", {
    id: {
        type: DataTypes.STRING(128),
        primaryKey: true
    },
    player_one: {
        type: new DataTypes.STRING(128)
    },
    player_two: {
        type: new DataTypes.STRING(128)
    },
    whoseTurn: new DataTypes.STRING(128)
});