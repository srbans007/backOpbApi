import { Router } from 'express';
import { getTroncal, insertTroncal } from '../controllers/cargaTroncal';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getTroncal)
router.post('/insert', validateToken, insertTroncal);

export default router;