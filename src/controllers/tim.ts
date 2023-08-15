import { Request, Response } from 'express';
import { TipoTim } from '../models/tim';

export const getTim = async (req: Request, res: Response) => {
    const listTipoTim = await TipoTim.findAll();

    res.json(listTipoTim)
}

export const insertTim = async (req: Request, res: Response) => {
    try {
        const newTim = await TipoTim.bulkCreate(req.body);
        res.json(newTim);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al insertar datos' });
    }
}

export const deleteTim = async (req: Request, res: Response) => {
    try {
        // Extrae el array de objetos con IDs directamente del cuerpo de la solicitud
        const tipoTimToDelete = req.body;

        // Verifica que sea un array
        if (!Array.isArray(tipoTimToDelete)) {
            return res.status(400).json({ error: 'El cuerpo debe contener un array de objetos con IDs' });
        }

        // Convierte el array de objetos en un array de IDs
        const ids = tipoTimToDelete.map(tipoTim => tipoTim.id);

        // Elimina los registros basados en el array de IDs
        const result = await TipoTim.destroy({
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