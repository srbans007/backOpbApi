import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Sucursal = sequelize.define('sucursal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_sucursal: {
        type: DataTypes.STRING
    }
}, )