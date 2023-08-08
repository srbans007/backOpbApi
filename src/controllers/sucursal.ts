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