import { Sequelize } from "sequelize";
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    timezone: '+00:00'
});

export default sequelize;

