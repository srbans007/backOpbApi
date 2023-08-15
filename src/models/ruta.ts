import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Sucursal } from './sucursal';
import { Transportista } from './transportista';
import { Vehiculo } from './vehiculo';
import { TipoRuta } from './tipoRuta';
import { TipoTim } from './tim';

export const Ruta = sequelize.define('ruta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_chofer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_ayudante: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_vehiculo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tipoRuta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tim: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, )

Ruta.belongsTo(Sucursal, { foreignKey: 'id_sucursal', as: 'sucursal' });
Ruta.belongsTo(Transportista, { foreignKey: 'id_chofer', as: 'chofer' });
Ruta.belongsTo(Transportista, { foreignKey: 'id_ayudante', as: 'ayudante' });
Ruta.belongsTo(Vehiculo, { foreignKey: 'id_vehiculo', as: 'patente' });
Ruta.belongsTo(TipoRuta, { foreignKey: 'id_tipoRuta', as: 'tipoRuta' });
Ruta.belongsTo(TipoTim, { foreignKey: 'id_tim', as: 'tim' });
