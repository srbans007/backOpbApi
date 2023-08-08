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