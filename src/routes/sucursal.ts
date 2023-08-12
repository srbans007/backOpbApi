import { Router } from 'express';
import { deleteSucursales, getSucursal, insertSucursal } from '../controllers/sucursal';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getSucursal)
router.post('/insert', validateToken, insertSucursal);
router.post('/eliminar', validateToken, deleteSucursales);

export default router;