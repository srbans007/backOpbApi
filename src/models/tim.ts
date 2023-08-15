import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const TipoTim = sequelize.define('tipoTim', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreTim: {
        type: DataTypes.STRING
    }
}, )