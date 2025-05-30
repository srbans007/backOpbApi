import { Request, Response } from 'express';
import { Sucursal } from '../models/sucursal';

export const getSucursal = async (req: Request, res: Response) => {
    const listSucursal = await Sucursal.findAll();

    res.json(listSucursal)
}

export const insertSucursal = async (req: Request, res: Response) => {
    try {
      const newSucursal = await Sucursal.bulkCreate(req.body);
      res.json(newSucursal);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al insertar datos' });
    }
  }

  export const deleteSucursales = async (req: Request, res: Response) => {
    try {
        // Extrae el array de objetos con IDs directamente del cuerpo de la solicitud
        const sucursalesToDelete = req.body;

        // Verifica que sea un array
        if (!Array.isArray(sucursalesToDelete)) {
            return res.status(400).json({ error: 'El cuerpo debe contener un array de objetos con IDs' });
        }

        // Convierte el array de objetos en un array de IDs
        const ids = sucursalesToDelete.map(sucursal => sucursal.id);

        // Elimina los registros basados en el array de IDs
        const result = await Sucursal.destroy({
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

