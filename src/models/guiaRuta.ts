import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { CargaTroncal } from './cargaTroncal';
import { Ruta } from './ruta';
import { GuiaProcesada } from './guiaProcesada';

export const GuiaRuta = sequelize.define('guiaRuta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_ruta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_guia: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, )

GuiaRuta.belongsTo(Ruta, { foreignKey: 'id_ruta', as: 'ruta' });
GuiaRuta.belongsTo(CargaTroncal, { foreignKey: 'id_guia', as: 'guia' });

