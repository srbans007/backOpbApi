import { Router } from 'express';
import { deleteTipoRuta, getTipoRuta, insertTipoRuta } from '../controllers/tipoRuta';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getTipoRuta)
router.post('/insert', validateToken, insertTipoRuta);
router.post('/eliminar', validateToken, deleteTipoRuta);

export default router;