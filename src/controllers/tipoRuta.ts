import { Request, Response } from 'express';
import { TipoRuta } from '../models/tipoRuta';

export const getTipoRuta = async (req: Request, res: Response) => {
    const listTipoRuta = await TipoRuta.findAll();

    res.json(listTipoRuta)
}

export const insertTipoRuta = async (req: Request, res: Response) => {
    try {
      const newTipoRuta = await TipoRuta.bulkCreate(req.body);
      res.json(newTipoRuta);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al insertar datos' });
    }
  }

  export const deleteTipoRuta = async (req: Request, res: Response) => {
    try {
        // Extrae el array de objetos con IDs directamente del cuerpo de la solicitud
        const tipoRutaToDelete = req.body;

        // Verifica que sea un array
        if (!Array.isArray(tipoRutaToDelete)) {
            return res.status(400).json({ error: 'El cuerpo debe contener un array de objetos con IDs' });
        }

        // Convierte el array de objetos en un array de IDs
        const ids = tipoRutaToDelete.map(tipoRuta => tipoRuta.id);

        // Elimina los registros basados en el array de IDs
        const result = await TipoRuta.destroy({
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