import { Request, Response } from 'express';
import { GuiaRuta } from '../models/guiaRuta';

export const getGuiaRuta = async (req: Request, res: Response) => {
    const listGuiaRuta = await GuiaRuta.findAll();

    res.json(listGuiaRuta)
}

export const getGuiaRutaId = async (req: Request, res: Response) => {
    // Obtén el ID de la ruta desde la consulta (query) de la solicitud
    const idRuta = req.query.id_ruta;
console.log(idRuta)
    // Si no se proporciona id_ruta, devuelve un error
    if (!idRuta) {
        return res.status(400).json({ error: 'id_ruta es requerido' });
    }

    // Filtra las guías por id_ruta
    try {
        const listGuiaRuta = await GuiaRuta.findAll({
            where: {
                id_ruta: idRuta
            },
            logging: console.log  // Esto imprimirá la consulta SQL generada
        });

        res.json(listGuiaRuta);
    } catch (error) {
        // Manejo de errores en caso de que la consulta falle
        res.status(500).json({ error: 'Hubo un problema al obtener las guías de ruta' });
    }
}



export const insertGuiaRuta = async (req: Request, res: Response) => {
    try {
        const newGuiaRuta = await GuiaRuta.bulkCreate(req.body);
        res.json(newGuiaRuta);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al insertar datos' });
    }
}

export const deleteGuiaRuta = async (req: Request, res: Response) => {
    try {
        // Extrae el array de objetos con IDs directamente del cuerpo de la solicitud
        const guiaRutaToDelete = req.body;

        // Verifica que sea un array
        if (!Array.isArray(guiaRutaToDelete)) {
            return res.status(400).json({ error: 'El cuerpo debe contener un array de objetos con IDs' });
        }

        // Convierte el array de objetos en un array de IDs
        const ids = guiaRutaToDelete.map(guiaRuta => guiaRuta.id);

        // Elimina los registros basados en el array de IDs
        const result = await GuiaRuta.destroy({
            where: {
                id: ids
            }
        });

        if (result) {
            res.json({ message: `Se eliminaron ${result} registros con éxito` });
        } else {
            res.status(404).json({ error: 'No se encontraron registros para eliminar' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al eliminar los registros' });
    }
}