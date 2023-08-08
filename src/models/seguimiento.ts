import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { CargaTroncal } from './cargaTroncal';

export const Seguimiento = sequelize.define('seguimiento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_guia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    marcaPgd: {
        type: DataTypes.INTEGER
    }
}, );
Seguimiento.belongsTo(CargaTroncal, { foreignKey: 'id_guia', as: 'cargaTroncal' });