import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const CargaTroncal = sequelize.define('cargaTroncal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_carga: {
        type: DataTypes.DATEONLY
    },
    tienda: {
        type: DataTypes.STRING
    },
    boleta: {
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
    }
}, )