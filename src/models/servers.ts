import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface ServerInstance extends Model {
    id: string;
    prefix?: string;
    tradeLog?: string;
    toggleAuto?: boolean;   
}

export default sequelize.define<ServerInstance>("Servers", {
    id: {
        primaryKey: true,
        type: DataTypes.STRING(128)
    },
    prefix: {
        type: DataTypes.STRING(10)
    },
    tradeLog: {
        type: DataTypes.STRING(128)
    },
    toggleAuto: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});