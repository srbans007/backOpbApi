import { Router } from 'express';
import { getSucursal, insertSucursal } from '../controllers/sucursal';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getSucursal)
router.post('/insert', validateToken, insertSucursal);

export default router;