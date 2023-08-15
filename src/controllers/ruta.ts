import { Request, Response } from 'express';
import { Ruta } from '../models/ruta';

export const getRuta = async (req: Request, res: Response) => {
    const listRuta = await Ruta.findAll();

    res.json(listRuta)
}

export const insertRuta = async (req: Request, res: Response) => {
    try {
        const newRuta = await Ruta.bulkCreate(req.body);
        res.json(newRuta);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al insertar datos' });
    }
}

export const deleteRuta = async (req: Request, res: Response) => {
    try {
        // Extrae el array de objetos con IDs directamente del cuerpo de la solicitud
        const rutaToDelete = req.body;

        // Verifica que sea un array
        if (!Array.isArray(rutaToDelete)) {
            return res.status(400).json({ error: 'El cuerpo debe contener un array de objetos con IDs' });
        }

        // Convierte el array de objetos en un array de IDs
        const ids = rutaToDelete.map(ruta => ruta.id);

        // Elimina los registros basados en el array de IDs
        const result = await Ruta.destroy({
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

export const updateRuta = async (req: Request, res: Response) => {
    try {
        // Extrae el ID de la ruta desde los parámetros de la URL
        const id = req.params.id;

        // Actualiza el registro en la base de datos
        const [updatedRows] = await Ruta.update(req.body, {
            where: {
                id: id
            }
        });

        // Verifica si se actualizó algún registro
        if (updatedRows > 0) {
            res.json({ message: 'Ruta actualizada con éxito' });
        } else {
            res.status(404).json({ error: 'No se encontró la ruta para actualizar' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al actualizar la ruta' });
    }
}
