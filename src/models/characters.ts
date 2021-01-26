import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface CharacterInstance extends Model {
    id: string;
    profile_id: string;
    name: string;
    image_url: string;
    desc: string;
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
}

export default sequelize.define<CharacterInstance>("Characters", {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    profile_id: new DataTypes.STRING(128),
    name: new DataTypes.STRING(),
    image_url: new DataTypes.STRING(),
    desc: new DataTypes.STRING(),
    series: new DataTypes.STRING(),
    class: new DataTypes.INTEGER(),
    health: new DataTypes.INTEGER(),
    meleeAttack: new DataTypes.INTEGER(),
    magicAttack: new DataTypes.INTEGER(),
    meleeDefense: new DataTypes.INTEGER(),
    magicDefense: new DataTypes.INTEGER(),
    speed: new DataTypes.INTEGER(),
    unit_id: new DataTypes.INTEGER(),
    level: new DataTypes.INTEGER(),
    exp: new DataTypes.INTEGER(),
    reinforced: new DataTypes.INTEGER(),
    rarity: new DataTypes.INTEGER()
});