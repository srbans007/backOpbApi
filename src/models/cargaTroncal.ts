import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Sucursal } from './sucursal';
import { Tienda } from './tienda';

export const CargaTroncal = sequelize.define('cargaTroncal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_carga: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tienda: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    boleta: {
        type: DataTypes.STRING
    },
    guia: {
        type: DataTypes.STRING
    },
    sku: {
        type: DataTypes.STRING
    },
    producto: {
        type: DataTypes.STRING
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    bulto: {
        type: DataTypes.INTEGER
    },
    rut_cliente: {
        type: DataTypes.STRING
    },
    fono_cliente: {
        type: DataTypes.STRING
    },
    email_cliente: {
        type: DataTypes.STRING
    },
    direccion_cliente: {
        type: DataTypes.STRING
    },
    comuna_cliente: {
        type: DataTypes.STRING
    },
    fecha_compromiso: {
        type: DataTypes.DATEONLY
    },
    lpn: {
        type: DataTypes.STRING
    },
    marcaPgd: {
        type: DataTypes.INTEGER
    }
},)

CargaTroncal.belongsTo(Sucursal, { foreignKey: 'id_sucursal', as: 'sucursal' });
CargaTroncal.belongsTo(Tienda, { foreignKey: 'id_tienda', as: 'tienda' });