import { Sequelize, Model, DataTypes } from 'sequelize';
import config from '../data/config.json';

const sequelize = new Sequelize(config.database);

export interface LeaderboardInstance extends Model {
    profile_id: string;
    wins: number;
    losses: number;
    glory: number;
    streak: number;
}

export default sequelize.define<LeaderboardInstance>("Leaderboard", {
    profile_id: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    glory: DataTypes.INTEGER,
    streak: DataTypes.INTEGER    
});