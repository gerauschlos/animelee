import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface BookInstance extends Model {
    book_id: number,
    profile_id: string    
}

export default sequelize.define<BookInstance>("Books", {
    book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    profile_id: {
        type: new DataTypes.STRING(128)
    }
});