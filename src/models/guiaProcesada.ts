import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { GuiaRuta } from './guiaRuta';

export const GuiaProcesada = sequelize.define('guiaProcesada', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_guiaRuta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    boleta: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    subestado: {
        type: DataTypes.STRING
    },
    fecha_entregado: {
        type: DataTypes.DATE
    },
    comentario_beetrack: {
        type: DataTypes.STRING
    },
    codigo: {
        type: DataTypes.STRING
    },
}, )

GuiaProcesada.belongsTo(GuiaRuta, { foreignKey: 'id_guiaRuta', as: 'guiaRuta' });
