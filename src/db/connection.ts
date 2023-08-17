import { Sequelize } from "sequelize";
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
    host: process.env.DB_HOST!,
    dialect: 'mysql',
    timezone: process.env.TIME_ZONE  // Utiliza la zona horaria desde el archivo .env
});

export default sequelize;

