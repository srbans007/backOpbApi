import { Request, Response } from 'express';
import { CargaTroncal } from '../models/cargaTroncal';

export const getTroncal = async (req: Request, res: Response) => {
    const listTroncal = await CargaTroncal.findAll();

    res.json(listTroncal)
}