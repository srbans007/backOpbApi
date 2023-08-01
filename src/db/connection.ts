import { Sequelize } from "sequelize";


const sequelize = new Sequelize('openbuyh', 'root', 'b1a2n3s409', {
    host: 'localhost',
    dialect: 'mysql',   
});

export default sequelize;