import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface ServerInstance extends Model {
    server_id: string;
    prefix?: string;
    tradeLog?: string;
    toggleAuto?: boolean;   
}

export default sequelize.define<ServerInstance>("Servers", {
    server_id: {
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
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});