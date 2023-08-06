import { Request, Response } from 'express';
import { CargaTroncal } from '../models/cargaTroncal';

export const getTroncal = async (req: Request, res: Response) => {
    const listTroncal = await CargaTroncal.findAll();

    res.json(listTroncal)
}

export const insertTroncal = async (req: Request, res: Response) => {
    try {
      const newTroncal = await CargaTroncal.bulkCreate(req.body);
      res.json(newTroncal);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error al insertar datos' });
    }
  }