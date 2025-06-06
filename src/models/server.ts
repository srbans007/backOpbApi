import express, { Application } from 'express';
import cors from 'cors';

import routesUser from '../routes/user';
import routesTroncal from '../routes/cargaTroncal';
import routesSeguimiento from '../routes/seguimiento';
import routesSucursal from '../routes/sucursal';
import routesTienda from '../routes/tienda';
import routesTipoRuta from '../routes/tipoRuta';
import routesVehiculo from '../routes/vehiculo';
import routesTransportista from '../routes/transportista';
import routesTipoTransporte from '../routes/tipoTransporte';
import routesTim from '../routes/tim';
import routesRuta from '../routes/ruta';
import routesGuiaRuta from '../routes/guiaRuta';
import routesGuiaProcesada from '../routes/guiaProcesada';

import { User } from './user';
import { CargaTroncal } from './cargaTroncal';
import { Seguimiento } from './seguimiento';
import { Sucursal } from './sucursal';
import { Tienda } from './tienda';
import { TipoRuta } from './tipoRuta';
import { Vehiculo } from './vehiculo';
import { Transportista } from './transportista';
import { TipoTransporte } from './tipoTransporte';
import { TipoTim } from './tim';
import { Ruta } from './ruta';
import { GuiaRuta } from './guiaRuta';
import { GuiaProcesada } from './guiaProcesada';



class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use('/api/users', routesUser);

        this.app.use('/api/troncal', routesTroncal);
        this.app.use('/api/troncal/insert', routesTroncal);
        this.app.use('/api/troncal/buscar', routesTroncal);
        this.app.use('/api/troncal/update', routesTroncal);
        this.app.use('/api/troncal/seguimiento', routesTroncal);

        this.app.use('/api/seguimiento', routesSeguimiento);
        this.app.use('/api/seguimiento/insert', routesSeguimiento);

        this.app.use('/api/sucursal', routesSucursal);
        this.app.use('/api/sucursal/insert', routesSucursal);
        this.app.use('/api/sucursal/eliminar', routesSucursal);
        
        this.app.use('/api/tienda', routesTienda);
        this.app.use('/api/tienda/insert', routesTienda);
        this.app.use('/api/tienda/eliminar', routesTienda);

        this.app.use('/api/tipoRuta', routesTipoRuta);
        this.app.use('/api/tipoRuta/insert', routesTipoRuta);
        this.app.use('/api/tipoRuta/eliminar', routesTipoRuta);

        this.app.use('/api/vehiculo', routesVehiculo);
        this.app.use('/api/vehiculo/insert', routesVehiculo);
        this.app.use('/api/vehiculo/eliminar', routesVehiculo);

        this.app.use('/api/tipoTransporte', routesTipoTransporte);
        this.app.use('/api/tipoTransporte/insert', routesTipoTransporte);
        this.app.use('/api/tipoTransporte/eliminar', routesTipoTransporte);

        this.app.use('/api/transportista', routesTransportista);
        this.app.use('/api/transportista/insert', routesTransportista);
        this.app.use('/api/transportista/eliminar', routesTransportista);

        this.app.use('/api/tim', routesTim);
        this.app.use('/api/tim/insert', routesTim);
        this.app.use('/api/tim/eliminar', routesTim);

        this.app.use('/api/ruta', routesRuta);
        this.app.use('/api/ruta/insert', routesRuta);
        this.app.use('/api/ruta/eliminar', routesRuta);
        this.app.use('/api/ruta/update', routesRuta);

        this.app.use('/api/guia', routesGuiaRuta);
        this.app.use('/api/guia/id', routesGuiaRuta);
        this.app.use('/api/guia/insert', routesGuiaRuta);
        this.app.use('/api/guia/eliminar', routesGuiaRuta);

        this.app.use('/api/guiaProcesada', routesGuiaProcesada);
        this.app.use('/api/guiaProcesada/insert', routesGuiaProcesada);
        this.app.use('/api/guiaProcesada/buscarGuiaRuta', routesGuiaProcesada);
        this.app.use('/api/guiaProcesada/buscar', routesGuiaProcesada);
        this.app.use('/api/guiaProcesada/update', routesGuiaProcesada);

    }

    midlewares() {
        // Parseo body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await User.sync();
            await Sucursal.sync();
            await Tienda.sync();
            await CargaTroncal.sync();
            await TipoRuta.sync();
            await Vehiculo.sync();
            await TipoTransporte.sync();
            await Transportista.sync();
            await TipoTim.sync();
            await Ruta.sync();
            await Seguimiento.sync();
            await GuiaProcesada.sync();
            await GuiaRuta.sync();
            
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;