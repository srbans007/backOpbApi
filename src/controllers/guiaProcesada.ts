import { Request, Response } from 'express';
import { GuiaProcesada } from '../models/guiaProcesada';
import { CargaTroncal } from '../models/cargaTroncal';
import { GuiaRuta } from '../models/guiaRuta';
import { Ruta } from '../models/ruta';
import { Tienda } from '../models/tienda';
import { TipoTransporte } from '../models/tipoTransporte';
import { Transportista } from '../models/transportista';
import { Op } from 'sequelize';

export const getGuiaProcesada = async (req: Request, res: Response) => {
    try {
        const listGuiaProcesada = await GuiaProcesada.findAll({
            attributes: ['boleta', 'fecha_entregado', 'estado', 'subestado', 'codigo', 'comentario_beetrack'],
            include: [
                {
                    model: GuiaRuta,
                    as: 'guiaRuta',  // Esto se basa en cómo definiste la relación en el modelo
                    include: [
                        {
                            model: CargaTroncal,
                            as: 'guia',
                            attributes: ['guia', 'marcaPgd', 'boleta', 'lpn', 'producto', 'cliente', 'direccion_cliente', 'comuna_cliente'],
                            include: [
                                {
                                    model: Tienda,
                                    as: 'tienda',
                                    attributes: ['nombre_tienda']
                                }
                            ]
                        },
                        {
                            model: Ruta,
                            as: 'ruta',
                            attributes: ['id_chofer', 'id_ayudante', 'createdAt'],
                            include: [
                                {
                                    model: Transportista,
                                    as: 'chofer',
                                    attributes: ['nombres', 'apellidos', 'id_transporte'],
                                    include: [
                                        {
                                            model: TipoTransporte,
                                            as: 'tipoTransporte',
                                            attributes: ['transporte']
                                        }
                                    ]
                                },
                                {
                                    model: Transportista,
                                    as: 'ayudante',
                                    attributes: ['nombres', 'apellidos', 'id_transporte'],
                                    include: [
                                        {
                                            model: TipoTransporte,
                                            as: 'tipoTransporte',
                                            attributes: ['transporte']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        res.json(listGuiaProcesada);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al obtener datos' });
    }
}



export const insertGuiaProcesada = async (req: Request, res: Response) => {
    try {
        const newGuiaProcesada = await GuiaProcesada.bulkCreate(req.body);
        res.json(newGuiaProcesada);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al insertar datos' });
    }
}

export const getBuscarGuiaProcesada = async (req: Request, res: Response) => {
    try {
        const valor = req.query.valor || '';

        // Realizar la consulta
        const guiasEncontradas = await CargaTroncal.findAll({
            where: {
                marcaPgd: 2,
                [Op.or]: [
                    { id: valor },
                    { boleta: valor },
                    { guia: valor },
                    { lpn: valor }
                ]
            }
        });

        res.json(guiasEncontradas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar guías' });
    }
}

export const getBuscarGuiaProcesadaRuta = async (req: Request, res: Response) => {
    try {
        const valor = req.query.valor || '';

        // Realizar la consulta join entre GuiaRuta y CargaTroncal
        const guiasEncontradas = await GuiaRuta.findAll({
            include: [{
                model: CargaTroncal,
                as: 'guia',
                where: {
                    marcaPgd: 2,
                    [Op.or]: [
                        { id: valor },
                        { boleta: valor },
                        { guia: valor },
                        { lpn: valor }
                    ]
                },
                attributes: []  // No necesitamos ninguna columna específica de CargaTroncal en la respuesta
            }],
            attributes: ['id']  // Sólo necesitamos el id de GuiaRuta en la respuesta
        });

        res.json(guiasEncontradas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar guías' });
    }
}

export const updateGuiaProcesada = async (req: Request, res: Response) => {
    try {
        // Extrae el array de rutas desde el cuerpo de la solicitud
        const cargaToUpdate = req.body;

        // Verifica que sea un array
        if (!Array.isArray(cargaToUpdate) || cargaToUpdate.length !== 1) {
            return res.status(400).json({ error: 'El cuerpo debe contener un array de un solo objeto para actualizar.' });
        }

        // Extrae el ID del primer objeto del array
        const { id } = cargaToUpdate[0];

        // Si no se proporciona un ID, devuelve un error
        if (!id) {
            return res.status(400).json({ error: 'Se requiere un ID en el objeto.' });
        }

        // Actualiza el registro en la base de datos
        const [updatedRows] = await CargaTroncal.update(cargaToUpdate[0], {
            where: {
                id: id
            }
        });

        // Verifica si se actualizó algún registro
        if (updatedRows > 0) {
            res.json({ message: 'guia actualizada con éxito' });
        } else {
            res.status(404).json({ error: 'No se encontró la guia para actualizar' });
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al actualizar la guia' });
    }
}