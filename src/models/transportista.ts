import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Sucursal } from './sucursal';
import { TipoTransporte } from './tipoTransporte';

export const Transportista = sequelize.define('transportista', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_transporte: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombres: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    }
}, )

Transportista.belongsTo(Sucursal, { foreignKey: 'id_sucursal', as: 'sucursal' });
Transportista.belongsTo(TipoTransporte, { foreignKey: 'id_transporte', as: 'tipoTransporte' });