import { Router } from 'express';
import { getBuscarGuiaProcesada, getBuscarGuiaProcesadaRuta, getGuiaProcesada, insertGuiaProcesada, updateGuiaProcesada} from '../controllers/guiaProcesada';
import validateToken from './validate-token';

const router = Router();

router.get('/',validateToken, getGuiaProcesada)
router.get('/buscar', validateToken, getBuscarGuiaProcesada);
router.get('/buscarGuiaRuta', validateToken, getBuscarGuiaProcesadaRuta);
router.post('/insert', validateToken, insertGuiaProcesada);
router.post('/update', validateToken, updateGuiaProcesada);


export default router;