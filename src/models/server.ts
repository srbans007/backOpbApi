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

import { User } from './user';
import { CargaTroncal } from './cargaTroncal';
import { Seguimiento } from './seguimiento';
import { Sucursal } from './sucursal';
import { Tienda } from './tienda';
import { TipoRuta } from './tipoRuta';
import { Vehiculo } from './vehiculo';
import { Transportista } from './transportista';
import { TipoTransporte } from './tipoTransporte';

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
            await Seguimiento.sync();
            await TipoRuta.sync();
            await Vehiculo.sync();
            await TipoTransporte.sync();
            await Transportista.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;