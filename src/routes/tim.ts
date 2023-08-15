import { Router } from 'express';
import { deleteTim, getTim, insertTim } from '../controllers/tim';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getTim)
router.post('/insert', validateToken, insertTim);
router.post('/eliminar', validateToken, deleteTim);

export default router;