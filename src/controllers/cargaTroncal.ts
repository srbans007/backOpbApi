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
 