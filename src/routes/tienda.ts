import { Router } from 'express';
import { getTienda, insertTienda } from '../controllers/tienda';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getTienda)
router.post('/insert', validateToken, insertTienda);

export default router;