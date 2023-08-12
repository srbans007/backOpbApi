import { Router } from 'express';
import { deleteTienda, getTienda, insertTienda } from '../controllers/tienda';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getTienda)
router.post('/insert', validateToken, insertTienda);
router.post('/eliminar', validateToken, deleteTienda);

export default router;