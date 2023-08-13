import { Request, Response } from 'express';
import { Transportista } from '../models/transportista';

export const getTransportista = async (req: Request, res: Response) => {
    const listTransportista = await Transportista.findAll();

    res.json(listTransportista)
}

export const insertTransportista = async (req: Request, res: Response) => {
    try {
        const newTransportista = await Transportista.bulkCreate(req.body);
        res.json(newTransportista);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al insertar datos' });
    }
}

export const deleteTransportista = async (req: Request, res: Response) => {
    try {
        // Extrae el array de objetos con IDs directamente del cuerpo de la solicitud
        const transportistaToDelete = req.body;

        // Verifica que sea un array
        if (!Array.isArray(transportistaToDelete)) {
            return res.status(400).json({ error: 'El cuerpo debe contener un array de objetos con IDs' });
        }

        // Convierte el array de objetos en un array de IDs
        const ids = transportistaToDelete.map(transportista => transportista.id);

        // Elimina los registros basados en el array de IDs
        const result = await Transportista.destroy({
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