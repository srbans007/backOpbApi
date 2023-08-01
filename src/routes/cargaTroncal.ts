import { Router } from 'express';
import { getTroncal } from '../controllers/cargaTroncal';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getTroncal)

export default router;