import { Request, Response } from 'express';
import { Tienda } from '../models/tienda';

export const getTienda = async (req: Request, res: Response) => {
    const listTienda = await Tienda.findAll();

    res.json(listTienda)
}

export const insertTienda = async (req: Request, res: Response) => {
    try {
      const newTienda = await Tienda.bulkCreate(req.body);
      res.json(newTienda);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al insertar datos' });
    }
  }

  export const deleteTienda = async (req: Request, res: Response) => {
    try {
        // Extrae el array de objetos con IDs directamente del cuerpo de la solicitud
        const tiendaToDelete = req.body;

        // Verifica que sea un array
        if (!Array.isArray(tiendaToDelete)) {
            return res.status(400).json({ error: 'El cuerpo debe contener un array de objetos con IDs' });
        }

        // Convierte el array de objetos en un array de IDs
        const ids = tiendaToDelete.map(tienda => tienda.id);

        // Elimina los registros basados en el array de IDs
        const result = await Tienda.destroy({
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