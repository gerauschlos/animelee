import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface ServerInstance extends Model {
    id: string,
    prefix?: string,
    tradeLog?: string
    toggleAuto?: boolean    
}

export default sequelize.define<ServerInstance>("Server", {
    id: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    prefix: {
        type: DataTypes.STRING
    },
    tradeLog: {
        type: DataTypes.STRING
    },
    toggleAuto: {
        type: DataTypes.BOOLEAN
    }
});