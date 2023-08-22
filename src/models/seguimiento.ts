import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { CargaTroncal } from './cargaTroncal';
import { Ruta } from './ruta';

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
    id_ruta: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    marcaPgd: {
        type: DataTypes.INTEGER
    }
}, );
Seguimiento.belongsTo(CargaTroncal, { foreignKey: 'id_guia', as: 'cargaTroncal' });
Seguimiento.belongsTo(Ruta, { foreignKey: 'id_ruta', as: 'ruta' });