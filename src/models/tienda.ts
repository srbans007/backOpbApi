import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Tienda = sequelize.define('tienda', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_tienda: {
        type: DataTypes.STRING
    }
}, )