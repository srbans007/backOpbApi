import { Request, Response } from 'express';
import { TipoTransporte } from '../models/tipoTransporte';

export const getTipoTransporte = async (req: Request, res: Response) => {
    const listTipoTransporte = await TipoTransporte.findAll();

    res.json(listTipoTransporte)
}

export const insertTipoTransporte = async (req: Request, res: Response) => {
    try {
        const newTipoTransporte = await TipoTransporte.bulkCreate(req.body);
        res.json(newTipoTransporte);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al insertar datos' });
    }
}

export const deleteTipoTransporte = async (req: Request, res: Response) => {
    try {
        // Extrae el array de objetos con IDs directamente del cuerpo de la solicitud
        const tipoTransporteToDelete = req.body;

        // Verifica que sea un array
        if (!Array.isArray(tipoTransporteToDelete)) {
            return res.status(400).json({ error: 'El cuerpo debe contener un array de objetos con IDs' });
        }

        // Convierte el array de objetos en un array de IDs
        const ids = tipoTransporteToDelete.map(tipoTransporte => tipoTransporte.id);

        // Elimina los registros basados en el array de IDs
        const result = await TipoTransporte.destroy({
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