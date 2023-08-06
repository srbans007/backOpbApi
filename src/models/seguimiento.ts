import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Seguimiento = sequelize.define('seguimiento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    boleta: {
        type: DataTypes.STRING
    },
    guia: {
        type: DataTypes.STRING
    },
    lpn: {
        type: DataTypes.STRING
    },
    marcaPgd: {
        type: DataTypes.INTEGER
    }
}, )