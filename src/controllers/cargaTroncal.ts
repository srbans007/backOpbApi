import { Request, Response } from 'express';
import { CargaTroncal } from '../models/cargaTroncal';
import { Op } from 'sequelize'; // Importa el operador de Sequelize
import { GuiaRuta } from '../models/guiaRuta';
import { Ruta } from '../models/ruta';
import { Tienda } from '../models/tienda';

export const getTroncal = async (req: Request, res: Response) => {
    const listTroncal = await CargaTroncal.findAll();

    res.json(listTroncal)
}

export const getDatosGuiaRuta = async (req: Request, res: Response) => {
    try {
        const ruta_id = req.query.ruta_id;  // Obtén el ID de la ruta desde la consulta

        if (!ruta_id) {
            return res.status(400).json({ error: 'El ID de la ruta es requerido' });
        }

        // Realizar la consulta
        const guiasRutas = await GuiaRuta.findAll({
            where: {
                id_ruta: ruta_id  // Filtro por ID de ruta
            },
            // Incluir la información relacionada de CargaTroncal y Ruta
            include: [
                {
                    model: CargaTroncal,
                    as: 'guia',
                    required: true,
                    include: [
                        {
                            model: Tienda,
                            as: 'tienda'
                        }
                    ]
                },
                {
                    model: Ruta,
                    as: 'ruta',
                    required: true
                }
            ]
        });

        res.json(guiasRutas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener datos de guía y ruta' });
    }
}



export const insertTroncal = async (req: Request, res: Response) => {
    try {
      const newTroncal = await CargaTroncal.bulkCreate(req.body);
      res.json(newTroncal);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al insertar datos' });
    }
  }

  export const getBuscarGuia = async (req: Request, res: Response) => {
    try {
        const valor = req.query.valor || ''; 

        // Realizar la consulta
        const guiasEncontradas = await CargaTroncal.findAll({
            where: {
                marcaPgd: 1,
                [Op.or]: [
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
 
export const updateTroncal = async (req: Request, res: Response) => {
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