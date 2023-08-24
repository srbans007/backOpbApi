import { Request, Response } from 'express';
import { Seguimiento } from '../models/seguimiento';



export const getSeguimiento = async (req: Request, res: Response) => {
  const listSeguimiento = await Seguimiento.findAll();

  res.json(listSeguimiento)
}



export const insertSeguimiento = async (req: Request, res: Response) => {
    try {
      const newSeguimiento = await Seguimiento.bulkCreate(req.body);
      res.json(newSeguimiento);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al insertar datos' });
    }
  }