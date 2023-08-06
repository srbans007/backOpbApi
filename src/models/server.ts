import express, { Application } from 'express';
import cors from 'cors';
import routesUser from '../routes/user';
import routesTroncal from '../routes/cargaTroncal';
import routesSeguimiento from '../routes/seguimiento';
import { User } from './user';
import { CargaTroncal } from './cargaTroncal';
import { Seguimiento } from './seguimiento';

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
            await CargaTroncal.sync();
            await Seguimiento.sync();
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default Server;