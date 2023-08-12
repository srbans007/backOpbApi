import { Request, Response } from 'express';
import { Vehiculo } from '../models/vehiculo';

export const getVehiculo = async (req: Request, res: Response) => {
    const listVehiculo = await Vehiculo.findAll();

    res.json(listVehiculo)
}

export const insertVehiculo = async (req: Request, res: Response) => {
    try {
        const newVehiculo = await Vehiculo.bulkCreate(req.body);
        res.json(newVehiculo);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al insertar datos' });
    }
}

export const deleteVehiculo = async (req: Request, res: Response) => {
    try {
        // Extrae el array de objetos con IDs directamente del cuerpo de la solicitud
        const vehiculoToDelete = req.body;

        // Verifica que sea un array
        if (!Array.isArray(vehiculoToDelete)) {
            return res.status(400).json({ error: 'El cuerpo debe contener un array de objetos con IDs' });
        }

        // Convierte el array de objetos en un array de IDs
        const ids = vehiculoToDelete.map(vehiculo => vehiculo.id);

        // Elimina los registros basados en el array de IDs
        const result = await Vehiculo.destroy({
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

