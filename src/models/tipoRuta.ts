import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Sucursal } from './sucursal';

export const TipoRuta = sequelize.define('tipoRuta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_sucursal: {
        type: DataTypes.INTEGER
    },
    nombre_ruta: {
        type: DataTypes.STRING
    }
}, )

TipoRuta.belongsTo(Sucursal, { foreignKey: 'id_sucursal', as: 'sucursal' });