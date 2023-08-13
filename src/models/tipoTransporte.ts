import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const TipoTransporte = sequelize.define('tipoTransporte', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    transporte: {
        type: DataTypes.STRING
    }
}, )