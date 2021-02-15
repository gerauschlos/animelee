import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface CharacterInstance extends Model {
    character_id: string;
    profile_id: string;
    name: string;
    image_url: string;
    description: string;
    series: string;
    class: number;
    health: number;
    meleeAttack: number;
    magicAttack: number;
    meleeDefense: number;
    magicDefense: number;
    speed: number;
    unit_id: number;
    level: number;
    exp: number;
    reinforced: number;
    rarity: number;
    isChosen: boolean;
}

export default sequelize.define<CharacterInstance>("Characters", {
    character_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    profile_id: DataTypes.STRING,
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    description: DataTypes.TEXT,
    series: DataTypes.STRING,
    class: DataTypes.INTEGER,
    health: DataTypes.INTEGER,
    meleeAttack: DataTypes.INTEGER,
    magicAttack: DataTypes.INTEGER,
    meleeDefense: DataTypes.INTEGER,
    magicDefense: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    unit_id: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    exp: DataTypes.INTEGER,
    reinforced: DataTypes.INTEGER,
    rarity: DataTypes.INTEGER,
    isChosen: DataTypes.BOOLEAN
});