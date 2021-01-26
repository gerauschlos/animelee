import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface BookInstance extends Model {
    id: number,
    profile_id: string    
}

export default sequelize.define<BookInstance>("Books", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    profile_id: {
        type: new DataTypes.STRING(128)
    }
});