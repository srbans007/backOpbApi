import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Sucursal } from './sucursal';

export const Vehiculo = sequelize.define('vehiculo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    patente: {
        type: DataTypes.STRING
    }
}, )

Vehiculo.belongsTo(Sucursal, { foreignKey: 'id_sucursal', as: 'sucursal' });