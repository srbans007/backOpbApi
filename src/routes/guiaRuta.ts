import { Router } from 'express';
import { deleteGuiaRuta, getGuiaRuta, insertGuiaRuta, getGuiaRutaId } from '../controllers/guiaRuta';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getGuiaRuta);
router.get('/id',validateToken, getGuiaRutaId);
router.post('/insert', validateToken, insertGuiaRuta);
router.post('/eliminar', validateToken, deleteGuiaRuta);

export default router;