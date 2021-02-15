import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface PetInstance extends Model {
    pet_id: string;
    name: string;
    health: number;
    description: string;
    meleeAttack: number;
    magicAttack: number;
    speed: number;
    library_id: number;
    level: number;
    exp: number;

}

export default sequelize.define<PetInstance>("Pets", {
    pet_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    name: DataTypes.STRING,
    health: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    meleeAttack: DataTypes.INTEGER,
    magicAttack: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    library_id: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    exp: DataTypes.INTEGER
});