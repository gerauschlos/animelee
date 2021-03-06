import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface MobInstance extends Model {
    channel_id: string;
    health: number;
    meleeAttack: number;
    magicAttack: number;
    meleeDefense: number;
    magicDefense: number;
    speed: number;
    unit_id: number;
}

export default sequelize.define<MobInstance>("Mobs", {
    channel_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    health: {
        type: DataTypes.INTEGER
    },
    meleeAttack: {
        type: DataTypes.INTEGER
    },
    magicAttack: DataTypes.INTEGER,
    meleeDefense: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    unit_id: DataTypes.INTEGER
});