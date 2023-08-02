import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']

    // Construye la ruta al archivo de la clave pública
    const publicKeyPath = path.join(__dirname, '..', 'keys', 'pbOpv.pem');

    // Lee la clave pública desde el archivo
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');


    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, publicKey, { algorithms: ['RS256'] });
            next()
        } catch (error) {
            res.status(400).json({
                msg: 'Error!'
            })
        }
    } else {
        res.status(401).json({
            msg: 'Acceso no autorizado'
        })
    }

}

export default validateToken;