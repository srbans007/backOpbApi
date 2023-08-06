import { Router } from 'express';
import { getSeguimiento, insertSeguimiento } from '../controllers/seguimiento';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getSeguimiento)
router.post('/insert', validateToken, insertSeguimiento);

export default router;